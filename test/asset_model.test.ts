import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { AssetModel, Attribute, DataType, Measurement, Metric, Transform } from '../src/index';

const app = new App();
const stack = new Stack(app);

// subject
const conveyor = new AssetModel(stack, 'Conveyor', {
  name: 'Conveyor Belt',
  description: 'DC Motor driven Conveyor Belt',
});

conveyor.addAttribute(new Attribute({
  name: 'Tag',
  dataType: DataType.STRING,
  defaultValue: 'CB-001',
}));

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

motor.addAttribute(new Attribute({
  name: 'Rated Voltage',
  defaultValue: '440',
  dataType: DataType.INTEGER,
}));

const temperature: Measurement = new Measurement({
  name: 'Oil Temperature C',
  dataType: DataType.DOUBLE,
  unit: 'C',
  logicalId: 'TemperatureId', // for testing only, when deployed, this is a result from resource creation
});
motor.addMeasurement(temperature);

motor.addMetric(new Metric({
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
  },
}));

motor.addTransform(new Transform({
  name: 'Oil Temperature F',
  dataType: DataType.DOUBLE,
  unit: 'F',
  expression: '9/5 * oil_temp_c + 32',
  variables: [{ name: 'oil_temp_c', property: temperature }],
}));

const weight = {
  name: 'Weight Kg',
  dataType: DataType.DOUBLE,
  unit: 'Kg',
};
const weight1 = new Measurement({ logicalId: 'Weight1', ...weight });
const weight2 = new Measurement({ logicalId: 'Weight2', ...weight });

loadCell1.addMeasurement(weight1);
loadCell2.addMeasurement(weight2);

const avgWeight1 = new Metric({
  name: 'Avg Weight',
  dataType: DataType.DOUBLE,
  expression: 'avg(weight)',
  unit: 'Kg',
  logicalId: 'AvgWeight1',
  variables: [
    {
      name: 'weight',
      property: weight1,
    },
  ],
  tumblingWindow: {
    interval: '1h',
  },
});

const avgWeight2 = new Metric({
  name: 'Avg Weight',
  dataType: DataType.DOUBLE,
  expression: 'avg(weight)',
  unit: 'Kg',
  logicalId: 'AvgWeight2',
  variables: [
    {
      name: 'weight',
      property: weight2,
    },
  ],
  tumblingWindow: {
    interval: '1h',
  },
});

loadCell1.addMetric(avgWeight1);
loadCell2.addMetric(avgWeight2);

// Testing hierarchies
conveyor.addChildren(motor, loadCell1, loadCell2);
// conveyor.addChild({
//   name: 'Motor',
//   childAssetModelId: motor.assetModelId,
// });

// conveyor.addChild({
//   name: 'LoadCell1',
//   childAssetModelId: loadCell1.assetModelId,
// });

// conveyor.addChild({
//   name: 'LoadCell2',
//   childAssetModelId: loadCell2.assetModelId,
// });

conveyor.addMetric(new Metric({
  name: 'Full Weight Kg',
  dataType: DataType.DOUBLE,
  expression: 'sum(load_1, load_2)',
  unit: 'Kg',
  logicalId: 'FullWeightId',
  variables: [
    {
      name: 'load_1',
      property: avgWeight1,
      hierachy: conveyor.findChild(loadCell1),
    },
    {
      name: 'load_2',
      property: avgWeight2,
      hierachy: conveyor.findChild(loadCell2),
    },
  ],
  tumblingWindow: {
    interval: '1h',
  },
}));

const template = Template.fromStack(stack);

