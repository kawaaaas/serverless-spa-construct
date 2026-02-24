import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { ApiConstruct } from '../../src/constructs/api-construct';

describe('ApiConstruct', () => {
  let app: App;
  let stack: Stack;
  let table: Table;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
    table = new Table(stack, 'TestTable', {
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  });

  describe('REST API', () => {
    test('creates REST API resource', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
    });

    test('enables CORS by default', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::ApiGateway::Method', {
        HttpMethod: 'OPTIONS',
      });
    });
  });

  describe('Lambda Function', () => {
    test('creates Lambda function', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
    });

    test('uses Node.js 20.x runtime', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::Lambda::Function', {
        Runtime: 'nodejs20.x',
      });
    });

    test('sets default memory size to 128MB', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::Lambda::Function', {
        MemorySize: 128,
      });
    });

    test('sets default timeout to 30 seconds', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::Lambda::Function', { Timeout: 30 });
    });

    test('sets TABLE_NAME environment variable', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::Lambda::Function', {
        Environment: { Variables: { TABLE_NAME: Match.anyValue() } },
      });
    });

    test('grants Lambda read/write access to DynamoDB table', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Action: Match.arrayWith([
                'dynamodb:BatchGetItem',
                'dynamodb:Query',
                'dynamodb:GetItem',
                'dynamodb:Scan',
                'dynamodb:BatchWriteItem',
                'dynamodb:PutItem',
                'dynamodb:UpdateItem',
                'dynamodb:DeleteItem',
              ]),
              Effect: 'Allow',
            }),
          ]),
        },
      });
    });
  });

  describe('API Gateway Integration', () => {
    test('creates proxy resource {proxy+}', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::ApiGateway::Resource', {
        PathPart: '{proxy+}',
      });
    });

    test('creates ANY method on root path', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::ApiGateway::Method', {
        HttpMethod: 'ANY',
        Integration: { Type: 'AWS_PROXY' },
      });
    });

    test('creates ANY method on proxy resource', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      const methods = template.findResources('AWS::ApiGateway::Method', {
        Properties: { HttpMethod: 'ANY' },
      });
      expect(Object.keys(methods).length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Cognito Authorizer', () => {
    test('creates Cognito Authorizer when userPool is provided', () => {
      const userPool = new UserPool(stack, 'UserPool');
      new ApiConstruct(stack, 'Api', {
        table,
        userPool,
        entry: 'src/lambda/handler.ts',
      });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::ApiGateway::Authorizer', 1);
      template.hasResourceProperties('AWS::ApiGateway::Authorizer', {
        Type: 'COGNITO_USER_POOLS',
      });
    });

    test('does not create Authorizer when userPool is not provided', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::ApiGateway::Authorizer', 0);
    });

    test('applies Cognito Authorizer to methods when userPool is provided', () => {
      const userPool = new UserPool(stack, 'UserPool');
      new ApiConstruct(stack, 'Api', {
        table,
        userPool,
        entry: 'src/lambda/handler.ts',
      });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::ApiGateway::Method', {
        HttpMethod: 'ANY',
        AuthorizationType: 'COGNITO_USER_POOLS',
      });
    });
  });

  describe('Custom Header', () => {
    test('uses default custom header name', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
      });
      expect(api.customHeaderName).toBe('x-origin-verify');
    });

    test('uses custom header name when provided', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        customHeaderName: 'x-custom-header',
      });
      expect(api.customHeaderName).toBe('x-custom-header');
    });
  });

  describe('Output Properties', () => {
    test('exposes api property', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
      });
      expect(api.api).toBeDefined();
    });

    test('exposes handler property', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
      });
      expect(api.handler).toBeDefined();
    });

    test('exposes apiUrl property', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
      });
      expect(api.apiUrl).toBeDefined();
      expect(typeof api.apiUrl).toBe('string');
    });

    test('exposes customHeaderName property', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
      });
      expect(api.customHeaderName).toBeDefined();
      expect(typeof api.customHeaderName).toBe('string');
    });
  });

  describe('Secrets Manager Integration', () => {
    test('grants Lambda Secrets Manager read permission when secretArn is provided', () => {
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      const template = Template.fromStack(stack);
      const policies = template.findResources('AWS::IAM::Policy');
      let hasSecretsManagerPermission = false;
      for (const policyKey of Object.keys(policies)) {
        const policy = policies[policyKey];
        const statements = policy.Properties?.PolicyDocument?.Statement || [];
        for (const statement of statements) {
          if (Array.isArray(statement.Action)) {
            if (
              statement.Action.includes('secretsmanager:GetSecretValue') &&
              statement.Action.includes('secretsmanager:DescribeSecret')
            ) {
              hasSecretsManagerPermission = true;
              expect(statement.Effect).toBe('Allow');
            }
          }
        }
      }
      expect(hasSecretsManagerPermission).toBe(true);
    });

    test('does not grant Secrets Manager permission when secretArn is not provided', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      const policies = template.findResources('AWS::IAM::Policy');
      for (const policyKey of Object.keys(policies)) {
        const policy = policies[policyKey];
        const statements = policy.Properties?.PolicyDocument?.Statement || [];
        for (const statement of statements) {
          if (Array.isArray(statement.Action)) {
            expect(statement.Action).not.toContain(
              'secretsmanager:GetSecretValue',
            );
          } else {
            expect(statement.Action).not.toBe('secretsmanager:GetSecretValue');
          }
        }
      }
    });
  });

  describe('Lambda Authorizer', () => {
    test('creates Lambda Authorizer when secretArn is provided', () => {
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 2);
      template.hasResourceProperties('AWS::ApiGateway::Authorizer', {
        Type: 'REQUEST',
      });
    });

    test('does not create Lambda Authorizer when secretArn is not provided', () => {
      new ApiConstruct(stack, 'Api', { table, entry: 'src/lambda/handler.ts' });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
      template.resourceCountIs('AWS::ApiGateway::Authorizer', 0);
    });

    test('does not create Lambda Authorizer when enableLambdaAuthorizer is false', () => {
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
        enableLambdaAuthorizer: false,
      });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 1);
      template.resourceCountIs('AWS::ApiGateway::Authorizer', 0);
    });

    test('applies Lambda Authorizer to methods when secretArn is provided', () => {
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::ApiGateway::Method', {
        HttpMethod: 'ANY',
        AuthorizationType: 'CUSTOM',
      });
    });

    test('sets correct environment variables for Lambda Authorizer', () => {
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
        customHeaderName: 'x-custom-verify',
        authorizerCacheTtlSeconds: 600,
      });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::Lambda::Function', {
        Environment: {
          Variables: {
            CUSTOM_HEADER_NAME: 'x-custom-verify',
            CACHE_TTL_SECONDS: '600',
          },
        },
      });
    });

    test('exposes authorizerFunction property when Lambda Authorizer is created', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      expect(api.authorizerFunction).toBeDefined();
    });

    test('authorizerFunction is undefined when Lambda Authorizer is not created', () => {
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
      });
      expect(api.authorizerFunction).toBeUndefined();
    });
  });

  describe('Cognito and Lambda Authorizer Combination', () => {
    test('creates Lambda Authorizer (REQUEST type) when userPool and secretArn are provided', () => {
      const userPool = new UserPool(stack, 'UserPool');
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        userPool,
        userPoolClientId: 'test-client-id',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      const template = Template.fromStack(stack);
      template.resourceCountIs('AWS::Lambda::Function', 2);
      template.resourceCountIs('AWS::ApiGateway::Authorizer', 1);
      template.hasResourceProperties('AWS::ApiGateway::Authorizer', {
        Type: 'REQUEST',
      });
    });

    test('uses CUSTOM AuthorizationType for methods when both are provided', () => {
      const userPool = new UserPool(stack, 'UserPool');
      new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        userPool,
        userPoolClientId: 'test-client-id',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::ApiGateway::Method', {
        HttpMethod: 'ANY',
        AuthorizationType: 'CUSTOM',
      });
    });

    test('exposes authorizerFunction when both userPool and secretArn are provided', () => {
      const userPool = new UserPool(stack, 'UserPool');
      const api = new ApiConstruct(stack, 'Api', {
        table,
        entry: 'src/lambda/handler.ts',
        userPool,
        userPoolClientId: 'test-client-id',
        secretArn:
          'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret-abc123',
      });
      expect(api.authorizerFunction).toBeDefined();
    });
  });
});
