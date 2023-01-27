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
export interface PropertyProps {
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

export class Property {
  readonly dataType: DataType;
  readonly name: string;
  readonly logicalId: string;
  readonly dataTypeSpec: string | undefined;
  readonly unit: string | undefined;

  constructor({
    dataType,
    name,
    logicalId,
    dataTypeSpec,
    unit,
  }: PropertyProps) {
    this.dataType = dataType;
    this.name = name;
    this.logicalId = logicalId || name.replace(/[^\w-]/g, '_');
    this.dataTypeSpec = dataTypeSpec;
    this.unit = unit;
  }
}

export class Measurement extends Property {
  get typeName() {
    return 'Measurement';
  }
}

export interface Variable {
  readonly name: string;
  readonly property: Property;
  readonly hierachy?: Hierarchy;
}

export interface Hierarchy {
  readonly name: string;
  readonly childAssetModelId: string;
}

export interface AttributeProps extends PropertyProps {
  readonly defaultValue?: string;
}

export class Attribute extends Property {
  readonly defaultValue: string | undefined;

  constructor(props: AttributeProps) {
    super(props);

    this.defaultValue = props.defaultValue;
  }

  get typeName() {
    return 'Attribute';
  }
}

export interface TransformProps extends PropertyProps {
  readonly expression: string;
  readonly variables: Variable[];
}

export class Transform extends Property {
  readonly expression: string;
  readonly variables: Variable[];
  constructor(props: TransformProps) {
    super(props);

    this.expression = props.expression;
    this.variables = props.variables;
  }

  get typeName() {
    return 'Transform';
  }
}

export interface TumblingWindow {
  readonly interval: string;
  readonly offset?: string;
}

export interface MetricProps extends PropertyProps {
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

export class Metric extends Property {
  readonly expression: string;
  readonly tumblingWindow: TumblingWindow;
  readonly variables: Variable[];

  constructor(props: MetricProps) {
    super(props);

    this.expression = props.expression;
    this.tumblingWindow = props.tumblingWindow;
    this.variables = props.variables;
  }

  get typeName() {
    return 'Metric';
  }
}

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

  // private readonly properties: (Attribute | Measurement | Transform | Metric)[];
  private readonly attributes: Attribute[];
  private readonly measurements: Measurement[];
  private readonly transforms: Transform[];
  private readonly metrics: Metric[];

  private readonly children: Hierarchy[];

  constructor(scope: Construct, id: string, props: AssetModelProps) {
    super(scope, id);

    const { name, description } = props;

    this.id = id;

    this.attributes = [];
    this.measurements = [];
    this.transforms = [];
    this.metrics = [];

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

  get name() {
    return this.model.assetModelName;
  }

  private hierarchyName(child: AssetModel) {
    return (this.name + '-' + child.name).replace(/[^\w-]/g, '_');
  }

  findChild(child: AssetModel) {
    return this.children.find((c) => c.name === this.hierarchyName(child));
  }

  /**
   * Convenience method to add a child Asset Model to this model's hierarchy
   *
   * @param {AssetModel} child
   * @returns {AssetModel} instance of {AssetModel}
   */
  addChild(child: AssetModel): AssetModel {
    const hierarchy: Hierarchy = {
      name: this.hierarchyName(child),
      childAssetModelId: child.assetModelId,
    };

    this.children.push(hierarchy);

    return child;
  }

  addChildren(...children: AssetModel[]) {
    for (const c of children) {
      this.addChild(c);
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
    this.attributes.push(attr);
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
    this.transforms.push(transform);
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
   * ```javascript
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
   * ```
   *
   * @param metric
   * @returns
   *
   * @link https://docs.aws.amazon.com/iot-sitewise/latest/userguide/metrics.html
   */
  addMetric(metric: Metric): AssetModel {
    this.metrics.push(metric);
    return this;
  }

  addMeasurement(measurement: Measurement): AssetModel {
    this.measurements.push(measurement);
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
    const attributes = this.attributes.map(
      (a: Attribute): CfnAssetModel.AssetModelPropertyProperty => {
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
      },
    );

    const measurements = this.measurements.map(
      (m: Measurement): CfnAssetModel.AssetModelPropertyProperty => ({
        name: m.name,
        dataType: m.dataType,
        dataTypeSpec: m.dataTypeSpec,
        logicalId: m.logicalId!, // by this time we are sure this exists
        unit: m.unit,
        type: {
          typeName: 'Measurement',
        },
      }),
    );

    const metrics = this.metrics.map(
      (m: Metric): CfnAssetModel.AssetModelPropertyProperty => {
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
      },
    );

    const transforms = this.transforms.map(
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

    return attributes.concat(measurements).concat(metrics).concat(transforms);
  }
}

export default AssetModel;
