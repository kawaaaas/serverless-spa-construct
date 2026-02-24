import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'kawaaaas',
  authorAddress: 'sho1314_2423@yahoo.co.jp',
  cdkVersion: '2.189.1',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: 'serverless-spa-construct',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/sho1314_2423/serverless-spa-construct.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();