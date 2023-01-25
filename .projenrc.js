const { awscdk } = require('projen');

cdkVersion = '2.45.0';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'donatoaz',
  authorName: 'Donato Azevedo',
  authorAddress: 'donatoaz@amazon.com',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  name: '@aws-cdk/aws-iotsitewise-alpha',
  repositoryUrl: 'https://github.com/donatoaz/aws-iotsitewise-alpha.git',
  license: 'Apache-2.0',
  keywords: ['experimental', 'awscdk'],
  publishToPypi: {
    distName: 'aws-iotsitewise-alpha',
    module: 'aws_iotsitewise_alpha',
  },
  stability: 'experimental',
  packageName: '@aws-cdk/aws-iotsitewise-alpha',
  description: 'The CDK Construct Library for AWS::IoTSitewise.',

  keywords: ['awscdk'],
  docgen: true,
  eslint: true,
  // dependabot: true,
  gitignore: ['.vscode', '_local_test/', 'cdk.json'],
  // deps: ['aws-cdk-lib'],
  devDeps: ['aws-cdk-lib'] /* Build dependencies for this module. */,
});

project.synth();
