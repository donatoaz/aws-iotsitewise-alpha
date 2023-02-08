# CDK v2 Construct Library for AWS IoTSitewise

This library provides an L2 construct for AWS IoT SiteWise resources.

Currently only `AWS::IoTSiteWise::AssetModel` construct is implemented. 
`AWS::IoTSiteWise::Asset` is in the roadmap

## Install

```
npm install aws-iotsitewise-alpha
```

or

```
yarn add aws-iotsitewise-alpha
```

## Usage

### Create an Asset Model

```typescript
const generatorModel = new sw.AssetModel(this, 'GeneratorModel', {
  name: 'Generator model 262966 Doppler',
});
```

### Add properties to an asset model

```typescript
const serialNum = new sw.Attribute({
  name: 'serial',
  defaultValue: 'noserial',
  dataType: sw.DataType.STRING,
});
generatorModel.addAttribute(serialNum);

const watts_1m = new sw.Measurement({
  name: 'watts_1m',
  unit: 'Watts/min',
  dataType: sw.DataType.DOUBLE,
});
generatorModel.addMeasurement(watts_1m);

const watts_5m = new sw.Metric({
  name: 'sum_watts_5m',
  expression: 'sum(watts_1m)',
  dataType: sw.DataType.DOUBLE,
  tumblingWindow: { interval: '5m' },
  variables: [{ name: 'watts_1m', property: watts_1m }],
});
generatorModel.addMetric(watts_5m);
```

### Create an asset hierarchy

The `addChild` method returns the child, so you can chain calls and construct
nested hierarchies.

The `addChildren` method returns the parent, so you can chain calls to construct
wide hierarchies.

```typescript
const nuclearPlant = new AssetModel(this, 'NuclearPlant', { name: 'Nuclear Power Plant' });

const steamPlant = new AssetModel(this, 'SteamPlant', { name: 'Steam Plant' });
const boiler = new AssetModel(this, 'Boiler', { name: 'Boiler model A' });
const reactor = new AssetModel(this, 'Reactor', { name: 'Uranium reactor' });
const controlRods = new AssetModel(this, 'Control', { name: 'Control Rods' });

const generationPlant = new AssetModel(this, 'GenerationPlant', { name: 'Generation' });
const turbine = new AssetModel(this, 'Turbine', { name: 'Steam Turbine model B' });
const generator = new AssetModel(this, 'Generator', { name: 'Generator model C' });
const cooler = new AssetModel(this, 'Cooler', { name: 'Generator cooler' });
const coolantPump = new AssetModel(this, 'Pump', { name: 'Coolant Pump' });
const transformer = new AssetModel(this, 'Transformer');

reactor.addChild(controlRods);

generator
  .addChild(cooler)
    .addChild(coolantPump);

nuclearPlant
  .addChildren(
    steamPlant
      .addChildren(boiler, reactor)
  )
  .addChildren(
    generationPlant
      .addChildren(turbine, generator, transformer)
  )
```

## Caveats

Support for Composite Models on Asset Models is still lacking.

## Road map

1. Create `AWS::IoTSiteWise::Asset` L2 construct
1. Add support for `AssetModelCompositeModels` on Asset Models
1. Write better examples with metrics that use deep hierarchy properties
1. Add additional test cases for edge conditions