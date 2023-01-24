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
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMeasurement">addMeasurement</a></code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMetric">addMetric</a></code> | addMetric. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.addTransform">addTransform</a></code> | addTransform. |

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

Convinience method to add a Property with typeName 'Attribute'.

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

##### `addMeasurement` <a name="addMeasurement" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMeasurement"></a>

```typescript
public addMeasurement(measurement: Measure): AssetModel
```

###### `measurement`<sup>Required</sup> <a name="measurement" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.addMeasurement.parameter.measurement"></a>

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.Measure">Measure</a>

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
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.model">model</a></code> | <code>aws-cdk-lib.aws_iotsitewise.CfnAssetModel</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `model`<sup>Required</sup> <a name="model" id="@aws-cdk/aws-iotsitewise-alpha.AssetModel.property.model"></a>

```typescript
public readonly model: CfnAssetModel;
```

- *Type:* aws-cdk-lib.aws_iotsitewise.CfnAssetModel

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

### Attribute <a name="Attribute" id="@aws-cdk/aws-iotsitewise-alpha.Attribute"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.Initializer"></a>

```typescript
import { Attribute } from '@aws-cdk/aws-iotsitewise-alpha'

const attribute: Attribute = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Attribute.property.defaultValue">defaultValue</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

##### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@aws-cdk/aws-iotsitewise-alpha.Attribute.property.defaultValue"></a>

```typescript
public readonly defaultValue: string;
```

- *Type:* string

---

### Measure <a name="Measure" id="@aws-cdk/aws-iotsitewise-alpha.Measure"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Measure.Initializer"></a>

```typescript
import { Measure } from '@aws-cdk/aws-iotsitewise-alpha'

const measure: Measure = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measure.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measure.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measure.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measure.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Measure.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Measure.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Measure.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Measure.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Measure.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Measure.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

### Metric <a name="Metric" id="@aws-cdk/aws-iotsitewise-alpha.Metric"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Metric.Initializer"></a>

```typescript
import { Metric } from '@aws-cdk/aws-iotsitewise-alpha'

const metric: Metric = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.expression">expression</a></code> | <code>string</code> | The mathematical expression that defines the metric aggregation function. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.tumblingWindow">tumblingWindow</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow">TumblingWindow</a></code> | Contains a time interval window used for data aggregate computations (for example, average, sum, count, and so on). |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Metric.property.variables">variables</a></code> | <code>{[ key: string ]: string}</code> | A mapping between the name used in the expression to the name of the referenced value. |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

##### `expression`<sup>Required</sup> <a name="expression" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

The mathematical expression that defines the metric aggregation function.

You can specify up to 10 variables per expression. You can specify up to 10
functions per expression.

---

##### `tumblingWindow`<sup>Required</sup> <a name="tumblingWindow" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.tumblingWindow"></a>

```typescript
public readonly tumblingWindow: TumblingWindow;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.TumblingWindow">TumblingWindow</a>

Contains a time interval window used for data aggregate computations (for example, average, sum, count, and so on).

> [https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TumblingWindow.html](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TumblingWindow.html)

---

##### `variables`<sup>Required</sup> <a name="variables" id="@aws-cdk/aws-iotsitewise-alpha.Metric.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A mapping between the name used in the expression to the name of the referenced value.

See addMetric for an example

---

### Property <a name="Property" id="@aws-cdk/aws-iotsitewise-alpha.Property"></a>

Properties for defining a `Property`.

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Property.Initializer"></a>

```typescript
import { Property } from '@aws-cdk/aws-iotsitewise-alpha'

const property: Property = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Property.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Property.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

### Transform <a name="Transform" id="@aws-cdk/aws-iotsitewise-alpha.Transform"></a>

#### Initializer <a name="Initializer" id="@aws-cdk/aws-iotsitewise-alpha.Transform.Initializer"></a>

```typescript
import { Transform } from '@aws-cdk/aws-iotsitewise-alpha'

const transform: Transform = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataType">dataType</a></code> | <code><a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a></code> | The data type of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.name">name</a></code> | <code>string</code> | The name of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataTypeSpec">dataTypeSpec</a></code> | <code>string</code> | The data type of the structure for this property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.logicalId">logicalId</a></code> | <code>string</code> | The LogicalID of the asset model property. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.unit">unit</a></code> | <code>string</code> | The unit of the asset model property, such as Newtons or RPM. |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.expression">expression</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@aws-cdk/aws-iotsitewise-alpha.Transform.property.variables">variables</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataType"></a>

```typescript
public readonly dataType: DataType;
```

- *Type:* <a href="#@aws-cdk/aws-iotsitewise-alpha.DataType">DataType</a>

The data type of the asset model property.

The value can be STRING, INTEGER, DOUBLE, BOOLEAN, or STRUCT.

---

##### `name`<sup>Required</sup> <a name="name" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the asset model property.

The maximum length is 256 characters with the pattern [^\u0000-\u001F\u007F]+.

---

##### `dataTypeSpec`<sup>Optional</sup> <a name="dataTypeSpec" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.dataTypeSpec"></a>

```typescript
public readonly dataTypeSpec: string;
```

- *Type:* string

The data type of the structure for this property.

This parameter exists on properties that have the STRUCT data type.

---

##### `logicalId`<sup>Optional</sup> <a name="logicalId" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string
- *Default:* Asset Model's ID concatenated with Property's name example: Asset Model ID = "Motor" Property name = "OilTemperature" Yields a logicalId = "MotorOilTemperature"

The LogicalID of the asset model property.

The maximum length is 256 characters, with the pattern [^\\u0000-\\u001F\\u007F]+.

---

##### `unit`<sup>Optional</sup> <a name="unit" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

The unit of the asset model property, such as Newtons or RPM.

---

##### `expression`<sup>Required</sup> <a name="expression" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

---

##### `variables`<sup>Required</sup> <a name="variables" id="@aws-cdk/aws-iotsitewise-alpha.Transform.property.variables"></a>

```typescript
public readonly variables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

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

