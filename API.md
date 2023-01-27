# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AssetModel <a name="AssetModel" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel"></a>

#### Initializers <a name="Initializers" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer"></a>

```typescript
import { AssetModel } from '@aws-cdk/aws-iotsitewise-alpha'

new AssetModel(scope: Construct, id: string, props: AssetModelProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer.parameter.props">props</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModelProps">AssetModelProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.Initializer.parameter.props"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModelProps">AssetModelProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addAttribute">addAttribute</a></code> | addAttribute. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addChild">addChild</a></code> | Convenience method to add a child Asset Model to this model's hierarchy. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addChildren">addChildren</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMeasurement">addMeasurement</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMetric">addMetric</a></code> | addMetric. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addTransform">addTransform</a></code> | addTransform. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.findChild">findChild</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addAttribute` <a name="addAttribute" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addAttribute"></a>

```typescript
public addAttribute(attr: Attribute): AssetModel
```

addAttribute.

Convenience method to add a Property with typeName 'Attribute'.

Asset attributes represent information that is generally static, such as
device manufacturer or geographiclocation. Each asset that you create from
an asset model contains the attributes of that model.

If you do provide a logicalId, a logicalId will be set as the
concatenation of the Model's logicalId and the attribute's name.

Example:

let motor: AssetModel;
motor.addAttribute({
   name: 'Voltage Rating',
   dataType: DataType.INTEGER,
   defaultValue: 440,
})

###### `attr`<sup>Required</sup> <a name="attr" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addAttribute.parameter.attr"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute">Attribute</a>

---

##### `addChild` <a name="addChild" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addChild"></a>

```typescript
public addChild(child: AssetModel): AssetModel
```

Convenience method to add a child Asset Model to this model's hierarchy.

###### `child`<sup>Required</sup> <a name="child" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addChild.parameter.child"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel">AssetModel</a>

---

##### `addChildren` <a name="addChildren" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addChildren"></a>

```typescript
public addChildren(children: AssetModel): void
```

###### `children`<sup>Required</sup> <a name="children" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addChildren.parameter.children"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel">AssetModel</a>

---

##### `addMeasurement` <a name="addMeasurement" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMeasurement"></a>

```typescript
public addMeasurement(measurement: Measurement): AssetModel
```

###### `measurement`<sup>Required</sup> <a name="measurement" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMeasurement.parameter.measurement"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement">Measurement</a>

---

##### `addMetric` <a name="addMetric" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMetric"></a>

```typescript
public addMetric(metric: Metric): AssetModel
```

addMetric.

Convenience method to add a Property with typeName 'Metric'.

Metrics are mathematical expressions that use aggregation functions to
process all input data points and output a single data point per specified
time interval. For example, a metric can calculate the average hourly
temperature from a temperature data stream.

Example:

```javascript
let motor: AssetModel;
motor.addMetric({
   name: 'Max Temperature C',
   dataType: DataType.DOUBLE,
   unit: 'C',
   expression: 'max(oil_temperature_c)',
   variables: {
     oil_temperature_c: 'Oil Temperature C'
   },
   window: {
     tumbling: { interval: '1h' }
   }
})
```

