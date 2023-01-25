import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { AssetModel, DataType, Measure, Metric } from '../src/index';

const app = new App();
const stack = new Stack(app);

// subject
const conveyor = new AssetModel(stack, 'Conveyor', {
  name: 'Conveyor Belt',
  description: 'DC Motor driven Conveyor Belt',
});

conveyor.addAttribute({
  name: 'Tag',
  dataType: DataType.STRING,
  defaultValue: 'CB-001',
});

const motor = new AssetModel(stack, 'Motor', {
  name: 'DC Motor',
  description: 'Conveyor Belt Motor',
});

const loadCell1 = new AssetModel(stack, 'loadCell1', {
  name: 'Load Cell #1',
  description: 'Indicates load in linear section of conveyor',
});

const loadCell2 = new AssetModel(stack, 'loadCell2', {
  name: 'Load Cell #2',
  description: 'Indicates load in linear section of conveyor',
});

motor.addAttribute({
  name: 'Rated Voltage',
  defaultValue: '440',
  dataType: DataType.INTEGER,
});

const temperature: Measure = {
  name: 'Oil Temperature C',
  dataType: DataType.DOUBLE,
  unit: 'C',
};
motor.addMeasurement(temperature);

motor.addMetric({
  name: 'Max Temperature C',
  dataType: DataType.DOUBLE,
  unit: 'C',
  expression: 'max(oil_temp_c)',
  variables: [
    {
      name: 'oil_temp_c',
      property: temperature,
    },
  ],
  tumblingWindow: {
    interval: '1h',
    offset: '2h',
  },
});

motor.addTransform({
  name: 'Oil Temperature F',
  dataType: DataType.DOUBLE,
  unit: 'F',
  expression: '9/5 * oil_temp_c + 32',
  variables: {
    oil_temp_c: 'Oil Temperature C',
  },
});

const weight: Measure = {
  name: 'Weight Kg',
  dataType: DataType.DOUBLE,
  unit: 'Kg',
};

loadCell1.addMeasurement(weight);
loadCell2.addMeasurement(weight);

// Testing hierarchies
conveyor.addChildren(motor, loadCell1, loadCell2);

conveyor.addMetric({
  name: 'Full Weight Kg',
  dataType: DataType.DOUBLE,
  expression: 'sum(load_1, load_2)',
  unit: 'Kg',
  variables: [
    {
      name: 'load_1',
      property: weight,
      model: loadCell1,
    },
    {
      name: 'load_2',
      property: weight,
      model: loadCell2,
    },
  ],
  tumblingWindow: {
    interval: '1h',
  },
} as Metric);

const template = Template.fromStack(stack);

describe('AWS::IoTSiteWise AssetModel Contruct', () => {
  it('synthesizes a template that has 4 AWS::IoTSiteWise::AssetModel resources', () => {
    // template.hasResource('AWS::IoTSiteWise::AssetModel', {});
    template.resourceCountIs('AWS::IoTSiteWise::AssetModel', 4);
  });

  it('contains the parent AssetModel for the Conveyor Belt, with its children', () => {
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: 'Conveyor Belt',
      AssetModelDescription: 'DC Motor driven Conveyor Belt',
      AssetModelProperties: [
        {
          DataType: 'STRING',
          // Attr id must be unique, so we concatenate instance id with attr name
          LogicalId: 'ConveyorTag',
          Name: 'Tag',
          Type: {
            Attribute: {
              DefaultValue: 'CB-001',
            },
            TypeName: 'Attribute',
          },
        },
        {
          Name: 'Full Weight Kg',
          DataType: 'DOUBLE',
          LogicalId: 'ConveyorFullWeightKg',
          Unit: 'Kg',
          Type: {
            TypeName: 'Metric',
            Metric: {
              Expression: 'sum(load_1, load_2)',
              Variables: [
                {
                  Name: 'load_1',
                  Value: {
                    PropertyLogicalId: 'Weight Kg',
                    HierarchyLogicalId: 'loadCell11E15C242',
                  },
                },
                {
                  Name: 'load_2',
                  Value: {
                    PropertyLogicalId: 'Weight Kg',
                    HierarchyLogicalId: 'loadCell2EB275B40',
                  },
                },
              ],
              Window: {
                Tumbling: {
                  Interval: '1h',
                },
              },
            },
          },
        },
      ],
      AssetModelHierarchies: [
        {
          ChildAssetModelId: 'Motor171E74FE',
          LogicalId: 'ConveyorMotor',
          Name: 'DC Motor',
        },
        {
          ChildAssetModelId: 'loadCell11E15C242',
          LogicalId: 'ConveyorloadCell1',
          Name: 'Load Cell #1',
        },
        {
          ChildAssetModelId: 'loadCell2EB275B40',
          LogicalId: 'ConveyorloadCell2',
          Name: 'Load Cell #2',
        },
      ],
    });
  });

  it('contains the model for the motor', () => {
    console.log(template.toJSON());
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: 'DC Motor',
      AssetModelDescription: 'Conveyor Belt Motor',
      AssetModelHierarchies: [],
      AssetModelProperties: [
        {
          DataType: 'INTEGER',
          LogicalId: 'MotorRatedVoltage',
          Name: 'Rated Voltage',
          Type: {
            Attribute: {
              DefaultValue: '440',
            },
            TypeName: 'Attribute',
          },
        },
        {
          Name: 'Oil Temperature C',
          DataType: 'DOUBLE',
          LogicalId: 'MotorOilTemperatureC',
          Unit: 'C',
          Type: {
            TypeName: 'Measure',
          },
        },
        {
          Name: 'Max Temperature C',
          DataType: 'DOUBLE',
          LogicalId: 'MotorMaxTemperatureC',
          Type: {
            TypeName: 'Metric',
            Metric: {
              Expression: 'max(oil_temp_c)',
              Variables: [
                {
                  Name: 'oil_temp_c',
                  Value: {
                    PropertyLogicalId: 'Oil Temperature C',
                  },
                },
              ],
              Window: {
                Tumbling: {
                  Interval: '1h',
                  Offset: '2h',
                },
              },
            },
          },
          Unit: 'C',
        },
        {
          Name: 'Oil Temperature F',
          DataType: 'DOUBLE',
          LogicalId: 'MotorOilTemperatureF',
          Type: {
            TypeName: 'Transform',
            Transform: {
              Expression: '9/5 * oil_temp_c + 32',
              Variables: [
                {
                  Name: 'oil_temp_c',
                  Value: {
                    PropertyLogicalId: 'Oil Temperature C',
                  },
                },
              ],
            },
          },
          Unit: 'F',
        },
      ],
    });
  });

  it('contains models for the load cells', () => {
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: 'Load Cell #1',
      AssetModelDescription: 'Indicates load in linear section of conveyor',
      AssetModelHierarchies: [],
      AssetModelProperties: [
        {
          DataType: 'DOUBLE',
          LogicalId: 'loadCell1WeightKg',
          Name: 'Weight Kg',
          Unit: 'Kg',
          Type: {
            TypeName: 'Measure',
          },
        },
      ],
    });
  });
});
