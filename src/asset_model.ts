import { Lazy } from 'aws-cdk-lib';
import { CfnAssetModel, CfnAssetModelProps } from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export enum DataType {
  STRING = 'STRING',
  DOUBLE = 'DOUBLE',
  BOOLEAN = 'BOOLEAN',
  INTEGER = 'INTEGER',
  STRUCT = 'STRUCT',
}

/**
 * Properties for defining a `Property`
 *
 * @struct
 * @stability external
 *
 */
export interface Property {
  /**
   * Used to map to PropertyTypeProperty
   *
   * @internal
   */
  _type?: 'Attribute' | 'Metric' | 'Transform' | 'Measurement';

  /**
   * The data type of the asset model property.
   * The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.
   */
  readonly dataType: DataType;

  /**
   * The name of the asset model property.
   *
   * The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.
   */
  readonly name: string;

  /**
   * The LogicalID of the asset model property.
   * The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.
   *
   * @default Asset Model's ID concatenated with Property's name
   * example:
   *    Asset Model ID = "Motor"
   *    Property name = "OilTemperature"
   *    Yields a logicalId = "MotorOilTemperature"
   */
  readonly logicalId?: string;

  /**
   * The data type of the structure for this property.
   * This parameter exists on properties that have the STRUCT data type.
   */
  readonly dataTypeSpec?: string;

  /**
   * The unit of the asset model property, such as Newtons or RPM.
   */
  readonly unit?: string;
}

export interface Variable {
  readonly name: string;
  readonly property: Property;
  readonly hierachy?: Hierarchy;
}

export interface Hierarchy {
  name: string;
  childAssetModelId: string;
}

export interface Attribute extends Property {
  readonly defaultValue?: string;
}

export interface Transform extends Property {
  readonly expression: string;
  readonly variables: Variable[];
}

export interface TumblingWindow {
  readonly interval: string;
  readonly offset?: string;
}

export interface Metric extends Property {
  /**
   * The mathematical expression that defines the metric aggregation function.
   * You can specify up to 10 variables per expression. You can specify up to 10
   * functions per expression.
   */
  readonly expression: string;

  /**
   * Contains a time interval window used for data aggregate computations (for
   * example, average, sum, count, and so on).
   *
   * @link https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TumblingWindow.html
   */
  readonly tumblingWindow: TumblingWindow;

  /**
   * A mapping between the name used in the expression to the name of the
   * referenced value. See addMetric for an example
   */
  readonly variables: Variable[];
}

export interface Measurement extends Property {}

export interface AssetModelProps {
  /**
   * A unique, friendly name for the asset model.
   * The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.
   */
  readonly name: string;

  /**
   * A description for the asset model.
   */
  readonly description?: string;
}

export class AssetModel extends Construct {
  public readonly model: CfnAssetModel;
  public readonly id: string;

  private readonly properties: (Attribute | Measurement | Transform | Metric)[];
  private readonly children: Hierarchy[];

  constructor(scope: Construct, id: string, props: AssetModelProps) {
    super(scope, id);

    const { name, description } = props;

    this.id = id;
    this.properties = [];
    this.children = [];

    this.model = new CfnAssetModel(this, 'Resource', {
      assetModelName: name,
      assetModelDescription: description,
      assetModelProperties: Lazy.any({
        produce: () => this.renderAssetModelProperties(),
      }),
      assetModelHierarchies: Lazy.any({
        produce: () => this.renderAssetModelHierarchies(),
      }),
    } as CfnAssetModelProps);
  }

  get logicalId() {
    return this.model.logicalId;
  }

  get assetModelId() {
    return this.model.getAtt('AssetModelId').toString();
  }

  child(name: string) {
    return this.children.find((c) => c.name === name);
  }

  /**
   * Convenience method to add a child Asset Model to this model's hierarchy
   *
   * @param {AssetModel} child
   * @returns {AssetModel} instance of {AssetModel}
   */
  addChild(child: Hierarchy): AssetModel {
    if (!child.name.match(/[^\u0000-\u001F\u007F]+/)) {
      throw new Error(`Invalid name: ${child.name}`);
    }

    this.children.push(child);

    return this;
  }

  addChildren(...children: Hierarchy[]) {
    for (const c of children) {
      this.children.push(c);
    }
  }

  /**
   * addAttribute
   *
   * Convenience method to add a Property with typeName 'Attribute'.
   *
   * Asset attributes represent information that is generally static, such as
   * device manufacturer or geographiclocation. Each asset that you create from
   * an asset model contains the attributes of that model.
   *
   * If you do provide a logicalId, a logicalId will be set as the
   * concatenation of the Model's logicalId and the attribute's name.
   *
   * Example:
   *
   * let motor: AssetModel;
   * motor.addAttribute({
   *   name: 'Voltage Rating',
   *   dataType: DataType.INTEGER,
   *   defaultValue: 440,
   * })
   *
   * @param {Attribute} attr
   * @returns {AssetModel} instance of AssetModel
   */
  addAttribute(attr: Attribute): AssetModel {
    this.properties.push({ _type: 'Attribute', ...attr });
    return this;
  }

