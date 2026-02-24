import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'kawaaaas',
  authorAddress: 'dev.kawaaaas@gmail.com',
  cdkVersion: '2.189.1',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: 'serverless-spa-construct',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/kawaaas/serverless-spa-construct.git',
  stability: 'experimental',

  description:
    'A high-level AWS CDK construct for building serverless SPAs with DynamoDB, Cognito, API Gateway, S3, CloudFront, WAF, and more.',

  bundledDeps: ['aws-jwt-verify', '@aws-sdk/client-secrets-manager'],

  devDeps: [
    '@types/aws-lambda',
    '@aws-sdk/client-ssm',
    'fast-check',
    'esbuild',
  ],

  keywords: [
    'cdk',
    'aws',
    'serverless',
    'spa',
    'cloudfront',
    'waf',
    'cognito',
    'dynamodb',
    'apigateway',
  ],

  npmignoreEnabled: true,
  npmignore: [
    '/.projen/',
    '/test-reports/',
    'junit.xml',
    '/coverage/',
    'permissions-backup.acl',
    '/dist/changelog.md',
    '/dist/version.txt',
    '/.mergify.yml',
    '/test/',
    '/tsconfig.dev.json',
    '/src/',
    '!/lib/',
    '!/lib/**/*.js',
    '!/lib/**/*.d.ts',
    '!/lambda/',
    '!/lambda/**/*.js',
    '!/lambda/**/*.d.ts',
    'dist',
    '/tsconfig.json',
    '/.github/',
    '/.vscode/',
    '/.idea/',
    '/.projenrc.js',
    'tsconfig.tsbuildinfo',
    '/.eslintrc.json',
    '!.jsii',
    '/.gitattributes',
    '/.projenrc.ts',
    '/projenrc',
  ],
});

// Add post-compile task to compile lambda functions
project.postCompileTask?.exec('npx tsc --project tsconfig.lambda.json', {
  name: 'compile-lambda',
});

project.synth();