> [https://docs.aws.amazon.com/iot-sitewise/latest/userguide/metrics.html](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/metrics.html)

###### `metric`<sup>Required</sup> <a name="metric" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMetric.parameter.metric"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Metric">Metric</a>

---

##### `addTransform` <a name="addTransform" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addTransform"></a>

```typescript
public addTransform(transform: Transform): AssetModel
```

addTransform.

Convenience method to add a Property with typeName 'Transform'

Transforms are mathematical expressions that map asset properties' data
points from one form to another. A transform expression consists of asset
property variables, literals, operators, and functions. The transformed
data points hold a one-to-one relationship with the input data points.
AWS IoT SiteWise calculates a new transformed data point each time any of
the input properties receives a new data point.

If you do not provide a logicalId, a logicalId will be set as the
concatenation of the Model's logicalId and the transform's name.

Example:

  let motor: AssetModel;
  motor.addTransform({
    name: 'Oil Temperature F',
    dataType: DataType.DOUBLE,
    expression: '9/5 * oil_temp_c + 32',
    variables {
      oil_temp_c: 'Oil Temperature C'
    }
  })

> [https://docs.aws.amazon.com/iot-sitewise/latest/userguide/transforms.html](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/transforms.html)

###### `transform`<sup>Required</sup> <a name="transform" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addTransform.parameter.transform"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Transform">Transform</a>

---

##### `findChild` <a name="findChild" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.findChild"></a>

```typescript
public findChild(child: AssetModel): Hierarchy
```

###### `child`<sup>Required</sup> <a name="child" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.findChild.parameter.child"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel">AssetModel</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.isConstruct"></a>

```typescript
import { AssetModel } from '@aws-cdk/aws-iotsitewise-alpha'

AssetModel.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.assetModelId">assetModelId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.logicalId">logicalId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.model">model</a></code> | <code>aws-cdk-lib.aws_iotsitewise.CfnAssetModel</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `assetModelId`<sup>Required</sup> <a name="assetModelId" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.assetModelId"></a>

```typescript
public readonly assetModelId: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

---

##### `model`<sup>Required</sup> <a name="model" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.model"></a>

```typescript
public readonly model: CfnAssetModel;
```

- *Type:* aws-cdk-lib.aws_iotsitewise.CfnAssetModel

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AssetModelProps <a name="AssetModelProps" id="@aws-cdk/aws-iotsitewise-alpha.AssetModelProps"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.AssetModelProps.Initializer"></a>

```typescript
import { AssetModelProps } from '@aws-cdk/aws-iotsitewise-alpha'

const assetModelProps: AssetModelProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModelProps.property.name">name</a></code> | <code>string</code> | A unique, friendly name for the asset model. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModelProps.property.description">description</a></code> | <code>string</code> | A description for the asset model. |

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.AssetModelProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A unique, friendly name for the asset model.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `description`<sup>Optional</sup> <a name="description" id="@aws-cdk/aws-iotsitewise-alpha.AssetModelProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

A description for the asset model.

---

### AttributeProps <a name="AttributeProps" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.Initializer"></a>

```typescript
import { AttributeProps } from '@aws-cdk/aws-iotsitewise-alpha'

const attributeProps: AttributeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.defaultValue">defaultValue</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

##### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@aws-cdk/aws-iotsitewise-alpha.AttributeProps.property.defaultValue"></a>

```typescript
public readonly defaultValue: string;
```

- *Type:* string

---

### Hierarchy <a name="Hierarchy" id="@aws-cdk/aws-iotsitewise-alpha.Hierarchy"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Hierarchy.Initializer"></a>

```typescript
import { Hierarchy } from '@aws-cdk/aws-iotsitewise-alpha'

const hierarchy: Hierarchy = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Hierarchy.property.childAssetModelId">childAssetModelId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Hierarchy.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `childAssetModelId`<sup>Required</sup> <a name="childAssetModelId" id="@aws-cdk/aws-iotsitewise-alpha.Hierarchy.property.childAssetModelId"></a>

```typescript
public readonly childAssetModelId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Hierarchy.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

### MetricProps <a name="MetricProps" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.Initializer"></a>

```typescript
import { MetricProps } from '@aws-cdk/aws-iotsitewise-alpha'

const metricProps: MetricProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.expression">expression</a></code> | <code>string</code> | The mathematical expression that defines the metric aggregation function. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.tumblingWindow">tumblingWindow</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow">TumblingWindow</a></code> | Contains a time interval window used for data aggregate computations (for example, average, sum, count, and so on). |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.variables">variables</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]</code> | A mapping between the name used in the expression to the name of the referenced value. |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

##### `expression`<sup>Required</sup> <a name="expression" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

The mathematical expression that defines the metric aggregation function.

You can specify up to 10 variables per expression. You can specify up to 10
functions per expression.

---

##### `tumblingWindow`<sup>Required</sup> <a name="tumblingWindow" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.tumblingWindow"></a>

```typescript
public readonly tumblingWindow: TumblingWindow;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow">TumblingWindow</a>

Contains a time interval window used for data aggregate computations (for example, average, sum, count, and so on).

> [https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TumblingWindow.html](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TumblingWindow.html)

---

##### `variables`<sup>Required</sup> <a name="variables" id="@aws-cdk/aws-iotsitewise-alpha.MetricProps.property.variables"></a>

```typescript
public readonly variables: Variable[];
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]

A mapping between the name used in the expression to the name of the referenced value.

See addMetric for an example

---

### PropertyProps <a name="PropertyProps" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps"></a>

Properties for defining a `Property`.

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps.Initializer"></a>

```typescript
import { PropertyProps } from '@aws-cdk/aws-iotsitewise-alpha'

const propertyProps: PropertyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.PropertyProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

### TransformProps <a name="TransformProps" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.Initializer"></a>

```typescript
import { TransformProps } from '@aws-cdk/aws-iotsitewise-alpha'

const transformProps: TransformProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.expression">expression</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.variables">variables</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

##### `expression`<sup>Required</sup> <a name="expression" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

---

##### `variables`<sup>Required</sup> <a name="variables" id="@aws-cdk/aws-iotsitewise-alpha.TransformProps.property.variables"></a>

```typescript
public readonly variables: Variable[];
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]

---

### TumblingWindow <a name="TumblingWindow" id="@aws-cdk/aws-iotsitewise-alpha.TumblingWindow"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.TumblingWindow.Initializer"></a>

```typescript
import { TumblingWindow } from '@aws-cdk/aws-iotsitewise-alpha'

const tumblingWindow: TumblingWindow = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow.property.interval">interval</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow.property.offset">offset</a></code> | <code>string</code> | *No description.* |

---

##### `interval`<sup>Required</sup> <a name="interval" id="@aws-cdk/aws-iotsitewise-alpha.TumblingWindow.property.interval"></a>

```typescript
public readonly interval: string;
```

- *Type:* string

---

##### `offset`<sup>Optional</sup> <a name="offset" id="@aws-cdk/aws-iotsitewise-alpha.TumblingWindow.property.offset"></a>

```typescript
public readonly offset: string;
```

- *Type:* string

---

### Variable <a name="Variable" id="@aws-cdk/aws-iotsitewise-alpha.Variable"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Variable.Initializer"></a>

```typescript
import { Variable } from '@aws-cdk/aws-iotsitewise-alpha'

const variable: Variable = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable.property.property">property</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property">Property</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable.property.hierachy">hierachy</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Hierarchy">Hierarchy</a></code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Variable.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `property`<sup>Required</sup> <a name="property" id="@aws-cdk/aws-iotsitewise-alpha.Variable.property.property"></a>

```typescript
public readonly property: Property;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Property">Property</a>

---

##### `hierachy`<sup>Optional</sup> <a name="hierachy" id="@aws-cdk/aws-iotsitewise-alpha.Variable.property.hierachy"></a>

```typescript
public readonly hierachy: Hierarchy;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Hierarchy">Hierarchy</a>

---

## Classes <a name="Classes" id="Classes"></a>

### Attribute <a name="Attribute" id="@aws-cdk/aws-iotsitewise-alpha.Attribute"></a>

#### Initializers <a name="Initializers" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.Initializer"></a>

```typescript
import { Attribute } from '@aws-cdk/aws-iotsitewise-alpha'

new Attribute(props: AttributeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.Initializer.parameter.props">props</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps">AttributeProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.Initializer.parameter.props"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.AttributeProps">AttributeProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.logicalId">logicalId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.unit">unit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.typeName">typeName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.defaultValue">defaultValue</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

##### `typeName`<sup>Required</sup> <a name="typeName" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.typeName"></a>

```typescript
public readonly typeName: string;
```

- *Type:* string

---

##### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.defaultValue"></a>

```typescript
public readonly defaultValue: string;
```

- *Type:* string

---


### Measurement <a name="Measurement" id="@aws-cdk/aws-iotsitewise-alpha.Measurement"></a>

#### Initializers <a name="Initializers" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.Initializer"></a>

```typescript
import { Measurement } from '@aws-cdk/aws-iotsitewise-alpha'

new Measurement(__0: PropertyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.Initializer.parameter.__0">__0</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps">PropertyProps</a></code> | *No description.* |

---

##### `__0`<sup>Required</sup> <a name="__0" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.Initializer.parameter.__0"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps">PropertyProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.property.logicalId">logicalId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.property.unit">unit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measurement.property.typeName">typeName</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

##### `typeName`<sup>Required</sup> <a name="typeName" id="@aws-cdk/aws-iotsitewise-alpha.Measurement.property.typeName"></a>

```typescript
public readonly typeName: string;
```

- *Type:* string

---


### Metric <a name="Metric" id="@aws-cdk/aws-iotsitewise-alpha.Metric"></a>

#### Initializers <a name="Initializers" id="@aws-cdk/aws-iotsitewise-alpha.Metric.Initializer"></a>

```typescript
import { Metric } from '@aws-cdk/aws-iotsitewise-alpha'

new Metric(props: MetricProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.Initializer.parameter.props">props</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps">MetricProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@aws-cdk/aws-iotsitewise-alpha.Metric.Initializer.parameter.props"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.MetricProps">MetricProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.logicalId">logicalId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.unit">unit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.expression">expression</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.tumblingWindow">tumblingWindow</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow">TumblingWindow</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.typeName">typeName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.variables">variables</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

##### `expression`<sup>Required</sup> <a name="expression" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

---

##### `tumblingWindow`<sup>Required</sup> <a name="tumblingWindow" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.tumblingWindow"></a>

```typescript
public readonly tumblingWindow: TumblingWindow;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow">TumblingWindow</a>

---

##### `typeName`<sup>Required</sup> <a name="typeName" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.typeName"></a>

```typescript
public readonly typeName: string;
```

- *Type:* string

---

##### `variables`<sup>Required</sup> <a name="variables" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.variables"></a>

```typescript
public readonly variables: Variable[];
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]

---


### Property <a name="Property" id="@aws-cdk/aws-iotsitewise-alpha.Property"></a>

#### Initializers <a name="Initializers" id="@aws-cdk/aws-iotsitewise-alpha.Property.Initializer"></a>

```typescript
import { Property } from '@aws-cdk/aws-iotsitewise-alpha'

new Property(__0: PropertyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.Initializer.parameter.__0">__0</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps">PropertyProps</a></code> | *No description.* |

---

##### `__0`<sup>Required</sup> <a name="__0" id="@aws-cdk/aws-iotsitewise-alpha.Property.Initializer.parameter.__0"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.PropertyProps">PropertyProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.logicalId">logicalId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.unit">unit</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---


### Transform <a name="Transform" id="@aws-cdk/aws-iotsitewise-alpha.Transform"></a>

#### Initializers <a name="Initializers" id="@aws-cdk/aws-iotsitewise-alpha.Transform.Initializer"></a>

```typescript
import { Transform } from '@aws-cdk/aws-iotsitewise-alpha'

new Transform(props: TransformProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.Initializer.parameter.props">props</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps">TransformProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@aws-cdk/aws-iotsitewise-alpha.Transform.Initializer.parameter.props"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.TransformProps">TransformProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.logicalId">logicalId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.unit">unit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.expression">expression</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.typeName">typeName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.variables">variables</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

##### `expression`<sup>Required</sup> <a name="expression" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

---

##### `typeName`<sup>Required</sup> <a name="typeName" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.typeName"></a>

```typescript
public readonly typeName: string;
```

- *Type:* string

---

##### `variables`<sup>Required</sup> <a name="variables" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.variables"></a>

```typescript
public readonly variables: Variable[];
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Variable">Variable</a>[]

---



## Enums <a name="Enums" id="Enums"></a>

### DataType <a name="DataType" id="@aws-cdk/aws-iotsitewise-alpha.DataType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType.STRING">STRING</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType.DOUBLE">DOUBLE</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType.BOOLEAN">BOOLEAN</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType.INTEGER">INTEGER</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType.STRUCT">STRUCT</a></code> | *No description.* |

---

##### `STRING` <a name="STRING" id="@aws-cdk/aws-iotsitewise-alpha.DataType.STRING"></a>

---


##### `DOUBLE` <a name="DOUBLE" id="@aws-cdk/aws-iotsitewise-alpha.DataType.DOUBLE"></a>

---


##### `BOOLEAN` <a name="BOOLEAN" id="@aws-cdk/aws-iotsitewise-alpha.DataType.BOOLEAN"></a>

---


##### `INTEGER` <a name="INTEGER" id="@aws-cdk/aws-iotsitewise-alpha.DataType.INTEGER"></a>

---


##### `STRUCT` <a name="STRUCT" id="@aws-cdk/aws-iotsitewise-alpha.DataType.STRUCT"></a>

---