describe('AWS::IoTSiteWise AssetModel Contruct', () => {
  it('synthesizes a template that has 4 AWS::IoTSiteWise::AssetModel resources', () => {
    template.resourceCountIs('AWS::IoTSiteWise::AssetModel', 4);
  });

  it('contains the parent AssetModel for the Conveyor Belt, with its children', () => {
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: 'Conveyor Belt',
      AssetModelDescription: 'DC Motor driven Conveyor Belt',
      AssetModelProperties: [
        {
          DataType: 'STRING',
          LogicalId: 'Tag',
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
          LogicalId: 'FullWeightId',
          Unit: 'Kg',
          Type: {
            TypeName: 'Metric',
            Metric: {
              Expression: 'sum(load_1, load_2)',
              Variables: [
                {
                  Name: 'load_1',
                  Value: {
                    PropertyLogicalId: 'AvgWeight1',
                    HierarchyLogicalId: 'Conveyor_Belt-Load_Cell__1',
                  },
                },
                {
                  Name: 'load_2',
                  Value: {
                    PropertyLogicalId: 'AvgWeight2',
                    HierarchyLogicalId: 'Conveyor_Belt-Load_Cell__2',
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
          ChildAssetModelId: {
            'Fn::GetAtt': ['Motor171E74FE', 'AssetModelId'],
          },
          LogicalId: 'Conveyor_Belt-DC_Motor',
          Name: 'Conveyor_Belt-DC_Motor',
        },
        {
          ChildAssetModelId: {
            'Fn::GetAtt': ['loadCell11E15C242', 'AssetModelId'],
          },
          LogicalId: 'Conveyor_Belt-Load_Cell__1',
          Name: 'Conveyor_Belt-Load_Cell__1',
        },
        {
          ChildAssetModelId: {
            'Fn::GetAtt': ['loadCell2EB275B40', 'AssetModelId'],
          },
          LogicalId: 'Conveyor_Belt-Load_Cell__2',
          Name: 'Conveyor_Belt-Load_Cell__2',
        },
      ],
    });
  });

  it('contains the model for the motor', () => {
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: 'DC Motor',
      AssetModelDescription: 'Conveyor Belt Motor',
      AssetModelHierarchies: [],
      AssetModelProperties: [
        {
          DataType: 'INTEGER',
          LogicalId: 'Rated_Voltage',
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
          LogicalId: 'TemperatureId',
          Unit: 'C',
          Type: {
            TypeName: 'Measurement',
          },
        },
        {
          Name: 'Max Temperature C',
          DataType: 'DOUBLE',
          LogicalId: 'Max_Temperature_C',
          Type: {
            TypeName: 'Metric',
            Metric: {
              Expression: 'max(oil_temp_c)',
              Variables: [
                {
                  Name: 'oil_temp_c',
                  Value: {
                    PropertyLogicalId: 'TemperatureId',
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
          Unit: 'C',
        },
        {
          Name: 'Oil Temperature F',
          DataType: 'DOUBLE',
          LogicalId: 'Oil_Temperature_F',
          Type: {
            TypeName: 'Transform',
            Transform: {
              Expression: '9/5 * oil_temp_c + 32',
              Variables: [
                {
                  Name: 'oil_temp_c',
                  Value: {
                    PropertyLogicalId: 'TemperatureId',
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

  it.each([[1], [2]])('contains model for the load cell %s', (id) => {
    template.hasResourceProperties('AWS::IoTSiteWise::AssetModel', {
      AssetModelName: `Load Cell #${id}`,
      AssetModelDescription: 'Indicates load in linear section of conveyor',
      AssetModelHierarchies: [],
      AssetModelProperties: [
        {
          DataType: 'DOUBLE',
          LogicalId: `Weight${id}`,
          Name: 'Weight Kg',
          Unit: 'Kg',
          Type: {
            TypeName: 'Measurement',
          },
        },
        {
          Name: 'Avg Weight',
          DataType: 'DOUBLE',
          LogicalId: `AvgWeight${id}`,
          Type: {
            TypeName: 'Metric',
            Metric: {
              Expression: 'avg(weight)',
              Variables: [
                {
                  Name: 'weight',
                  Value: {
                    PropertyLogicalId: `Weight${id}`,
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
          Unit: 'Kg',
        },
      ],
    });
  });
});