  /**
   * addTransform
   *
   * Convenience method to add a Property with typeName 'Transform'
   *
   * Transforms are mathematical expressions that map asset properties' data
   * points from one form to another. A transform expression consists of asset
   * property variables, literals, operators, and functions. The transformed
   * data points hold a one-to-one relationship with the input data points.
   * AWS IoT SiteWise calculates a new transformed data point each time any of
   * the input properties receives a new data point.
   *
   * If you do not provide a logicalId, a logicalId will be set as the
   * concatenation of the Model's logicalId and the transform's name.
   *
   * Example:
   *
   *  let motor: AssetModel;
   *  motor.addTransform({
   *    name: 'Oil Temperature F',
   *    dataType: DataType.DOUBLE,
   *    expression: '9/5 * oil_temp_c + 32',
   *    variables {
   *      oil_temp_c: 'Oil Temperature C'
   *    }
   *  })
   *
   * @param {Transform} transform
   * @returns {AssetModel} instance of AssetModel
   *
   * @link https://docs.aws.amazon.com/iot-sitewise/latest/userguide/transforms.html
   */
  addTransform(transform: Transform): AssetModel {
    this.properties.push({ _type: 'Transform', ...transform });
    return this;
  }

  /**
   * addMetric
   *
   * Convenience method to add a Property with typeName 'Metric'.
   *
   * Metrics are mathematical expressions that use aggregation functions to
   * process all input data points and output a single data point per specified
   * time interval. For example, a metric can calculate the average hourly
   * temperature from a temperature data stream.
   *
   * Example:
   *
   * let motor: AssetModel;
   * motor.addMetric({
   *   name: 'Max Temperature C',
   *   dataType: DataType.DOUBLE,
   *   unit: 'C',
   *   expression: 'max(oil_temperature_c)',
   *   variables: {
   *     oil_temperature_c: 'Oil Temperature C'
   *   },
   *   window: {
   *     tumbling: { interval: '1h' }
   *   }
   * })
   *
   * @param metric
   * @returns
   *
   * @link https://docs.aws.amazon.com/iot-sitewise/latest/userguide/metrics.html
   */
  addMetric(metric: Metric): AssetModel {
    this.properties.push({ _type: 'Metric', ...metric });
    return this;
  }

  addMeasurement(measurement: Measurement): AssetModel {
    this.properties.push({ _type: 'Measurement', ...measurement });
    return this;
  }

  private renderAssetModelHierarchies(): CfnAssetModel.AssetModelHierarchyProperty[] {
    const children = this.children.map(
      (child: Hierarchy): CfnAssetModel.AssetModelHierarchyProperty => ({
        childAssetModelId: child.childAssetModelId,
        name: child.name,
        logicalId: child.name,
      }),
    );

    return children;
  }

  private renderAssetModelProperties(): CfnAssetModel.AssetModelPropertyProperty[] {
    const attributes = this.properties
      .filter(({ _type }) => _type === 'Attribute')
      .map((a: Attribute): CfnAssetModel.AssetModelPropertyProperty => {
        const attr_type: CfnAssetModel.PropertyTypeProperty = {
          typeName: 'Attribute',
          attribute: {
            defaultValue: a.defaultValue,
          },
        };

        return {
          name: a.name,
          dataType: a.dataType,
          dataTypeSpec: a.dataTypeSpec,
          logicalId: a.logicalId || this.id + a.name.replace(/[^\w]/g, ''),
          type: attr_type,
        };
      });

    const measures = this.properties
      .filter(({ _type }) => _type === 'Measurement')
      .map(
        (m: Measurement): CfnAssetModel.AssetModelPropertyProperty => ({
          name: m.name,
          dataType: m.dataType,
          dataTypeSpec: m.dataTypeSpec,
          logicalId: m.logicalId || this.id + m.name.replace(/[^\w]/g, ''),
          unit: m.unit,
          type: {
            typeName: 'Measurement',
          },
        }),
      );

    const metrics = (
      this.properties.filter(({ _type }) => _type === 'Metric') as Metric[]
    ).map((m: Metric): CfnAssetModel.AssetModelPropertyProperty => {
      const metricType: CfnAssetModel.PropertyTypeProperty = {
        typeName: 'Metric',
        metric: {
          expression: m.expression,
          variables: m.variables.map((v) => ({
            name: v.name,
            value: {
              propertyLogicalId: v.property.logicalId!,
              hierarchyLogicalId: v.hierachy?.name,
            },
          })),
          window: {
            tumbling: {
              ...m.tumblingWindow,
            },
          },
        },
      };

      return {
        name: m.name,
        dataType: m.dataType,
        type: metricType,
        logicalId: m.logicalId || this.id + m.name.replace(/[^\w]/g, ''),
        unit: m.unit,
        dataTypeSpec: m.dataTypeSpec,
      };
    });

    const transforms = (
      this.properties.filter(
        ({ _type }) => _type === 'Transform',
      ) as Transform[]
    ).map(
      (t: Transform): CfnAssetModel.AssetModelPropertyProperty => ({
        name: t.name,
        dataType: t.dataType,
        type: {
          typeName: 'Transform',
          transform: {
            expression: t.expression,
            variables: t.variables.map((v) => ({
              name: v.name,
              value: {
                propertyLogicalId: v.property.logicalId!,
                hierarchyLogicalId: v.hierachy?.name,
              },
            })),
          },
        },
        logicalId: t.logicalId || this.id + t.name.replace(/[^\w]/g, ''),
        unit: t.unit,
        dataTypeSpec: t.dataTypeSpec,
      }),
    );

    return attributes.concat(measures).concat(metrics).concat(transforms);
  }
}

export default AssetModel;
