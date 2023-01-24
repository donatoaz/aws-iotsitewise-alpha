import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { AssetModel, DataType } from '../src/index';

const app = new App();
const stack = new Stack(app);

// subject
const model = new AssetModel(stack, 'Conveyor', {
  name: 'Conveyor Belt',
  description: 'DC Motor driven Conveyor Belt',
});

model.addAttribute({
  name: 'Rated Voltage',
  defaultValue: '440',
  dataType: DataType.INTEGER,
});

model.addMeasurement({
  name: 'Oil Temperature C',
  dataType: DataType.DOUBLE,
  unit: 'C',
});

model.addMetric({
  name: 'Max Temperature C',
  dataType: DataType.DOUBLE,
  unit: 'C',
  expression: 'max(oil_temp_c)',
  variables: {
    oil_temp_c: 'Oil Temperature C',
  },
  tumblingWindow: {
    interval: '1h',
    offset: '2h',
  },
});

model.addTransform({
  name: 'Oil Temperature F',
  dataType: DataType.DOUBLE,
  unit: 'F',
  expression: '9/5 * oil_temp_c + 32',
  variables: {
    oil_temp_c: 'Oil Temperature C',
  },
});

const template = Template.fromStack(stack);

describe('AWS::IoTSiteWise AssetModel Contruct', () => {
  it('synthesizes a template that has an AWS::IoTSiteWise::AssetModel resource', () => {
    template.hasResource('AWS::IoTSiteWise::AssetModel', {});
  });

  it('contains valid properties', () => {
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: 'Conveyor Belt',
      AssetModelDescription: 'DC Motor driven Conveyor Belt',
      AssetModelProperties: [
        {
          DataType: 'INTEGER',
          // Attr id must be unique, so we concatenate instance id with attr name
          LogicalId: 'ConveyorRatedVoltage',
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
          LogicalId: 'ConveyorOilTemperatureC',
          Unit: 'C',
          Type: {
            TypeName: 'Measure',
          },
        },
        {
          Name: 'Max Temperature C',
          DataType: 'DOUBLE',
          LogicalId: 'ConveyorMaxTemperatureC',
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
          LogicalId: 'ConveyorOilTemperatureF',
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
});
