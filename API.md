# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ApiConstruct <a name="ApiConstruct" id="serverless-spa-construct.ApiConstruct"></a>

A CDK construct that creates an API Gateway (REST) with Lambda backend.

This construct provides:
- REST API with resource policy for CloudFront-only access
- Lambda function with DynamoDB read/write permissions
- Optional Cognito Authorizer for JWT authentication
- Optional Lambda Authorizer for custom header validation
- Proxy integration routing all requests to Lambda

#### Initializers <a name="Initializers" id="serverless-spa-construct.ApiConstruct.Initializer"></a>

```typescript
import { ApiConstruct } from 'serverless-spa-construct'

new ApiConstruct(scope: Construct, id: string, props: ApiConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ApiConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.ApiConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.ApiConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.ApiConstructProps">ApiConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ApiConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ApiConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ApiConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.ApiConstructProps">ApiConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.ApiConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.ApiConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.ApiConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.ApiConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.ApiConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.ApiConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.ApiConstruct.isConstruct"></a>

```typescript
import { ApiConstruct } from 'serverless-spa-construct'

ApiConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.ApiConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ApiConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.ApiConstruct.property.api">api</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | The REST API created by this construct. |
| <code><a href="#serverless-spa-construct.ApiConstruct.property.apiUrl">apiUrl</a></code> | <code>string</code> | The URL of the REST API endpoint. |
| <code><a href="#serverless-spa-construct.ApiConstruct.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | The custom header name used for CloudFront-only access restriction. |
| <code><a href="#serverless-spa-construct.ApiConstruct.property.handler">handler</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function created by this construct. |
| <code><a href="#serverless-spa-construct.ApiConstruct.property.authorizerFunction">authorizerFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda Authorizer function for custom header validation. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.ApiConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `api`<sup>Required</sup> <a name="api" id="serverless-spa-construct.ApiConstruct.property.api"></a>

```typescript
public readonly api: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

The REST API created by this construct.

---

##### `apiUrl`<sup>Required</sup> <a name="apiUrl" id="serverless-spa-construct.ApiConstruct.property.apiUrl"></a>

```typescript
public readonly apiUrl: string;
```

- *Type:* string

The URL of the REST API endpoint.

---

##### `customHeaderName`<sup>Required</sup> <a name="customHeaderName" id="serverless-spa-construct.ApiConstruct.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string

The custom header name used for CloudFront-only access restriction.

---

##### `handler`<sup>Required</sup> <a name="handler" id="serverless-spa-construct.ApiConstruct.property.handler"></a>

```typescript
public readonly handler: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function created by this construct.

---

##### `authorizerFunction`<sup>Optional</sup> <a name="authorizerFunction" id="serverless-spa-construct.ApiConstruct.property.authorizerFunction"></a>

```typescript
public readonly authorizerFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda Authorizer function for custom header validation.

Only created when secretArn is provided and enableLambdaAuthorizer is true.

---


### AuthConstruct <a name="AuthConstruct" id="serverless-spa-construct.AuthConstruct"></a>

A CDK construct that creates a Cognito User Pool with sensible defaults for SPAs.

This construct provides:
- Cognito User Pool with Lite tier (cost-optimized)
- Self sign-up enabled with email as sign-in alias
- Email verification enabled
- Secure password policy (min 8 chars, lowercase, digits required)
- User Pool Client without client secret (SPA-friendly)
- USER_SRP_AUTH and ALLOW_REFRESH_TOKEN_AUTH flows enabled

#### Initializers <a name="Initializers" id="serverless-spa-construct.AuthConstruct.Initializer"></a>

```typescript
import { AuthConstruct } from 'serverless-spa-construct'

new AuthConstruct(scope: Construct, id: string, props?: AuthConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.AuthConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.AuthConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.AuthConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.AuthConstructProps">AuthConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.AuthConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.AuthConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.AuthConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.AuthConstructProps">AuthConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.AuthConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.AuthConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.AuthConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.AuthConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.AuthConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.AuthConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.AuthConstruct.isConstruct"></a>

```typescript
import { AuthConstruct } from 'serverless-spa-construct'

AuthConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.AuthConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.AuthConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.AuthConstruct.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.IUserPool</code> | The Cognito User Pool created by this construct. |
| <code><a href="#serverless-spa-construct.AuthConstruct.property.userPoolClient">userPoolClient</a></code> | <code>aws-cdk-lib.aws_cognito.IUserPoolClient</code> | The Cognito User Pool Client created by this construct. |
| <code><a href="#serverless-spa-construct.AuthConstruct.property.userPoolClientId">userPoolClientId</a></code> | <code>string</code> | The ID of the Cognito User Pool Client. |
| <code><a href="#serverless-spa-construct.AuthConstruct.property.userPoolId">userPoolId</a></code> | <code>string</code> | The ID of the Cognito User Pool. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.AuthConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `userPool`<sup>Required</sup> <a name="userPool" id="serverless-spa-construct.AuthConstruct.property.userPool"></a>

```typescript
public readonly userPool: IUserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.IUserPool

The Cognito User Pool created by this construct.

---

##### `userPoolClient`<sup>Required</sup> <a name="userPoolClient" id="serverless-spa-construct.AuthConstruct.property.userPoolClient"></a>

```typescript
public readonly userPoolClient: IUserPoolClient;
```

- *Type:* aws-cdk-lib.aws_cognito.IUserPoolClient

The Cognito User Pool Client created by this construct.

---

##### `userPoolClientId`<sup>Required</sup> <a name="userPoolClientId" id="serverless-spa-construct.AuthConstruct.property.userPoolClientId"></a>

```typescript
public readonly userPoolClientId: string;
```

- *Type:* string

The ID of the Cognito User Pool Client.

---

##### `userPoolId`<sup>Required</sup> <a name="userPoolId" id="serverless-spa-construct.AuthConstruct.property.userPoolId"></a>

```typescript
public readonly userPoolId: string;
```

- *Type:* string

The ID of the Cognito User Pool.

---


### CertificateConstruct <a name="CertificateConstruct" id="serverless-spa-construct.CertificateConstruct"></a>

A low-level CDK construct that creates an ACM certificate with DNS validation.

This construct must be deployed in us-east-1 region because CloudFront
requires ACM certificates to be in us-east-1.

*Example*

```typescript
const cert = new CertificateConstruct(this, 'Certificate', {
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
});
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.CertificateConstruct.Initializer"></a>

```typescript
import { CertificateConstruct } from 'serverless-spa-construct'

new CertificateConstruct(scope: Construct, id: string, props: CertificateConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.CertificateConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.CertificateConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.CertificateConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.CertificateConstructProps">CertificateConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.CertificateConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.CertificateConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.CertificateConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.CertificateConstructProps">CertificateConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.CertificateConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.CertificateConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.CertificateConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.CertificateConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.CertificateConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.CertificateConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.CertificateConstruct.isConstruct"></a>

```typescript
import { CertificateConstruct } from 'serverless-spa-construct'

CertificateConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.CertificateConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.CertificateConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.CertificateConstruct.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | The ACM certificate. |
| <code><a href="#serverless-spa-construct.CertificateConstruct.property.certificateArn">certificateArn</a></code> | <code>string</code> | The ACM certificate ARN. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.CertificateConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `certificate`<sup>Required</sup> <a name="certificate" id="serverless-spa-construct.CertificateConstruct.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

The ACM certificate.

---

##### `certificateArn`<sup>Required</sup> <a name="certificateArn" id="serverless-spa-construct.CertificateConstruct.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

The ACM certificate ARN.

---


### DatabaseConstruct <a name="DatabaseConstruct" id="serverless-spa-construct.DatabaseConstruct"></a>

A CDK construct that creates a DynamoDB table with sensible defaults.

This construct is designed for single-table design patterns and provides:
- Default partition key (PK) and sort key (SK) with string type
- On-demand billing mode for cost optimization
- DESTROY removal policy for development environments
- Support for GSIs and custom table properties

#### Initializers <a name="Initializers" id="serverless-spa-construct.DatabaseConstruct.Initializer"></a>

```typescript
import { DatabaseConstruct } from 'serverless-spa-construct'

new DatabaseConstruct(scope: Construct, id: string, props?: DatabaseConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.DatabaseConstructProps">DatabaseConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.DatabaseConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.DatabaseConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.DatabaseConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.DatabaseConstructProps">DatabaseConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.DatabaseConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.DatabaseConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.DatabaseConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.DatabaseConstruct.isConstruct"></a>

```typescript
import { DatabaseConstruct } from 'serverless-spa-construct'

DatabaseConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.DatabaseConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.property.table">table</a></code> | <code>aws-cdk-lib.aws_dynamodb.Table</code> | The DynamoDB table created by this construct. |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.property.tableArn">tableArn</a></code> | <code>string</code> | The ARN of the DynamoDB table. |
| <code><a href="#serverless-spa-construct.DatabaseConstruct.property.tableName">tableName</a></code> | <code>string</code> | The name of the DynamoDB table. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.DatabaseConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `table`<sup>Required</sup> <a name="table" id="serverless-spa-construct.DatabaseConstruct.property.table"></a>

```typescript
public readonly table: Table;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Table

The DynamoDB table created by this construct.

Exposes Table (not ITable) to enable use of the grants property.

---

##### `tableArn`<sup>Required</sup> <a name="tableArn" id="serverless-spa-construct.DatabaseConstruct.property.tableArn"></a>

```typescript
public readonly tableArn: string;
```

- *Type:* string

The ARN of the DynamoDB table.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="serverless-spa-construct.DatabaseConstruct.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The name of the DynamoDB table.

---


### FrontendConstruct <a name="FrontendConstruct" id="serverless-spa-construct.FrontendConstruct"></a>

A CDK construct that creates an S3 bucket and CloudFront distribution for hosting SPAs.

This construct provides:
- S3 bucket with public access blocked (CloudFront-only access via OAC)
- CloudFront distribution with SPA routing support via CloudFront Functions
- Optional API Gateway routing for /api/* paths
- Custom header support for API Gateway access restriction
- Optional custom domain with ACM certificate and Route53 DNS record

#### Initializers <a name="Initializers" id="serverless-spa-construct.FrontendConstruct.Initializer"></a>

```typescript
import { FrontendConstruct } from 'serverless-spa-construct'

new FrontendConstruct(scope: Construct, id: string, props?: FrontendConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.FrontendConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.FrontendConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.FrontendConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.FrontendConstructProps">FrontendConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.FrontendConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.FrontendConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.FrontendConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.FrontendConstructProps">FrontendConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.FrontendConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.FrontendConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.FrontendConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.FrontendConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.FrontendConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.FrontendConstruct.isConstruct"></a>

```typescript
import { FrontendConstruct } from 'serverless-spa-construct'

FrontendConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.FrontendConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket created by this construct. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.distribution">distribution</a></code> | <code>aws-cdk-lib.aws_cloudfront.IDistribution</code> | The CloudFront distribution created by this construct. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.distributionDomainName">distributionDomainName</a></code> | <code>string</code> | The domain name of the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | The ACM certificate (auto-created or provided). |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.customDomainName">customDomainName</a></code> | <code>string</code> | The custom domain name if configured. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | The custom header name used for API Gateway access restriction. |
| <code><a href="#serverless-spa-construct.FrontendConstruct.property.dnsRecord">dnsRecord</a></code> | <code>aws-cdk-lib.aws_route53.ARecord</code> | The Route53 A record if created. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.FrontendConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="serverless-spa-construct.FrontendConstruct.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket created by this construct.

---

##### `distribution`<sup>Required</sup> <a name="distribution" id="serverless-spa-construct.FrontendConstruct.property.distribution"></a>

```typescript
public readonly distribution: IDistribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.IDistribution

The CloudFront distribution created by this construct.

---

##### `distributionDomainName`<sup>Required</sup> <a name="distributionDomainName" id="serverless-spa-construct.FrontendConstruct.property.distributionDomainName"></a>

```typescript
public readonly distributionDomainName: string;
```

- *Type:* string

The domain name of the CloudFront distribution.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="serverless-spa-construct.FrontendConstruct.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

The ACM certificate (auto-created or provided).

---

##### `customDomainName`<sup>Optional</sup> <a name="customDomainName" id="serverless-spa-construct.FrontendConstruct.property.customDomainName"></a>

```typescript
public readonly customDomainName: string;
```

- *Type:* string

The custom domain name if configured.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.FrontendConstruct.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string

The custom header name used for API Gateway access restriction.

Only available when api is provided.

---

##### `dnsRecord`<sup>Optional</sup> <a name="dnsRecord" id="serverless-spa-construct.FrontendConstruct.property.dnsRecord"></a>

```typescript
public readonly dnsRecord: ARecord;
```

- *Type:* aws-cdk-lib.aws_route53.ARecord

The Route53 A record if created.

---


### LambdaEdgeConstruct <a name="LambdaEdgeConstruct" id="serverless-spa-construct.LambdaEdgeConstruct"></a>

A low-level CDK construct that creates a Lambda@Edge function for CloudFront Origin Request.

This construct creates:
- A Lambda@Edge function that retrieves secret values from Secrets Manager
- Adds custom headers to origin requests for API Gateway validation
- Implements in-memory caching to reduce Secrets Manager API calls

Note: This construct must be deployed in us-east-1 region because
Lambda@Edge functions can only be created in us-east-1.

The Lambda@Edge function uses NodejsFunction with esbuild's define option
to embed configuration at build time, since Lambda@Edge does not support
environment variables.

*Example*

```typescript
const lambdaEdge = new LambdaEdgeConstruct(this, 'LambdaEdge', {
  secretArn: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret',
  customHeaderName: 'x-origin-verify',
  cacheTtlSeconds: 300,
});

// Use the function version for CloudFront
const functionVersion = lambdaEdge.functionVersion;
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.LambdaEdgeConstruct.Initializer"></a>

```typescript
import { LambdaEdgeConstruct } from 'serverless-spa-construct'

new LambdaEdgeConstruct(scope: Construct, id: string, props: LambdaEdgeConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.LambdaEdgeConstructProps">LambdaEdgeConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.LambdaEdgeConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.LambdaEdgeConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.LambdaEdgeConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.LambdaEdgeConstructProps">LambdaEdgeConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.LambdaEdgeConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.LambdaEdgeConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.LambdaEdgeConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.LambdaEdgeConstruct.isConstruct"></a>

```typescript
import { LambdaEdgeConstruct } from 'serverless-spa-construct'

LambdaEdgeConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.LambdaEdgeConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.property.edgeFunction">edgeFunction</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | The Lambda@Edge function. |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstruct.property.functionVersion">functionVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The Lambda function version for CloudFront association. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.LambdaEdgeConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `edgeFunction`<sup>Required</sup> <a name="edgeFunction" id="serverless-spa-construct.LambdaEdgeConstruct.property.edgeFunction"></a>

```typescript
public readonly edgeFunction: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

The Lambda@Edge function.

---

##### `functionVersion`<sup>Required</sup> <a name="functionVersion" id="serverless-spa-construct.LambdaEdgeConstruct.property.functionVersion"></a>

```typescript
public readonly functionVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The Lambda function version for CloudFront association.

---


### SecretConstruct <a name="SecretConstruct" id="serverless-spa-construct.SecretConstruct"></a>

A low-level CDK construct that creates a Secrets Manager secret with automatic rotation for custom header values.

This construct creates:
- A Secrets Manager secret containing a UUID for custom header validation
- A rotation Lambda function that generates new UUID values
- Automatic rotation schedule (default: every 7 days)

The rotation Lambda also updates the SSM Parameter with the new secret ARN
to ensure cross-region consistency.

*Example*

```typescript
const secret = new SecretConstruct(this, 'Secret', {
  customHeaderName: 'x-origin-verify',
  rotationDays: 14,
  ssmPrefix: '/myapp/security/',
});

// Use the secret ARN
console.log(secret.secretArn);
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.SecretConstruct.Initializer"></a>

```typescript
import { SecretConstruct } from 'serverless-spa-construct'

new SecretConstruct(scope: Construct, id: string, props?: SecretConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SecretConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.SecretConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.SecretConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.SecretConstructProps">SecretConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.SecretConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.SecretConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.SecretConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.SecretConstructProps">SecretConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.SecretConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.SecretConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.SecretConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.SecretConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.SecretConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.SecretConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.SecretConstruct.isConstruct"></a>

```typescript
import { SecretConstruct } from 'serverless-spa-construct'

SecretConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.SecretConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | The custom header name. |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.replicaRegions">replicaRegions</a></code> | <code>string[]</code> | The replica regions for secret replication. |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.rotationFunction">rotationFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The rotation Lambda function. |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The Secrets Manager secret. |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.secretArn">secretArn</a></code> | <code>string</code> | The Secrets Manager secret ARN. |
| <code><a href="#serverless-spa-construct.SecretConstruct.property.secretName">secretName</a></code> | <code>string</code> | The Secrets Manager secret name (without random suffix). |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.SecretConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `customHeaderName`<sup>Required</sup> <a name="customHeaderName" id="serverless-spa-construct.SecretConstruct.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string

The custom header name.

---

##### `replicaRegions`<sup>Required</sup> <a name="replicaRegions" id="serverless-spa-construct.SecretConstruct.property.replicaRegions"></a>

```typescript
public readonly replicaRegions: string[];
```

- *Type:* string[]

The replica regions for secret replication.

---

##### `rotationFunction`<sup>Required</sup> <a name="rotationFunction" id="serverless-spa-construct.SecretConstruct.property.rotationFunction"></a>

```typescript
public readonly rotationFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The rotation Lambda function.

---

##### `secret`<sup>Required</sup> <a name="secret" id="serverless-spa-construct.SecretConstruct.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The Secrets Manager secret.

---

##### `secretArn`<sup>Required</sup> <a name="secretArn" id="serverless-spa-construct.SecretConstruct.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

The Secrets Manager secret ARN.

---

##### `secretName`<sup>Required</sup> <a name="secretName" id="serverless-spa-construct.SecretConstruct.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string

The Secrets Manager secret name (without random suffix).

This is the logical name used when creating the secret.

---


### ServerlessSpaConstruct <a name="ServerlessSpaConstruct" id="serverless-spa-construct.ServerlessSpaConstruct"></a>

A high-level CDK construct that creates a complete serverless SPA infrastructure.

## Recommended: Use Factory Methods

Factory methods provide clear, use-case specific APIs.

*Example*

```typescript
// Simplest setup - CloudFront default domain
ServerlessSpaConstruct.minimal(this, 'App', {
  lambdaEntry: './src/api/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
});

## Architecture

This construct creates:
- DynamoDB table (single-table design, on-demand)
- Cognito User Pool (JWT authentication)
- API Gateway + Lambda (backend API)
- S3 + CloudFront (static hosting)
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.ServerlessSpaConstruct.Initializer"></a>

```typescript
import { ServerlessSpaConstruct } from 'serverless-spa-construct'

new ServerlessSpaConstruct(scope: Construct, id: string, props?: ServerlessSpaProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.ServerlessSpaProps">ServerlessSpaProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.ServerlessSpaProps">ServerlessSpaProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.ServerlessSpaConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.ServerlessSpaConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.ServerlessSpaConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.minimal">minimal</a></code> | Creates a minimal ServerlessSpaConstruct with CloudFront default domain. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.withCustomDomain">withCustomDomain</a></code> | Creates a ServerlessSpaConstruct with custom domain and certificate from SecurityStack. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.withCustomDomainAndWaf">withCustomDomainAndWaf</a></code> | Creates a ServerlessSpaConstruct with custom domain AND WAF protection. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.withWaf">withWaf</a></code> | Creates a ServerlessSpaConstruct with WAF protection. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.ServerlessSpaConstruct.isConstruct"></a>

```typescript
import { ServerlessSpaConstruct } from 'serverless-spa-construct'

ServerlessSpaConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.ServerlessSpaConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `minimal` <a name="minimal" id="serverless-spa-construct.ServerlessSpaConstruct.minimal"></a>

```typescript
import { ServerlessSpaConstruct } from 'serverless-spa-construct'

ServerlessSpaConstruct.minimal(scope: Construct, id: string, props: MinimalProps)
```

Creates a minimal ServerlessSpaConstruct with CloudFront default domain.

Best for: Development, testing, or when custom domain is not needed.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaConstruct.minimal.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaConstruct.minimal.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaConstruct.minimal.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.MinimalProps">MinimalProps</a>

---

##### `withCustomDomain` <a name="withCustomDomain" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomain"></a>

```typescript
import { ServerlessSpaConstruct } from 'serverless-spa-construct'

ServerlessSpaConstruct.withCustomDomain(scope: Construct, id: string, props: WithCustomDomainProps)
```

Creates a ServerlessSpaConstruct with custom domain and certificate from SecurityStack.

Requires: ServerlessSpaSecurityConstruct with certificate deployed in us-east-1 first.
Best for: Production deployments with your own domain.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomain.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomain.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomain.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WithCustomDomainProps">WithCustomDomainProps</a>

---

##### `withCustomDomainAndWaf` <a name="withCustomDomainAndWaf" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomainAndWaf"></a>

```typescript
import { ServerlessSpaConstruct } from 'serverless-spa-construct'

ServerlessSpaConstruct.withCustomDomainAndWaf(scope: Construct, id: string, props: WithCustomDomainAndWafProps)
```

Creates a ServerlessSpaConstruct with custom domain AND WAF protection.

Requires: ServerlessSpaSecurityConstruct deployed in us-east-1 first.
Best for: Production deployments with custom domain and WAF.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomainAndWaf.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomainAndWaf.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaConstruct.withCustomDomainAndWaf.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WithCustomDomainAndWafProps">WithCustomDomainAndWafProps</a>

---

##### `withWaf` <a name="withWaf" id="serverless-spa-construct.ServerlessSpaConstruct.withWaf"></a>

```typescript
import { ServerlessSpaConstruct } from 'serverless-spa-construct'

ServerlessSpaConstruct.withWaf(scope: Construct, id: string, props: WithWafProps)
```

Creates a ServerlessSpaConstruct with WAF protection.

Requires: ServerlessSpaSecurityConstruct deployed in us-east-1 first.
Best for: Production deployments requiring WAF protection.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaConstruct.withWaf.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaConstruct.withWaf.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaConstruct.withWaf.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WithWafProps">WithWafProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.api">api</a></code> | <code><a href="#serverless-spa-construct.ApiConstruct">ApiConstruct</a></code> | The ApiConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.apiUrl">apiUrl</a></code> | <code>string</code> | The URL of the REST API endpoint. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.auth">auth</a></code> | <code><a href="#serverless-spa-construct.AuthConstruct">AuthConstruct</a></code> | The AuthConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.database">database</a></code> | <code><a href="#serverless-spa-construct.DatabaseConstruct">DatabaseConstruct</a></code> | The DatabaseConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.distributionDomainName">distributionDomainName</a></code> | <code>string</code> | The domain name of the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.frontend">frontend</a></code> | <code><a href="#serverless-spa-construct.FrontendConstruct">FrontendConstruct</a></code> | The FrontendConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.tableName">tableName</a></code> | <code>string</code> | The name of the DynamoDB table. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.userPoolClientId">userPoolClientId</a></code> | <code>string</code> | The ID of the Cognito User Pool Client. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.userPoolId">userPoolId</a></code> | <code>string</code> | The ID of the Cognito User Pool. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | The ICertificate resolved from SSM Parameter Store certificate ARN. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.certificateArn">certificateArn</a></code> | <code>string</code> | The certificate ARN retrieved from SSM Parameter Store. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.edgeFunctionVersionArn">edgeFunctionVersionArn</a></code> | <code>string</code> | The Lambda@Edge function version ARN retrieved from SSM Parameter Store. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.secretArn">secretArn</a></code> | <code>string</code> | The secret ARN retrieved from SSM Parameter Store. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.securityCustomHeaderName">securityCustomHeaderName</a></code> | <code>string</code> | The custom header name retrieved from SSM Parameter Store. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.ssmParameterReader">ssmParameterReader</a></code> | <code>aws-cdk-lib.custom_resources.AwsCustomResource</code> | The AwsCustomResource for retrieving SSM parameters from us-east-1. |
| <code><a href="#serverless-spa-construct.ServerlessSpaConstruct.property.webAclArn">webAclArn</a></code> | <code>string</code> | The WAF WebACL ARN retrieved from SSM Parameter Store. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.ServerlessSpaConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `api`<sup>Required</sup> <a name="api" id="serverless-spa-construct.ServerlessSpaConstruct.property.api"></a>

```typescript
public readonly api: ApiConstruct;
```

- *Type:* <a href="#serverless-spa-construct.ApiConstruct">ApiConstruct</a>

The ApiConstruct instance.

---

##### `apiUrl`<sup>Required</sup> <a name="apiUrl" id="serverless-spa-construct.ServerlessSpaConstruct.property.apiUrl"></a>

```typescript
public readonly apiUrl: string;
```

- *Type:* string

The URL of the REST API endpoint.

Convenience property for api.apiUrl.

---

##### `auth`<sup>Required</sup> <a name="auth" id="serverless-spa-construct.ServerlessSpaConstruct.property.auth"></a>

```typescript
public readonly auth: AuthConstruct;
```

- *Type:* <a href="#serverless-spa-construct.AuthConstruct">AuthConstruct</a>

The AuthConstruct instance.

---

##### `database`<sup>Required</sup> <a name="database" id="serverless-spa-construct.ServerlessSpaConstruct.property.database"></a>

```typescript
public readonly database: DatabaseConstruct;
```

- *Type:* <a href="#serverless-spa-construct.DatabaseConstruct">DatabaseConstruct</a>

The DatabaseConstruct instance.

---

##### `distributionDomainName`<sup>Required</sup> <a name="distributionDomainName" id="serverless-spa-construct.ServerlessSpaConstruct.property.distributionDomainName"></a>

```typescript
public readonly distributionDomainName: string;
```

- *Type:* string

The domain name of the CloudFront distribution.

Convenience property for frontend.distributionDomainName.

---

##### `frontend`<sup>Required</sup> <a name="frontend" id="serverless-spa-construct.ServerlessSpaConstruct.property.frontend"></a>

```typescript
public readonly frontend: FrontendConstruct;
```

- *Type:* <a href="#serverless-spa-construct.FrontendConstruct">FrontendConstruct</a>

The FrontendConstruct instance.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="serverless-spa-construct.ServerlessSpaConstruct.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The name of the DynamoDB table.

Convenience property for database.tableName.

---

##### `userPoolClientId`<sup>Required</sup> <a name="userPoolClientId" id="serverless-spa-construct.ServerlessSpaConstruct.property.userPoolClientId"></a>

```typescript
public readonly userPoolClientId: string;
```

- *Type:* string

The ID of the Cognito User Pool Client.

Convenience property for auth.userPoolClientId.

---

##### `userPoolId`<sup>Required</sup> <a name="userPoolId" id="serverless-spa-construct.ServerlessSpaConstruct.property.userPoolId"></a>

```typescript
public readonly userPoolId: string;
```

- *Type:* string

The ID of the Cognito User Pool.

Convenience property for auth.userPoolId.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="serverless-spa-construct.ServerlessSpaConstruct.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

The ICertificate resolved from SSM Parameter Store certificate ARN.

Only available when security config with certificate is provided.

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="serverless-spa-construct.ServerlessSpaConstruct.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

The certificate ARN retrieved from SSM Parameter Store.

Only available when security config with certificate is provided.

---

##### `edgeFunctionVersionArn`<sup>Optional</sup> <a name="edgeFunctionVersionArn" id="serverless-spa-construct.ServerlessSpaConstruct.property.edgeFunctionVersionArn"></a>

```typescript
public readonly edgeFunctionVersionArn: string;
```

- *Type:* string

The Lambda@Edge function version ARN retrieved from SSM Parameter Store.

Only available when security config is provided.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="serverless-spa-construct.ServerlessSpaConstruct.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

The secret ARN retrieved from SSM Parameter Store.

Only available when security config is provided.

---

##### `securityCustomHeaderName`<sup>Optional</sup> <a name="securityCustomHeaderName" id="serverless-spa-construct.ServerlessSpaConstruct.property.securityCustomHeaderName"></a>

```typescript
public readonly securityCustomHeaderName: string;
```

- *Type:* string

The custom header name retrieved from SSM Parameter Store.

Only available when security config is provided.

---

##### `ssmParameterReader`<sup>Optional</sup> <a name="ssmParameterReader" id="serverless-spa-construct.ServerlessSpaConstruct.property.ssmParameterReader"></a>

```typescript
public readonly ssmParameterReader: AwsCustomResource;
```

- *Type:* aws-cdk-lib.custom_resources.AwsCustomResource

The AwsCustomResource for retrieving SSM parameters from us-east-1.

Only available when security config is provided.

---

##### `webAclArn`<sup>Optional</sup> <a name="webAclArn" id="serverless-spa-construct.ServerlessSpaConstruct.property.webAclArn"></a>

```typescript
public readonly webAclArn: string;
```

- *Type:* string

The WAF WebACL ARN retrieved from SSM Parameter Store.

Only available when security config is provided.

---


### ServerlessSpaSecurityConstruct <a name="ServerlessSpaSecurityConstruct" id="serverless-spa-construct.ServerlessSpaSecurityConstruct"></a>

A high-level CDK construct that creates security resources for CloudFront. This construct must be deployed in us-east-1 region.

## Recommended: Use Factory Methods

Factory methods provide clear, use-case specific APIs:

*Example*

```typescript
// Minimal setup - Custom header only (no WAF)
ServerlessSpaSecurityConstruct.minimal(this, 'Security', {
  ssmPrefix: '/myapp/security/',
});

// With WAF protection
ServerlessSpaSecurityConstruct.withWaf(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  rateLimit: 3000,
});

## Architecture

This construct integrates:
- WafConstruct: WAF WebACL with CLOUDFRONT scope (optional)
- SecretConstruct: Secrets Manager with rotation for custom header
- LambdaEdgeConstruct: Lambda@Edge for adding custom header to origin requests
- SsmConstruct: SSM Parameters for cross-region sharing

Dependencies between constructs are automatically wired:
- SsmConstruct receives webAclArn, customHeaderName, secretArn, edgeFunctionVersionArn from other constructs
- SecretConstruct receives ssmPrefix for rotation Lambda
- LambdaEdgeConstruct receives secretArn from SecretConstruct
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer"></a>

```typescript
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct'

new ServerlessSpaSecurityConstruct(scope: Construct, id: string, props?: ServerlessSpaSecurityConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps">ServerlessSpaSecurityConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps">ServerlessSpaSecurityConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.minimal">minimal</a></code> | Creates a minimal ServerlessSpaSecurityConstruct with custom header only (no WAF). |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.withCertificate">withCertificate</a></code> | Creates a ServerlessSpaSecurityConstruct with custom header + ACM certificate (no WAF). |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.withWaf">withWaf</a></code> | Creates a ServerlessSpaSecurityConstruct with WAF protection. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.withWafAndCertificate">withWafAndCertificate</a></code> | Creates a ServerlessSpaSecurityConstruct with WAF + custom header + ACM certificate. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.isConstruct"></a>

```typescript
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct'

ServerlessSpaSecurityConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `minimal` <a name="minimal" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.minimal"></a>

```typescript
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct'

ServerlessSpaSecurityConstruct.minimal(scope: Construct, id: string, props: MinimalSecurityProps)
```

Creates a minimal ServerlessSpaSecurityConstruct with custom header only (no WAF).

Best for: Development, testing, or when WAF is not needed.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.minimal.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.minimal.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.minimal.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.MinimalSecurityProps">MinimalSecurityProps</a>

---

##### `withCertificate` <a name="withCertificate" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withCertificate"></a>

```typescript
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct'

ServerlessSpaSecurityConstruct.withCertificate(scope: Construct, id: string, props: WithCertificateSecurityProps)
```

Creates a ServerlessSpaSecurityConstruct with custom header + ACM certificate (no WAF).

Best for: Custom domain deployments without WAF protection.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withCertificate.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withCertificate.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withCertificate.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WithCertificateSecurityProps">WithCertificateSecurityProps</a>

---

##### `withWaf` <a name="withWaf" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWaf"></a>

```typescript
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct'

ServerlessSpaSecurityConstruct.withWaf(scope: Construct, id: string, props: WithWafSecurityProps)
```

Creates a ServerlessSpaSecurityConstruct with WAF protection.

Best for: Production deployments requiring WAF protection.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWaf.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWaf.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWaf.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WithWafSecurityProps">WithWafSecurityProps</a>

---

##### `withWafAndCertificate` <a name="withWafAndCertificate" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWafAndCertificate"></a>

```typescript
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct'

ServerlessSpaSecurityConstruct.withWafAndCertificate(scope: Construct, id: string, props: WithWafAndCertificateSecurityProps)
```

Creates a ServerlessSpaSecurityConstruct with WAF + custom header + ACM certificate.

Best for: Production custom domain deployments with full security.

###### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWafAndCertificate.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWafAndCertificate.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.withWafAndCertificate.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps">WithWafAndCertificateSecurityProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.ssm">ssm</a></code> | <code><a href="#serverless-spa-construct.SsmConstruct">SsmConstruct</a></code> | The SsmConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | The SSM prefix used for parameters. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.certificateArn">certificateArn</a></code> | <code>string</code> | The ACM certificate ARN. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.certificateConstruct">certificateConstruct</a></code> | <code><a href="#serverless-spa-construct.CertificateConstruct">CertificateConstruct</a></code> | The CertificateConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | The custom header name. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.edgeFunctionVersionArn">edgeFunctionVersionArn</a></code> | <code>string</code> | The Lambda@Edge function version ARN. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.lambdaEdge">lambdaEdge</a></code> | <code><a href="#serverless-spa-construct.LambdaEdgeConstruct">LambdaEdgeConstruct</a></code> | The LambdaEdgeConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.secret">secret</a></code> | <code><a href="#serverless-spa-construct.SecretConstruct">SecretConstruct</a></code> | The SecretConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.secretArn">secretArn</a></code> | <code>string</code> | The Secrets Manager secret ARN. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.waf">waf</a></code> | <code><a href="#serverless-spa-construct.WafConstruct">WafConstruct</a></code> | The WafConstruct instance. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstruct.property.webAclArn">webAclArn</a></code> | <code>string</code> | The WAF WebACL ARN for CloudFront. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ssm`<sup>Required</sup> <a name="ssm" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.ssm"></a>

```typescript
public readonly ssm: SsmConstruct;
```

- *Type:* <a href="#serverless-spa-construct.SsmConstruct">SsmConstruct</a>

The SsmConstruct instance.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

The SSM prefix used for parameters.

Convenience property for ssm.ssmPrefix.

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

The ACM certificate ARN.

Only available when enableCertificate is true.

---

##### `certificateConstruct`<sup>Optional</sup> <a name="certificateConstruct" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.certificateConstruct"></a>

```typescript
public readonly certificateConstruct: CertificateConstruct;
```

- *Type:* <a href="#serverless-spa-construct.CertificateConstruct">CertificateConstruct</a>

The CertificateConstruct instance.

Only available when enableCertificate is true.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string

The custom header name.

Only available when enableCustomHeader is true.

---

##### `edgeFunctionVersionArn`<sup>Optional</sup> <a name="edgeFunctionVersionArn" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.edgeFunctionVersionArn"></a>

```typescript
public readonly edgeFunctionVersionArn: string;
```

- *Type:* string

The Lambda@Edge function version ARN.

Only available when enableCustomHeader is true.

---

##### `lambdaEdge`<sup>Optional</sup> <a name="lambdaEdge" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.lambdaEdge"></a>

```typescript
public readonly lambdaEdge: LambdaEdgeConstruct;
```

- *Type:* <a href="#serverless-spa-construct.LambdaEdgeConstruct">LambdaEdgeConstruct</a>

The LambdaEdgeConstruct instance.

Only available when enableCustomHeader is true.

---

##### `secret`<sup>Optional</sup> <a name="secret" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.secret"></a>

```typescript
public readonly secret: SecretConstruct;
```

- *Type:* <a href="#serverless-spa-construct.SecretConstruct">SecretConstruct</a>

The SecretConstruct instance.

Only available when enableCustomHeader is true.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

The Secrets Manager secret ARN.

Only available when enableCustomHeader is true.

---

##### `waf`<sup>Optional</sup> <a name="waf" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.waf"></a>

```typescript
public readonly waf: WafConstruct;
```

- *Type:* <a href="#serverless-spa-construct.WafConstruct">WafConstruct</a>

The WafConstruct instance.

Only available when enableWaf is true.

---

##### `webAclArn`<sup>Optional</sup> <a name="webAclArn" id="serverless-spa-construct.ServerlessSpaSecurityConstruct.property.webAclArn"></a>

```typescript
public readonly webAclArn: string;
```

- *Type:* string

The WAF WebACL ARN for CloudFront.

Only available when enableWaf is true.

---


### SsmConstruct <a name="SsmConstruct" id="serverless-spa-construct.SsmConstruct"></a>

A low-level CDK construct that creates SSM Parameters for cross-region sharing.

This construct creates SSM Parameters:
- {ssmPrefix}waf-acl-arn: WAF WebACL ARN for CloudFront
- {ssmPrefix}custom-header-name: Custom header name for API Gateway validation
- {ssmPrefix}secret-arn: Secrets Manager secret ARN
- {ssmPrefix}edge-function-version-arn: Lambda@Edge function version ARN (optional)

These parameters enable cross-region sharing of security configuration
between the us-east-1 security stack and the main application stack.

*Example*

```typescript
const ssm = new SsmConstruct(this, 'Ssm', {
  ssmPrefix: '/myapp/security/',
  webAclArn: 'arn:aws:wafv2:us-east-1:123456789012:global/webacl/...',
  customHeaderName: 'x-origin-verify',
  secretArn: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:...',
  edgeFunctionVersionArn: 'arn:aws:lambda:us-east-1:123456789012:function:...:1',
});

// Access the parameters
console.log(ssm.wafAclArnParameter.parameterName);
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.SsmConstruct.Initializer"></a>

```typescript
import { SsmConstruct } from 'serverless-spa-construct'

new SsmConstruct(scope: Construct, id: string, props: SsmConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SsmConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.SsmConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.SsmConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.SsmConstructProps">SsmConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.SsmConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.SsmConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="serverless-spa-construct.SsmConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.SsmConstructProps">SsmConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.SsmConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.SsmConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.SsmConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.SsmConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.SsmConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.SsmConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.SsmConstruct.isConstruct"></a>

```typescript
import { SsmConstruct } from 'serverless-spa-construct'

SsmConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.SsmConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | The SSM prefix used for parameters. |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.certificateArnParameter">certificateArnParameter</a></code> | <code>aws-cdk-lib.aws_ssm.IStringParameter</code> | The SSM Parameter for ACM certificate ARN. |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.customHeaderNameParameter">customHeaderNameParameter</a></code> | <code>aws-cdk-lib.aws_ssm.IStringParameter</code> | The SSM Parameter for custom header name. |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.edgeFunctionVersionArnParameter">edgeFunctionVersionArnParameter</a></code> | <code>aws-cdk-lib.aws_ssm.IStringParameter</code> | The SSM Parameter for Lambda@Edge function version ARN. |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.secretArnParameter">secretArnParameter</a></code> | <code>aws-cdk-lib.aws_ssm.IStringParameter</code> | The SSM Parameter for secret ARN. |
| <code><a href="#serverless-spa-construct.SsmConstruct.property.wafAclArnParameter">wafAclArnParameter</a></code> | <code>aws-cdk-lib.aws_ssm.IStringParameter</code> | The SSM Parameter for WAF ACL ARN. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.SsmConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.SsmConstruct.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

The SSM prefix used for parameters.

---

##### `certificateArnParameter`<sup>Optional</sup> <a name="certificateArnParameter" id="serverless-spa-construct.SsmConstruct.property.certificateArnParameter"></a>

```typescript
public readonly certificateArnParameter: IStringParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IStringParameter

The SSM Parameter for ACM certificate ARN.

Only created when certificateArn is provided.

---

##### `customHeaderNameParameter`<sup>Optional</sup> <a name="customHeaderNameParameter" id="serverless-spa-construct.SsmConstruct.property.customHeaderNameParameter"></a>

```typescript
public readonly customHeaderNameParameter: IStringParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IStringParameter

The SSM Parameter for custom header name.

Only created when customHeaderName is provided.

---

##### `edgeFunctionVersionArnParameter`<sup>Optional</sup> <a name="edgeFunctionVersionArnParameter" id="serverless-spa-construct.SsmConstruct.property.edgeFunctionVersionArnParameter"></a>

```typescript
public readonly edgeFunctionVersionArnParameter: IStringParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IStringParameter

The SSM Parameter for Lambda@Edge function version ARN.

Only created when edgeFunctionVersionArn is provided.

---

##### `secretArnParameter`<sup>Optional</sup> <a name="secretArnParameter" id="serverless-spa-construct.SsmConstruct.property.secretArnParameter"></a>

```typescript
public readonly secretArnParameter: IStringParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IStringParameter

The SSM Parameter for secret ARN.

Only created when secretArn is provided.

---

##### `wafAclArnParameter`<sup>Optional</sup> <a name="wafAclArnParameter" id="serverless-spa-construct.SsmConstruct.property.wafAclArnParameter"></a>

```typescript
public readonly wafAclArnParameter: IStringParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IStringParameter

The SSM Parameter for WAF ACL ARN.

Only created when webAclArn is provided.

---


### WafConstruct <a name="WafConstruct" id="serverless-spa-construct.WafConstruct"></a>

A low-level CDK construct that creates a WAF WebACL for CloudFront.

This construct creates a WAF WebACL with CLOUDFRONT scope that includes:
- Rate limiting rule (default: 2000 requests per 5 minutes)
- AWS Managed Rules Common Rule Set (optional, enabled by default)
- AWS Managed Rules SQLi Rule Set (optional, enabled by default)
- Support for custom rules
- Full rule override capability for advanced use cases

Note: This construct must be deployed in us-east-1 region because
WAF WebACLs with CLOUDFRONT scope can only be created in us-east-1.

*Example*

```typescript
// Full control with custom rules array
const waf = new WafConstruct(this, 'Waf', {
  rules: [
    // Your complete custom rules configuration
  ],
});
```


#### Initializers <a name="Initializers" id="serverless-spa-construct.WafConstruct.Initializer"></a>

```typescript
import { WafConstruct } from 'serverless-spa-construct'

new WafConstruct(scope: Construct, id: string, props?: WafConstructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WafConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#serverless-spa-construct.WafConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#serverless-spa-construct.WafConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#serverless-spa-construct.WafConstructProps">WafConstructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="serverless-spa-construct.WafConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="serverless-spa-construct.WafConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="serverless-spa-construct.WafConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#serverless-spa-construct.WafConstructProps">WafConstructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.WafConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#serverless-spa-construct.WafConstruct.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="serverless-spa-construct.WafConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="serverless-spa-construct.WafConstruct.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="serverless-spa-construct.WafConstruct.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#serverless-spa-construct.WafConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="serverless-spa-construct.WafConstruct.isConstruct"></a>

```typescript
import { WafConstruct } from 'serverless-spa-construct'

WafConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="serverless-spa-construct.WafConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WafConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#serverless-spa-construct.WafConstruct.property.webAcl">webAcl</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL</code> | The WAF WebACL. |
| <code><a href="#serverless-spa-construct.WafConstruct.property.webAclArn">webAclArn</a></code> | <code>string</code> | The WAF WebACL ARN. |

---

##### `node`<sup>Required</sup> <a name="node" id="serverless-spa-construct.WafConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `webAcl`<sup>Required</sup> <a name="webAcl" id="serverless-spa-construct.WafConstruct.property.webAcl"></a>

```typescript
public readonly webAcl: CfnWebACL;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL

The WAF WebACL.

---

##### `webAclArn`<sup>Required</sup> <a name="webAclArn" id="serverless-spa-construct.WafConstruct.property.webAclArn"></a>

```typescript
public readonly webAclArn: string;
```

- *Type:* string

The WAF WebACL ARN.

---


## Structs <a name="Structs" id="Structs"></a>

### AdvancedOptions <a name="AdvancedOptions" id="serverless-spa-construct.AdvancedOptions"></a>

Advanced customization options for fine-grained control.

Use these only when you need to override default behaviors.

#### Initializer <a name="Initializer" id="serverless-spa-construct.AdvancedOptions.Initializer"></a>

```typescript
import { AdvancedOptions } from 'serverless-spa-construct'

const advancedOptions: AdvancedOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.api">api</a></code> | <code><a href="#serverless-spa-construct.ApiAdvancedOptions">ApiAdvancedOptions</a></code> | Override ApiConstruct settings (table/userPool are auto-wired). |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.auth">auth</a></code> | <code><a href="#serverless-spa-construct.AuthConstructProps">AuthConstructProps</a></code> | Override AuthConstruct settings. |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.database">database</a></code> | <code><a href="#serverless-spa-construct.DatabaseConstructProps">DatabaseConstructProps</a></code> | Override DatabaseConstruct settings. |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.frontend">frontend</a></code> | <code><a href="#serverless-spa-construct.FrontendAdvancedOptions">FrontendAdvancedOptions</a></code> | Override FrontendConstruct settings (api/headers are auto-wired). |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for all resources. |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.security">security</a></code> | <code><a href="#serverless-spa-construct.SecurityConfig">SecurityConfig</a></code> | Security/WAF configuration. |
| <code><a href="#serverless-spa-construct.AdvancedOptions.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Tags to apply to all resources. |

---

##### `api`<sup>Optional</sup> <a name="api" id="serverless-spa-construct.AdvancedOptions.property.api"></a>

```typescript
public readonly api: ApiAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.ApiAdvancedOptions">ApiAdvancedOptions</a>

Override ApiConstruct settings (table/userPool are auto-wired).

---

##### `auth`<sup>Optional</sup> <a name="auth" id="serverless-spa-construct.AdvancedOptions.property.auth"></a>

```typescript
public readonly auth: AuthConstructProps;
```

- *Type:* <a href="#serverless-spa-construct.AuthConstructProps">AuthConstructProps</a>

Override AuthConstruct settings.

---

##### `database`<sup>Optional</sup> <a name="database" id="serverless-spa-construct.AdvancedOptions.property.database"></a>

```typescript
public readonly database: DatabaseConstructProps;
```

- *Type:* <a href="#serverless-spa-construct.DatabaseConstructProps">DatabaseConstructProps</a>

Override DatabaseConstruct settings.

---

##### `frontend`<sup>Optional</sup> <a name="frontend" id="serverless-spa-construct.AdvancedOptions.property.frontend"></a>

```typescript
public readonly frontend: FrontendAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.FrontendAdvancedOptions">FrontendAdvancedOptions</a>

Override FrontendConstruct settings (api/headers are auto-wired).

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.AdvancedOptions.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* Inherits from app-level RemovalPolicy setting

Removal policy for all resources.

---

##### `security`<sup>Optional</sup> <a name="security" id="serverless-spa-construct.AdvancedOptions.property.security"></a>

```typescript
public readonly security: SecurityConfig;
```

- *Type:* <a href="#serverless-spa-construct.SecurityConfig">SecurityConfig</a>

Security/WAF configuration.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="serverless-spa-construct.AdvancedOptions.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Tags to apply to all resources.

---

### ApiAdvancedOptions <a name="ApiAdvancedOptions" id="serverless-spa-construct.ApiAdvancedOptions"></a>

API advanced options (table/userPool/entry are auto-wired).

#### Initializer <a name="Initializer" id="serverless-spa-construct.ApiAdvancedOptions.Initializer"></a>

```typescript
import { ApiAdvancedOptions } from 'serverless-spa-construct'

const apiAdvancedOptions: ApiAdvancedOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ApiAdvancedOptions.property.authorizerCacheTtlSeconds">authorizerCacheTtlSeconds</a></code> | <code>number</code> | Cache TTL for Lambda Authorizer secret value in seconds. |
| <code><a href="#serverless-spa-construct.ApiAdvancedOptions.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name for CloudFront-only access restriction. |
| <code><a href="#serverless-spa-construct.ApiAdvancedOptions.property.enableLambdaAuthorizer">enableLambdaAuthorizer</a></code> | <code>boolean</code> | Enable Lambda Authorizer for custom header validation. |
| <code><a href="#serverless-spa-construct.ApiAdvancedOptions.property.secretArn">secretArn</a></code> | <code>string</code> | Optional Secrets Manager secret ARN for custom header validation. |
| <code><a href="#serverless-spa-construct.ApiAdvancedOptions.property.userPoolClientId">userPoolClientId</a></code> | <code>string</code> | Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer. |

---

##### `authorizerCacheTtlSeconds`<sup>Optional</sup> <a name="authorizerCacheTtlSeconds" id="serverless-spa-construct.ApiAdvancedOptions.property.authorizerCacheTtlSeconds"></a>

```typescript
public readonly authorizerCacheTtlSeconds: number;
```

- *Type:* number
- *Default:* 300

Cache TTL for Lambda Authorizer secret value in seconds.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.ApiAdvancedOptions.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name for CloudFront-only access restriction.

---

##### `enableLambdaAuthorizer`<sup>Optional</sup> <a name="enableLambdaAuthorizer" id="serverless-spa-construct.ApiAdvancedOptions.property.enableLambdaAuthorizer"></a>

```typescript
public readonly enableLambdaAuthorizer: boolean;
```

- *Type:* boolean
- *Default:* true when secretArn is provided

Enable Lambda Authorizer for custom header validation.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="serverless-spa-construct.ApiAdvancedOptions.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

Optional Secrets Manager secret ARN for custom header validation.

---

##### `userPoolClientId`<sup>Optional</sup> <a name="userPoolClientId" id="serverless-spa-construct.ApiAdvancedOptions.property.userPoolClientId"></a>

```typescript
public readonly userPoolClientId: string;
```

- *Type:* string

Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer.

---

### ApiConstructProps <a name="ApiConstructProps" id="serverless-spa-construct.ApiConstructProps"></a>

Properties for ApiConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.ApiConstructProps.Initializer"></a>

```typescript
import { ApiConstructProps } from 'serverless-spa-construct'

const apiConstructProps: ApiConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.entry">entry</a></code> | <code>string</code> | Path to the Lambda handler entry file. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.table">table</a></code> | <code>aws-cdk-lib.aws_dynamodb.Table</code> | The DynamoDB table for Lambda to access. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.authorizerCacheTtlSeconds">authorizerCacheTtlSeconds</a></code> | <code>number</code> | Cache TTL for Lambda Authorizer secret value in seconds. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name for CloudFront-only access restriction. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.enableLambdaAuthorizer">enableLambdaAuthorizer</a></code> | <code>boolean</code> | Enable Lambda Authorizer for custom header validation. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.secretArn">secretArn</a></code> | <code>string</code> | Optional Secrets Manager secret ARN for custom header validation. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.IUserPool</code> | Optional Cognito User Pool for JWT authentication. |
| <code><a href="#serverless-spa-construct.ApiConstructProps.property.userPoolClientId">userPoolClientId</a></code> | <code>string</code> | Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer. |

---

##### `entry`<sup>Required</sup> <a name="entry" id="serverless-spa-construct.ApiConstructProps.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string
- *Default:* Uses built-in handler at lambda/handler.ts

Path to the Lambda handler entry file.

If not provided, uses the default handler at lambda/handler.ts.

---

*Example*

```typescript
'./src/api/handler.ts'
```


##### `table`<sup>Required</sup> <a name="table" id="serverless-spa-construct.ApiConstructProps.property.table"></a>

```typescript
public readonly table: Table;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Table

The DynamoDB table for Lambda to access.

Required - Lambda will have read/write permissions to this table.

---

##### `authorizerCacheTtlSeconds`<sup>Optional</sup> <a name="authorizerCacheTtlSeconds" id="serverless-spa-construct.ApiConstructProps.property.authorizerCacheTtlSeconds"></a>

```typescript
public readonly authorizerCacheTtlSeconds: number;
```

- *Type:* number
- *Default:* 300 (5 minutes)

Cache TTL for Lambda Authorizer secret value in seconds.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.ApiConstructProps.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name for CloudFront-only access restriction.

---

##### `enableLambdaAuthorizer`<sup>Optional</sup> <a name="enableLambdaAuthorizer" id="serverless-spa-construct.ApiConstructProps.property.enableLambdaAuthorizer"></a>

```typescript
public readonly enableLambdaAuthorizer: boolean;
```

- *Type:* boolean
- *Default:* true when secretArn is provided

Enable Lambda Authorizer for custom header validation.

Requires secretArn to be provided.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="serverless-spa-construct.ApiConstructProps.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

Optional Secrets Manager secret ARN for custom header validation.

If provided and enableLambdaAuthorizer is true, a Lambda Authorizer will be created.
The ARN will be converted to the local region for accessing the replica.

---

##### `userPool`<sup>Optional</sup> <a name="userPool" id="serverless-spa-construct.ApiConstructProps.property.userPool"></a>

```typescript
public readonly userPool: IUserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.IUserPool

Optional Cognito User Pool for JWT authentication.

If provided, a Cognito Authorizer will be created and applied to all endpoints.

---

##### `userPoolClientId`<sup>Optional</sup> <a name="userPoolClientId" id="serverless-spa-construct.ApiConstructProps.property.userPoolClientId"></a>

```typescript
public readonly userPoolClientId: string;
```

- *Type:* string

Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer.

Required when both userPool and secretArn are provided.

---

### ApiInternalOptions <a name="ApiInternalOptions" id="serverless-spa-construct.ApiInternalOptions"></a>

Internal API configuration including entry path.

#### Initializer <a name="Initializer" id="serverless-spa-construct.ApiInternalOptions.Initializer"></a>

```typescript
import { ApiInternalOptions } from 'serverless-spa-construct'

const apiInternalOptions: ApiInternalOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ApiInternalOptions.property.authorizerCacheTtlSeconds">authorizerCacheTtlSeconds</a></code> | <code>number</code> | Cache TTL for Lambda Authorizer secret value in seconds. |
| <code><a href="#serverless-spa-construct.ApiInternalOptions.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name for CloudFront-only access restriction. |
| <code><a href="#serverless-spa-construct.ApiInternalOptions.property.enableLambdaAuthorizer">enableLambdaAuthorizer</a></code> | <code>boolean</code> | Enable Lambda Authorizer for custom header validation. |
| <code><a href="#serverless-spa-construct.ApiInternalOptions.property.secretArn">secretArn</a></code> | <code>string</code> | Optional Secrets Manager secret ARN for custom header validation. |
| <code><a href="#serverless-spa-construct.ApiInternalOptions.property.userPoolClientId">userPoolClientId</a></code> | <code>string</code> | Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer. |
| <code><a href="#serverless-spa-construct.ApiInternalOptions.property.entry">entry</a></code> | <code>string</code> | Path to the Lambda handler entry file. |

---

##### `authorizerCacheTtlSeconds`<sup>Optional</sup> <a name="authorizerCacheTtlSeconds" id="serverless-spa-construct.ApiInternalOptions.property.authorizerCacheTtlSeconds"></a>

```typescript
public readonly authorizerCacheTtlSeconds: number;
```

- *Type:* number
- *Default:* 300

Cache TTL for Lambda Authorizer secret value in seconds.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.ApiInternalOptions.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name for CloudFront-only access restriction.

---

##### `enableLambdaAuthorizer`<sup>Optional</sup> <a name="enableLambdaAuthorizer" id="serverless-spa-construct.ApiInternalOptions.property.enableLambdaAuthorizer"></a>

```typescript
public readonly enableLambdaAuthorizer: boolean;
```

- *Type:* boolean
- *Default:* true when secretArn is provided

Enable Lambda Authorizer for custom header validation.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="serverless-spa-construct.ApiInternalOptions.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

Optional Secrets Manager secret ARN for custom header validation.

---

##### `userPoolClientId`<sup>Optional</sup> <a name="userPoolClientId" id="serverless-spa-construct.ApiInternalOptions.property.userPoolClientId"></a>

```typescript
public readonly userPoolClientId: string;
```

- *Type:* string

Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer.

---

##### `entry`<sup>Optional</sup> <a name="entry" id="serverless-spa-construct.ApiInternalOptions.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string

Path to the Lambda handler entry file.

---

### AuthConstructProps <a name="AuthConstructProps" id="serverless-spa-construct.AuthConstructProps"></a>

Properties for AuthConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.AuthConstructProps.Initializer"></a>

```typescript
import { AuthConstructProps } from 'serverless-spa-construct'

const authConstructProps: AuthConstructProps = { ... }
```


### CertificateConstructProps <a name="CertificateConstructProps" id="serverless-spa-construct.CertificateConstructProps"></a>

Properties for CertificateConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.CertificateConstructProps.Initializer"></a>

```typescript
import { CertificateConstructProps } from 'serverless-spa-construct'

const certificateConstructProps: CertificateConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.CertificateConstructProps.property.domainName">domainName</a></code> | <code>string</code> | The primary domain name for the certificate. |
| <code><a href="#serverless-spa-construct.CertificateConstructProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for DNS validation. |
| <code><a href="#serverless-spa-construct.CertificateConstructProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name for DNS validation. |
| <code><a href="#serverless-spa-construct.CertificateConstructProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (Subject Alternative Names) for the certificate. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="serverless-spa-construct.CertificateConstructProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The primary domain name for the certificate.

---

*Example*

```typescript
'www.example.com'
```


##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="serverless-spa-construct.CertificateConstructProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for DNS validation.

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="serverless-spa-construct.CertificateConstructProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name for DNS validation.

---

*Example*

```typescript
'example.com'
```


##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.CertificateConstructProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]
- *Default:* No alternative domain names

Additional domain names (Subject Alternative Names) for the certificate.

---

*Example*

```typescript
['example.com', 'app.example.com']
```


### CertificateDomainProps <a name="CertificateDomainProps" id="serverless-spa-construct.CertificateDomainProps"></a>

Domain-related properties for certificate creation.

#### Initializer <a name="Initializer" id="serverless-spa-construct.CertificateDomainProps.Initializer"></a>

```typescript
import { CertificateDomainProps } from 'serverless-spa-construct'

const certificateDomainProps: CertificateDomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.CertificateDomainProps.property.domainName">domainName</a></code> | <code>string</code> | The primary domain name for the certificate. |
| <code><a href="#serverless-spa-construct.CertificateDomainProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for DNS validation. |
| <code><a href="#serverless-spa-construct.CertificateDomainProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name for DNS validation. |
| <code><a href="#serverless-spa-construct.CertificateDomainProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (Subject Alternative Names) for the certificate. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="serverless-spa-construct.CertificateDomainProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The primary domain name for the certificate.

---

##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="serverless-spa-construct.CertificateDomainProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for DNS validation.

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="serverless-spa-construct.CertificateDomainProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name for DNS validation.

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.CertificateDomainProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain names (Subject Alternative Names) for the certificate.

---

### DatabaseConstructProps <a name="DatabaseConstructProps" id="serverless-spa-construct.DatabaseConstructProps"></a>

Properties for DatabaseConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.DatabaseConstructProps.Initializer"></a>

```typescript
import { DatabaseConstructProps } from 'serverless-spa-construct'

const databaseConstructProps: DatabaseConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.billingMode">billingMode</a></code> | <code>aws-cdk-lib.aws_dynamodb.BillingMode</code> | DynamoDB billing mode. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.disableSortKey">disableSortKey</a></code> | <code>boolean</code> | Whether to disable the sort key. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.globalSecondaryIndexes">globalSecondaryIndexes</a></code> | <code>aws-cdk-lib.aws_dynamodb.GlobalSecondaryIndexProps[]</code> | Global secondary indexes to add to the table. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | Partition key attribute. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.pointInTimeRecoveryEnabled">pointInTimeRecoveryEnabled</a></code> | <code>boolean</code> | Enable point-in-time recovery. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for the table. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.sortKey">sortKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | Sort key attribute. |
| <code><a href="#serverless-spa-construct.DatabaseConstructProps.property.tableName">tableName</a></code> | <code>string</code> | Optional table name. |

---

##### `billingMode`<sup>Optional</sup> <a name="billingMode" id="serverless-spa-construct.DatabaseConstructProps.property.billingMode"></a>

```typescript
public readonly billingMode: BillingMode;
```

- *Type:* aws-cdk-lib.aws_dynamodb.BillingMode
- *Default:* BillingMode.PAY_PER_REQUEST

DynamoDB billing mode.

---

##### `disableSortKey`<sup>Optional</sup> <a name="disableSortKey" id="serverless-spa-construct.DatabaseConstructProps.property.disableSortKey"></a>

```typescript
public readonly disableSortKey: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable the sort key.

When true, the table is created without a sort key.

---

##### `globalSecondaryIndexes`<sup>Optional</sup> <a name="globalSecondaryIndexes" id="serverless-spa-construct.DatabaseConstructProps.property.globalSecondaryIndexes"></a>

```typescript
public readonly globalSecondaryIndexes: GlobalSecondaryIndexProps[];
```

- *Type:* aws-cdk-lib.aws_dynamodb.GlobalSecondaryIndexProps[]
- *Default:* No GSIs

Global secondary indexes to add to the table.

---

##### `partitionKey`<sup>Optional</sup> <a name="partitionKey" id="serverless-spa-construct.DatabaseConstructProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* { name: 'PK', type: AttributeType.STRING }

Partition key attribute.

---

##### `pointInTimeRecoveryEnabled`<sup>Optional</sup> <a name="pointInTimeRecoveryEnabled" id="serverless-spa-construct.DatabaseConstructProps.property.pointInTimeRecoveryEnabled"></a>

```typescript
public readonly pointInTimeRecoveryEnabled: boolean;
```

- *Type:* boolean
- *Default:* false

Enable point-in-time recovery.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.DatabaseConstructProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* Inherits from app-level RemovalPolicy setting

Removal policy for the table.

---

##### `sortKey`<sup>Optional</sup> <a name="sortKey" id="serverless-spa-construct.DatabaseConstructProps.property.sortKey"></a>

```typescript
public readonly sortKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* { name: 'SK', type: AttributeType.STRING }

Sort key attribute.

---

##### `tableName`<sup>Optional</sup> <a name="tableName" id="serverless-spa-construct.DatabaseConstructProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

Optional table name.

If not specified, CDK will generate a unique name.

---

### FrontendAdvancedOptions <a name="FrontendAdvancedOptions" id="serverless-spa-construct.FrontendAdvancedOptions"></a>

Frontend advanced options (api/customHeaderName/webAclArn are auto-wired).

#### Initializer <a name="Initializer" id="serverless-spa-construct.FrontendAdvancedOptions.Initializer"></a>

```typescript
import { FrontendAdvancedOptions } from 'serverless-spa-construct'

const frontendAdvancedOptions: FrontendAdvancedOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (aliases) for the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.autoDeleteObjects">autoDeleteObjects</a></code> | <code>boolean</code> | Whether to automatically delete objects when the bucket is removed. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | ACM certificate for the custom domain. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.domainName">domainName</a></code> | <code>string</code> | Custom domain name for the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.edgeFunctionVersion">edgeFunctionVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | Lambda@Edge function version for origin request. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for creating DNS records. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for the S3 bucket. |
| <code><a href="#serverless-spa-construct.FrontendAdvancedOptions.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name. |

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.FrontendAdvancedOptions.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain names (aliases) for the CloudFront distribution.

---

##### `autoDeleteObjects`<sup>Optional</sup> <a name="autoDeleteObjects" id="serverless-spa-construct.FrontendAdvancedOptions.property.autoDeleteObjects"></a>

```typescript
public readonly autoDeleteObjects: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to automatically delete objects when the bucket is removed.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="serverless-spa-construct.FrontendAdvancedOptions.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

ACM certificate for the custom domain.

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="serverless-spa-construct.FrontendAdvancedOptions.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

Custom domain name for the CloudFront distribution.

---

##### `edgeFunctionVersion`<sup>Optional</sup> <a name="edgeFunctionVersion" id="serverless-spa-construct.FrontendAdvancedOptions.property.edgeFunctionVersion"></a>

```typescript
public readonly edgeFunctionVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

Lambda@Edge function version for origin request.

---

##### `hostedZoneId`<sup>Optional</sup> <a name="hostedZoneId" id="serverless-spa-construct.FrontendAdvancedOptions.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for creating DNS records.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.FrontendAdvancedOptions.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

Removal policy for the S3 bucket.

---

##### `zoneName`<sup>Optional</sup> <a name="zoneName" id="serverless-spa-construct.FrontendAdvancedOptions.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name.

---

### FrontendConstructProps <a name="FrontendConstructProps" id="serverless-spa-construct.FrontendConstructProps"></a>

Properties for FrontendConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.FrontendConstructProps.Initializer"></a>

```typescript
import { FrontendConstructProps } from 'serverless-spa-construct'

const frontendConstructProps: FrontendConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (aliases) for the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.api">api</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | Optional API Gateway for /api/* routing. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.autoDeleteObjects">autoDeleteObjects</a></code> | <code>boolean</code> | Whether to automatically delete objects when the bucket is removed. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | ACM certificate for the custom domain. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name for API Gateway access restriction. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.domainName">domainName</a></code> | <code>string</code> | Custom domain name for the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.edgeFunctionVersion">edgeFunctionVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | Lambda@Edge function version for origin request. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for creating DNS records and certificate validation. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for the S3 bucket. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.webAclArn">webAclArn</a></code> | <code>string</code> | Optional WAF WebACL ARN to associate with the CloudFront distribution. |
| <code><a href="#serverless-spa-construct.FrontendConstructProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name (domain name). |

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.FrontendConstructProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain names (aliases) for the CloudFront distribution.

---

*Example*

```typescript
['example.com', 'app.example.com']
```


##### `api`<sup>Optional</sup> <a name="api" id="serverless-spa-construct.FrontendConstructProps.property.api"></a>

```typescript
public readonly api: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

Optional API Gateway for /api/* routing.

If provided, requests to /api/* will be routed to this API Gateway.
Note: Requires RestApi (not IRestApi) to access the .url property for CloudFront origin.

---

##### `autoDeleteObjects`<sup>Optional</sup> <a name="autoDeleteObjects" id="serverless-spa-construct.FrontendConstructProps.property.autoDeleteObjects"></a>

```typescript
public readonly autoDeleteObjects: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to automatically delete objects when the bucket is removed.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="serverless-spa-construct.FrontendConstructProps.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

ACM certificate for the custom domain.

Required when domainName is provided. Must be in us-east-1 region for CloudFront.
Use ServerlessSpaSecurityConstruct.withCertificate() or withWafAndCertificate()
to create a certificate in us-east-1, or provide an externally created certificate.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.FrontendConstructProps.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name for API Gateway access restriction.

Only used when api is provided.

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="serverless-spa-construct.FrontendConstructProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

Custom domain name for the CloudFront distribution.

If provided, certificate must also be provided.

---

*Example*

```typescript
'www.example.com'
```


##### `edgeFunctionVersion`<sup>Optional</sup> <a name="edgeFunctionVersion" id="serverless-spa-construct.FrontendConstructProps.property.edgeFunctionVersion"></a>

```typescript
public readonly edgeFunctionVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

Lambda@Edge function version for origin request.

When provided, static custom header configuration is disabled
and Lambda@Edge will dynamically add the custom header.
Must be deployed in us-east-1 region.

---

##### `hostedZoneId`<sup>Optional</sup> <a name="hostedZoneId" id="serverless-spa-construct.FrontendConstructProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for creating DNS records and certificate validation.

Can be found in the Route53 console (e.g., 'Z1234567890ABC').
Required along with zoneName for automatic certificate creation and DNS record.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.FrontendConstructProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

Removal policy for the S3 bucket.

---

##### `webAclArn`<sup>Optional</sup> <a name="webAclArn" id="serverless-spa-construct.FrontendConstructProps.property.webAclArn"></a>

```typescript
public readonly webAclArn: string;
```

- *Type:* string

Optional WAF WebACL ARN to associate with the CloudFront distribution.

Must be a WAF WebACL with CLOUDFRONT scope (deployed in us-east-1).

---

##### `zoneName`<sup>Optional</sup> <a name="zoneName" id="serverless-spa-construct.FrontendConstructProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name (domain name).

Must match the zone name in Route53 (e.g., 'example.com').
Required along with hostedZoneId for automatic certificate creation and DNS record.

---

### LambdaEdgeConstructProps <a name="LambdaEdgeConstructProps" id="serverless-spa-construct.LambdaEdgeConstructProps"></a>

Properties for LambdaEdgeConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.LambdaEdgeConstructProps.Initializer"></a>

```typescript
import { LambdaEdgeConstructProps } from 'serverless-spa-construct'

const lambdaEdgeConstructProps: LambdaEdgeConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstructProps.property.secretName">secretName</a></code> | <code>string</code> | The Secrets Manager secret name (not ARN). |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstructProps.property.cacheTtlSeconds">cacheTtlSeconds</a></code> | <code>number</code> | Cache TTL for secret value in seconds. |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstructProps.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name to add to requests. |
| <code><a href="#serverless-spa-construct.LambdaEdgeConstructProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for resources. |

---

##### `secretName`<sup>Required</sup> <a name="secretName" id="serverless-spa-construct.LambdaEdgeConstructProps.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string

The Secrets Manager secret name (not ARN).

The Lambda@Edge function will construct the ARN at runtime.
Must be in us-east-1 region.

---

##### `cacheTtlSeconds`<sup>Optional</sup> <a name="cacheTtlSeconds" id="serverless-spa-construct.LambdaEdgeConstructProps.property.cacheTtlSeconds"></a>

```typescript
public readonly cacheTtlSeconds: number;
```

- *Type:* number
- *Default:* 300 (5 minutes)

Cache TTL for secret value in seconds.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.LambdaEdgeConstructProps.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name to add to requests.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.LambdaEdgeConstructProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* Inherits from app-level RemovalPolicy setting

Removal policy for resources.

---

### MinimalProps <a name="MinimalProps" id="serverless-spa-construct.MinimalProps"></a>

Props for ServerlessSpaConstruct.minimal() - Simplest setup with CloudFront default domain.

*Example*

```typescript
ServerlessSpaConstruct.minimal(this, 'App', {
  lambdaEntry: './src/api/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.MinimalProps.Initializer"></a>

```typescript
import { MinimalProps } from 'serverless-spa-construct'

const minimalProps: MinimalProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.MinimalProps.property.lambdaEntry">lambdaEntry</a></code> | <code>string</code> | Path to your Lambda handler file (e.g., './src/api/handler.ts'). |
| <code><a href="#serverless-spa-construct.MinimalProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB partition key attribute. |
| <code><a href="#serverless-spa-construct.MinimalProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a></code> | Advanced customization options. |
| <code><a href="#serverless-spa-construct.MinimalProps.property.disableSortKey">disableSortKey</a></code> | <code>boolean</code> | Whether to disable the sort key. |
| <code><a href="#serverless-spa-construct.MinimalProps.property.sortKey">sortKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB sort key attribute. |

---

##### `lambdaEntry`<sup>Required</sup> <a name="lambdaEntry" id="serverless-spa-construct.MinimalProps.property.lambdaEntry"></a>

```typescript
public readonly lambdaEntry: string;
```

- *Type:* string

Path to your Lambda handler file (e.g., './src/api/handler.ts').

---

##### `partitionKey`<sup>Required</sup> <a name="partitionKey" id="serverless-spa-construct.MinimalProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute

DynamoDB partition key attribute.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.MinimalProps.property.advanced"></a>

```typescript
public readonly advanced: AdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a>

Advanced customization options.

---

##### `disableSortKey`<sup>Optional</sup> <a name="disableSortKey" id="serverless-spa-construct.MinimalProps.property.disableSortKey"></a>

```typescript
public readonly disableSortKey: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable the sort key.

When true, the table is created without a sort key.

---

##### `sortKey`<sup>Optional</sup> <a name="sortKey" id="serverless-spa-construct.MinimalProps.property.sortKey"></a>

```typescript
public readonly sortKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* Default sort key (SK, STRING)

DynamoDB sort key attribute.

---

### MinimalSecurityProps <a name="MinimalSecurityProps" id="serverless-spa-construct.MinimalSecurityProps"></a>

Props for ServerlessSpaSecurityConstruct.minimal() - Custom header only (no WAF).

*Example*

```typescript
ServerlessSpaSecurityConstruct.minimal(this, 'Security', {
  ssmPrefix: '/myapp/security/',
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.MinimalSecurityProps.Initializer"></a>

```typescript
import { MinimalSecurityProps } from 'serverless-spa-construct'

const minimalSecurityProps: MinimalSecurityProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.MinimalSecurityProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for cross-region sharing. |
| <code><a href="#serverless-spa-construct.MinimalSecurityProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a></code> | Advanced customization options. |

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.MinimalSecurityProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM Parameter Store prefix for cross-region sharing.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.MinimalSecurityProps.property.advanced"></a>

```typescript
public readonly advanced: SecurityAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a>

Advanced customization options.

---

### SecretConstructProps <a name="SecretConstructProps" id="serverless-spa-construct.SecretConstructProps"></a>

Properties for SecretConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.SecretConstructProps.Initializer"></a>

```typescript
import { SecretConstructProps } from 'serverless-spa-construct'

const secretConstructProps: SecretConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SecretConstructProps.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name for API Gateway access restriction. |
| <code><a href="#serverless-spa-construct.SecretConstructProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for resources. |
| <code><a href="#serverless-spa-construct.SecretConstructProps.property.replicaRegions">replicaRegions</a></code> | <code>string[]</code> | Regions to replicate the secret to. |
| <code><a href="#serverless-spa-construct.SecretConstructProps.property.rotationDays">rotationDays</a></code> | <code>number</code> | Secret rotation interval in days. |
| <code><a href="#serverless-spa-construct.SecretConstructProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for updating during rotation. |

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.SecretConstructProps.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name for API Gateway access restriction.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.SecretConstructProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* Inherits from app-level RemovalPolicy setting

Removal policy for resources.

---

##### `replicaRegions`<sup>Optional</sup> <a name="replicaRegions" id="serverless-spa-construct.SecretConstructProps.property.replicaRegions"></a>

```typescript
public readonly replicaRegions: string[];
```

- *Type:* string[]
- *Default:* ['ap-northeast-1']

Regions to replicate the secret to.

us-east-1 cannot be specified as it is the primary region.

---

##### `rotationDays`<sup>Optional</sup> <a name="rotationDays" id="serverless-spa-construct.SecretConstructProps.property.rotationDays"></a>

```typescript
public readonly rotationDays: number;
```

- *Type:* number
- *Default:* 7

Secret rotation interval in days.

---

##### `ssmPrefix`<sup>Optional</sup> <a name="ssmPrefix" id="serverless-spa-construct.SecretConstructProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string
- *Default:* '/myapp/security/'

SSM Parameter Store prefix for updating during rotation.

Required for rotation Lambda to update SSM parameters.

---

### SecretOverrideOptions <a name="SecretOverrideOptions" id="serverless-spa-construct.SecretOverrideOptions"></a>

Secret override options (ssmPrefix is auto-wired from the parent construct).

#### Initializer <a name="Initializer" id="serverless-spa-construct.SecretOverrideOptions.Initializer"></a>

```typescript
import { SecretOverrideOptions } from 'serverless-spa-construct'

const secretOverrideOptions: SecretOverrideOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SecretOverrideOptions.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name for API Gateway access restriction. |
| <code><a href="#serverless-spa-construct.SecretOverrideOptions.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for resources. |
| <code><a href="#serverless-spa-construct.SecretOverrideOptions.property.replicaRegions">replicaRegions</a></code> | <code>string[]</code> | Regions to replicate the secret to. |
| <code><a href="#serverless-spa-construct.SecretOverrideOptions.property.rotationDays">rotationDays</a></code> | <code>number</code> | Secret rotation interval in days. |

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.SecretOverrideOptions.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string
- *Default:* 'x-origin-verify'

Custom header name for API Gateway access restriction.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.SecretOverrideOptions.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

Removal policy for resources.

---

##### `replicaRegions`<sup>Optional</sup> <a name="replicaRegions" id="serverless-spa-construct.SecretOverrideOptions.property.replicaRegions"></a>

```typescript
public readonly replicaRegions: string[];
```

- *Type:* string[]
- *Default:* ['ap-northeast-1']

Regions to replicate the secret to.

---

##### `rotationDays`<sup>Optional</sup> <a name="rotationDays" id="serverless-spa-construct.SecretOverrideOptions.property.rotationDays"></a>

```typescript
public readonly rotationDays: number;
```

- *Type:* number
- *Default:* 7

Secret rotation interval in days.

---

### SecurityAdvancedOptions <a name="SecurityAdvancedOptions" id="serverless-spa-construct.SecurityAdvancedOptions"></a>

Advanced customization options for fine-grained control.

Use these only when you need to override default behaviors.

#### Initializer <a name="Initializer" id="serverless-spa-construct.SecurityAdvancedOptions.Initializer"></a>

```typescript
import { SecurityAdvancedOptions } from 'serverless-spa-construct'

const securityAdvancedOptions: SecurityAdvancedOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SecurityAdvancedOptions.property.edgeCacheTtlSeconds">edgeCacheTtlSeconds</a></code> | <code>number</code> | Cache TTL for Lambda@Edge secret value in seconds. |
| <code><a href="#serverless-spa-construct.SecurityAdvancedOptions.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for all resources. |
| <code><a href="#serverless-spa-construct.SecurityAdvancedOptions.property.replicaRegions">replicaRegions</a></code> | <code>string[]</code> | Regions to replicate the secret to. |
| <code><a href="#serverless-spa-construct.SecurityAdvancedOptions.property.secret">secret</a></code> | <code><a href="#serverless-spa-construct.SecretOverrideOptions">SecretOverrideOptions</a></code> | Override SecretConstruct settings (ssmPrefix is auto-wired). |
| <code><a href="#serverless-spa-construct.SecurityAdvancedOptions.property.waf">waf</a></code> | <code><a href="#serverless-spa-construct.WafConstructProps">WafConstructProps</a></code> | Override WafConstruct settings. |

---

##### `edgeCacheTtlSeconds`<sup>Optional</sup> <a name="edgeCacheTtlSeconds" id="serverless-spa-construct.SecurityAdvancedOptions.property.edgeCacheTtlSeconds"></a>

```typescript
public readonly edgeCacheTtlSeconds: number;
```

- *Type:* number
- *Default:* 300

Cache TTL for Lambda@Edge secret value in seconds.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.SecurityAdvancedOptions.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.DESTROY

Removal policy for all resources.

---

##### `replicaRegions`<sup>Optional</sup> <a name="replicaRegions" id="serverless-spa-construct.SecurityAdvancedOptions.property.replicaRegions"></a>

```typescript
public readonly replicaRegions: string[];
```

- *Type:* string[]
- *Default:* ['ap-northeast-1']

Regions to replicate the secret to.

---

##### `secret`<sup>Optional</sup> <a name="secret" id="serverless-spa-construct.SecurityAdvancedOptions.property.secret"></a>

```typescript
public readonly secret: SecretOverrideOptions;
```

- *Type:* <a href="#serverless-spa-construct.SecretOverrideOptions">SecretOverrideOptions</a>

Override SecretConstruct settings (ssmPrefix is auto-wired).

---

##### `waf`<sup>Optional</sup> <a name="waf" id="serverless-spa-construct.SecurityAdvancedOptions.property.waf"></a>

```typescript
public readonly waf: WafConstructProps;
```

- *Type:* <a href="#serverless-spa-construct.WafConstructProps">WafConstructProps</a>

Override WafConstruct settings.

---

### SecurityConfig <a name="SecurityConfig" id="serverless-spa-construct.SecurityConfig"></a>

Security configuration for cross-region WAF and custom header integration.

#### Initializer <a name="Initializer" id="serverless-spa-construct.SecurityConfig.Initializer"></a>

```typescript
import { SecurityConfig } from 'serverless-spa-construct'

const securityConfig: SecurityConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SecurityConfig.property.securityRegion">securityRegion</a></code> | <code>string</code> | The region where ServerlessSpaSecurityConstruct is deployed. |
| <code><a href="#serverless-spa-construct.SecurityConfig.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix where security values are stored. |

---

##### `securityRegion`<sup>Optional</sup> <a name="securityRegion" id="serverless-spa-construct.SecurityConfig.property.securityRegion"></a>

```typescript
public readonly securityRegion: string;
```

- *Type:* string
- *Default:* 'us-east-1'

The region where ServerlessSpaSecurityConstruct is deployed.

---

##### `ssmPrefix`<sup>Optional</sup> <a name="ssmPrefix" id="serverless-spa-construct.SecurityConfig.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string
- *Default:* '/myapp/security/'

SSM Parameter Store prefix where security values are stored.

---

### ServerlessSpaProps <a name="ServerlessSpaProps" id="serverless-spa-construct.ServerlessSpaProps"></a>

Internal props for direct constructor usage.

#### Initializer <a name="Initializer" id="serverless-spa-construct.ServerlessSpaProps.Initializer"></a>

```typescript
import { ServerlessSpaProps } from 'serverless-spa-construct'

const serverlessSpaProps: ServerlessSpaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.api">api</a></code> | <code><a href="#serverless-spa-construct.ApiInternalOptions">ApiInternalOptions</a></code> | API configuration. |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.auth">auth</a></code> | <code><a href="#serverless-spa-construct.AuthConstructProps">AuthConstructProps</a></code> | Auth configuration. |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.database">database</a></code> | <code><a href="#serverless-spa-construct.DatabaseConstructProps">DatabaseConstructProps</a></code> | Database configuration. |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.frontend">frontend</a></code> | <code><a href="#serverless-spa-construct.FrontendAdvancedOptions">FrontendAdvancedOptions</a></code> | Frontend configuration. |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy. |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.security">security</a></code> | <code><a href="#serverless-spa-construct.SecurityConfig">SecurityConfig</a></code> | Security/WAF configuration. |
| <code><a href="#serverless-spa-construct.ServerlessSpaProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Tags. |

---

##### `api`<sup>Optional</sup> <a name="api" id="serverless-spa-construct.ServerlessSpaProps.property.api"></a>

```typescript
public readonly api: ApiInternalOptions;
```

- *Type:* <a href="#serverless-spa-construct.ApiInternalOptions">ApiInternalOptions</a>

API configuration.

---

##### `auth`<sup>Optional</sup> <a name="auth" id="serverless-spa-construct.ServerlessSpaProps.property.auth"></a>

```typescript
public readonly auth: AuthConstructProps;
```

- *Type:* <a href="#serverless-spa-construct.AuthConstructProps">AuthConstructProps</a>

Auth configuration.

---

##### `database`<sup>Optional</sup> <a name="database" id="serverless-spa-construct.ServerlessSpaProps.property.database"></a>

```typescript
public readonly database: DatabaseConstructProps;
```

- *Type:* <a href="#serverless-spa-construct.DatabaseConstructProps">DatabaseConstructProps</a>

Database configuration.

---

##### `frontend`<sup>Optional</sup> <a name="frontend" id="serverless-spa-construct.ServerlessSpaProps.property.frontend"></a>

```typescript
public readonly frontend: FrontendAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.FrontendAdvancedOptions">FrontendAdvancedOptions</a>

Frontend configuration.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.ServerlessSpaProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

Removal policy.

---

##### `security`<sup>Optional</sup> <a name="security" id="serverless-spa-construct.ServerlessSpaProps.property.security"></a>

```typescript
public readonly security: SecurityConfig;
```

- *Type:* <a href="#serverless-spa-construct.SecurityConfig">SecurityConfig</a>

Security/WAF configuration.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="serverless-spa-construct.ServerlessSpaProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Tags.

---

### ServerlessSpaSecurityConstructProps <a name="ServerlessSpaSecurityConstructProps" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps"></a>

Props for direct constructor usage.

Prefer using factory methods for clearer API.

#### Initializer <a name="Initializer" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.Initializer"></a>

```typescript
import { ServerlessSpaSecurityConstructProps } from 'serverless-spa-construct'

const serverlessSpaSecurityConstructProps: ServerlessSpaSecurityConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (Subject Alternative Names) for the certificate. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.domainName">domainName</a></code> | <code>string</code> | The primary domain name for the certificate. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.edgeCacheTtlSeconds">edgeCacheTtlSeconds</a></code> | <code>number</code> | Cache TTL for Lambda@Edge secret value in seconds. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.enableCertificate">enableCertificate</a></code> | <code>boolean</code> | Whether to create ACM certificate in us-east-1. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.enableCustomHeader">enableCustomHeader</a></code> | <code>boolean</code> | Whether to create custom header secret and Lambda@Edge function. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.enableWaf">enableWaf</a></code> | <code>boolean</code> | Whether to create WAF WebACL. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for DNS validation. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for resources. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.replicaRegions">replicaRegions</a></code> | <code>string[]</code> | Regions to replicate the secret to. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.secret">secret</a></code> | <code><a href="#serverless-spa-construct.SecretOverrideOptions">SecretOverrideOptions</a></code> | Optional SecretConstruct override options. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for cross-region sharing. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.waf">waf</a></code> | <code><a href="#serverless-spa-construct.WafConstructProps">WafConstructProps</a></code> | Optional WafConstruct properties. |
| <code><a href="#serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name for DNS validation. |

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain names (Subject Alternative Names) for the certificate.

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The primary domain name for the certificate.

Required when enableCertificate is true.

---

##### `edgeCacheTtlSeconds`<sup>Optional</sup> <a name="edgeCacheTtlSeconds" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.edgeCacheTtlSeconds"></a>

```typescript
public readonly edgeCacheTtlSeconds: number;
```

- *Type:* number
- *Default:* 300 (5 minutes)

Cache TTL for Lambda@Edge secret value in seconds.

---

##### `enableCertificate`<sup>Optional</sup> <a name="enableCertificate" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.enableCertificate"></a>

```typescript
public readonly enableCertificate: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to create ACM certificate in us-east-1.

---

##### `enableCustomHeader`<sup>Optional</sup> <a name="enableCustomHeader" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.enableCustomHeader"></a>

```typescript
public readonly enableCustomHeader: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to create custom header secret and Lambda@Edge function.

Set to false if you don't need custom header protection.

---

##### `enableWaf`<sup>Optional</sup> <a name="enableWaf" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.enableWaf"></a>

```typescript
public readonly enableWaf: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to create WAF WebACL.

Set to false if you don't need WAF protection.

---

##### `hostedZoneId`<sup>Optional</sup> <a name="hostedZoneId" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for DNS validation.

Required when enableCertificate is true.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.DESTROY

Removal policy for resources.

---

##### `replicaRegions`<sup>Optional</sup> <a name="replicaRegions" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.replicaRegions"></a>

```typescript
public readonly replicaRegions: string[];
```

- *Type:* string[]
- *Default:* ['ap-northeast-1']

Regions to replicate the secret to.

---

##### `secret`<sup>Optional</sup> <a name="secret" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.secret"></a>

```typescript
public readonly secret: SecretOverrideOptions;
```

- *Type:* <a href="#serverless-spa-construct.SecretOverrideOptions">SecretOverrideOptions</a>

Optional SecretConstruct override options.

These will be passed through to SecretConstruct.
Note: 'ssmPrefix' is auto-wired from ssmPrefix property.
Only used when enableCustomHeader is true.

---

##### `ssmPrefix`<sup>Optional</sup> <a name="ssmPrefix" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string
- *Default:* '/myapp/security/'

SSM Parameter Store prefix for cross-region sharing.

---

##### `waf`<sup>Optional</sup> <a name="waf" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.waf"></a>

```typescript
public readonly waf: WafConstructProps;
```

- *Type:* <a href="#serverless-spa-construct.WafConstructProps">WafConstructProps</a>

Optional WafConstruct properties.

These will be passed through to WafConstruct.
Only used when enableWaf is true.

---

##### `zoneName`<sup>Optional</sup> <a name="zoneName" id="serverless-spa-construct.ServerlessSpaSecurityConstructProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name for DNS validation.

Required when enableCertificate is true.

---

### SsmConstructProps <a name="SsmConstructProps" id="serverless-spa-construct.SsmConstructProps"></a>

Properties for SsmConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.SsmConstructProps.Initializer"></a>

```typescript
import { SsmConstructProps } from 'serverless-spa-construct'

const ssmConstructProps: SsmConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.SsmConstructProps.property.certificateArn">certificateArn</a></code> | <code>string</code> | ACM certificate ARN to store in SSM. |
| <code><a href="#serverless-spa-construct.SsmConstructProps.property.customHeaderName">customHeaderName</a></code> | <code>string</code> | Custom header name to store in SSM. |
| <code><a href="#serverless-spa-construct.SsmConstructProps.property.edgeFunctionVersionArn">edgeFunctionVersionArn</a></code> | <code>string</code> | Lambda@Edge function version ARN to store in SSM. |
| <code><a href="#serverless-spa-construct.SsmConstructProps.property.secretArn">secretArn</a></code> | <code>string</code> | Secret ARN to store in SSM. |
| <code><a href="#serverless-spa-construct.SsmConstructProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for cross-region sharing. |
| <code><a href="#serverless-spa-construct.SsmConstructProps.property.webAclArn">webAclArn</a></code> | <code>string</code> | WAF WebACL ARN to store in SSM. |

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="serverless-spa-construct.SsmConstructProps.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

ACM certificate ARN to store in SSM.

Used for cross-region certificate sharing with CloudFront.
Optional - only required when certificate is created in security stack.

---

##### `customHeaderName`<sup>Optional</sup> <a name="customHeaderName" id="serverless-spa-construct.SsmConstructProps.property.customHeaderName"></a>

```typescript
public readonly customHeaderName: string;
```

- *Type:* string

Custom header name to store in SSM.

Optional - only required when custom header is enabled.

---

##### `edgeFunctionVersionArn`<sup>Optional</sup> <a name="edgeFunctionVersionArn" id="serverless-spa-construct.SsmConstructProps.property.edgeFunctionVersionArn"></a>

```typescript
public readonly edgeFunctionVersionArn: string;
```

- *Type:* string

Lambda@Edge function version ARN to store in SSM.

Used for cross-region CloudFront association.
Optional - only required when custom header is enabled.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="serverless-spa-construct.SsmConstructProps.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

Secret ARN to store in SSM.

Optional - only required when custom header is enabled.

---

##### `ssmPrefix`<sup>Optional</sup> <a name="ssmPrefix" id="serverless-spa-construct.SsmConstructProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string
- *Default:* '/myapp/security/'

SSM Parameter Store prefix for cross-region sharing.

---

##### `webAclArn`<sup>Optional</sup> <a name="webAclArn" id="serverless-spa-construct.SsmConstructProps.property.webAclArn"></a>

```typescript
public readonly webAclArn: string;
```

- *Type:* string

WAF WebACL ARN to store in SSM.

Optional - only required when WAF is enabled.

---

### WafConstructProps <a name="WafConstructProps" id="serverless-spa-construct.WafConstructProps"></a>

Properties for WafConstruct.

#### Initializer <a name="Initializer" id="serverless-spa-construct.WafConstructProps.Initializer"></a>

```typescript
import { WafConstructProps } from 'serverless-spa-construct'

const wafConstructProps: WafConstructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.customRules">customRules</a></code> | <code><a href="#serverless-spa-construct.WafRuleConfig">WafRuleConfig</a>[]</code> | Custom WAF rules to add. |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.defaultAction">defaultAction</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL.DefaultActionProperty</code> | Default action when no rules match. |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.enableCommonRuleSet">enableCommonRuleSet</a></code> | <code>boolean</code> | Whether to include AWS Managed Rules Common Rule Set. |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.enableSqliRuleSet">enableSqliRuleSet</a></code> | <code>boolean</code> | Whether to include AWS Managed Rules SQLi Rule Set. |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.rateLimit">rateLimit</a></code> | <code>number</code> | Rate limit for WAF (requests per 5 minutes). |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for resources. |
| <code><a href="#serverless-spa-construct.WafConstructProps.property.rules">rules</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL.RuleProperty[]</code> | Completely override all rules with custom configuration. |

---

##### `customRules`<sup>Optional</sup> <a name="customRules" id="serverless-spa-construct.WafConstructProps.property.customRules"></a>

```typescript
public readonly customRules: WafRuleConfig[];
```

- *Type:* <a href="#serverless-spa-construct.WafRuleConfig">WafRuleConfig</a>[]
- *Default:* No custom rules

Custom WAF rules to add.

These rules will be added after the default rules.

---

##### `defaultAction`<sup>Optional</sup> <a name="defaultAction" id="serverless-spa-construct.WafConstructProps.property.defaultAction"></a>

```typescript
public readonly defaultAction: DefaultActionProperty;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL.DefaultActionProperty
- *Default:* { allow: {} }

Default action when no rules match.

---

##### `enableCommonRuleSet`<sup>Optional</sup> <a name="enableCommonRuleSet" id="serverless-spa-construct.WafConstructProps.property.enableCommonRuleSet"></a>

```typescript
public readonly enableCommonRuleSet: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to include AWS Managed Rules Common Rule Set.

---

##### `enableSqliRuleSet`<sup>Optional</sup> <a name="enableSqliRuleSet" id="serverless-spa-construct.WafConstructProps.property.enableSqliRuleSet"></a>

```typescript
public readonly enableSqliRuleSet: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to include AWS Managed Rules SQLi Rule Set.

---

##### `rateLimit`<sup>Optional</sup> <a name="rateLimit" id="serverless-spa-construct.WafConstructProps.property.rateLimit"></a>

```typescript
public readonly rateLimit: number;
```

- *Type:* number
- *Default:* 2000

Rate limit for WAF (requests per 5 minutes).

Set to 0 to disable the default rate limiting rule.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="serverless-spa-construct.WafConstructProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* Inherits from app-level RemovalPolicy setting

Removal policy for resources.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="serverless-spa-construct.WafConstructProps.property.rules"></a>

```typescript
public readonly rules: RuleProperty[];
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL.RuleProperty[]
- *Default:* Uses default rules with optional customRules

Completely override all rules with custom configuration.

When provided, rateLimit, enableCommonRuleSet, enableSqliRuleSet, and customRules are ignored.
Use this for full control over WAF rules.

---

### WafRuleConfig <a name="WafRuleConfig" id="serverless-spa-construct.WafRuleConfig"></a>

WAF rule configuration for custom rules.

#### Initializer <a name="Initializer" id="serverless-spa-construct.WafRuleConfig.Initializer"></a>

```typescript
import { WafRuleConfig } from 'serverless-spa-construct'

const wafRuleConfig: WafRuleConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WafRuleConfig.property.name">name</a></code> | <code>string</code> | Rule name. |
| <code><a href="#serverless-spa-construct.WafRuleConfig.property.priority">priority</a></code> | <code>number</code> | Rule priority. |
| <code><a href="#serverless-spa-construct.WafRuleConfig.property.statement">statement</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL.StatementProperty</code> | Rule statement defining the match conditions. |
| <code><a href="#serverless-spa-construct.WafRuleConfig.property.action">action</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL.RuleActionProperty</code> | Action to take when the rule matches. |
| <code><a href="#serverless-spa-construct.WafRuleConfig.property.overrideAction">overrideAction</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL.OverrideActionProperty</code> | Override action for managed rule groups. |
| <code><a href="#serverless-spa-construct.WafRuleConfig.property.visibilityConfig">visibilityConfig</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL.VisibilityConfigProperty</code> | CloudWatch metrics configuration. |

---

##### `name`<sup>Required</sup> <a name="name" id="serverless-spa-construct.WafRuleConfig.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Rule name.

---

##### `priority`<sup>Required</sup> <a name="priority" id="serverless-spa-construct.WafRuleConfig.property.priority"></a>

```typescript
public readonly priority: number;
```

- *Type:* number

Rule priority.

Lower numbers are evaluated first.

---

##### `statement`<sup>Required</sup> <a name="statement" id="serverless-spa-construct.WafRuleConfig.property.statement"></a>

```typescript
public readonly statement: StatementProperty;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL.StatementProperty

Rule statement defining the match conditions.

---

##### `action`<sup>Optional</sup> <a name="action" id="serverless-spa-construct.WafRuleConfig.property.action"></a>

```typescript
public readonly action: RuleActionProperty;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL.RuleActionProperty

Action to take when the rule matches.

Use { block: {} } to block, { allow: {} } to allow, { count: {} } to count only.
For managed rule groups, use overrideAction instead.

---

##### `overrideAction`<sup>Optional</sup> <a name="overrideAction" id="serverless-spa-construct.WafRuleConfig.property.overrideAction"></a>

```typescript
public readonly overrideAction: OverrideActionProperty;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL.OverrideActionProperty

Override action for managed rule groups.

Use { none: {} } to use the rule group's actions, or { count: {} } to count only.

---

##### `visibilityConfig`<sup>Optional</sup> <a name="visibilityConfig" id="serverless-spa-construct.WafRuleConfig.property.visibilityConfig"></a>

```typescript
public readonly visibilityConfig: VisibilityConfigProperty;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL.VisibilityConfigProperty

CloudWatch metrics configuration.

---

### WithCertificateSecurityProps <a name="WithCertificateSecurityProps" id="serverless-spa-construct.WithCertificateSecurityProps"></a>

Props for ServerlessSpaSecurityConstruct.withCertificate() - Custom header + certificate (no WAF).

*Example*

```typescript
ServerlessSpaSecurityConstruct.withCertificate(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.WithCertificateSecurityProps.Initializer"></a>

```typescript
import { WithCertificateSecurityProps } from 'serverless-spa-construct'

const withCertificateSecurityProps: WithCertificateSecurityProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WithCertificateSecurityProps.property.domainName">domainName</a></code> | <code>string</code> | The primary domain name for the certificate. |
| <code><a href="#serverless-spa-construct.WithCertificateSecurityProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for DNS validation. |
| <code><a href="#serverless-spa-construct.WithCertificateSecurityProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name for DNS validation. |
| <code><a href="#serverless-spa-construct.WithCertificateSecurityProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (Subject Alternative Names) for the certificate. |
| <code><a href="#serverless-spa-construct.WithCertificateSecurityProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for cross-region sharing. |
| <code><a href="#serverless-spa-construct.WithCertificateSecurityProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a></code> | Advanced customization options. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="serverless-spa-construct.WithCertificateSecurityProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The primary domain name for the certificate.

---

##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="serverless-spa-construct.WithCertificateSecurityProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for DNS validation.

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="serverless-spa-construct.WithCertificateSecurityProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name for DNS validation.

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.WithCertificateSecurityProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain names (Subject Alternative Names) for the certificate.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.WithCertificateSecurityProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM Parameter Store prefix for cross-region sharing.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.WithCertificateSecurityProps.property.advanced"></a>

```typescript
public readonly advanced: SecurityAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a>

Advanced customization options.

---

### WithCustomDomainAndWafProps <a name="WithCustomDomainAndWafProps" id="serverless-spa-construct.WithCustomDomainAndWafProps"></a>

Props for ServerlessSpaConstruct.withCustomDomainAndWaf() - Full featured setup.

*Example*

```typescript
ServerlessSpaConstruct.withCustomDomainAndWaf(this, 'App', {
  lambdaEntry: './src/api/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
  ssmPrefix: '/myapp/security/',
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.WithCustomDomainAndWafProps.Initializer"></a>

```typescript
import { WithCustomDomainAndWafProps } from 'serverless-spa-construct'

const withCustomDomainAndWafProps: WithCustomDomainAndWafProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.domainName">domainName</a></code> | <code>string</code> | Custom domain name. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 Hosted Zone ID. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.lambdaEntry">lambdaEntry</a></code> | <code>string</code> | Path to your Lambda handler file. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB partition key attribute. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM prefix matching your ServerlessSpaSecurityConstruct. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 Zone Name. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a></code> | Advanced customization options. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain aliases. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.disableSortKey">disableSortKey</a></code> | <code>boolean</code> | Whether to disable the sort key. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.securityRegion">securityRegion</a></code> | <code>string</code> | Region where SecurityStack is deployed. |
| <code><a href="#serverless-spa-construct.WithCustomDomainAndWafProps.property.sortKey">sortKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB sort key attribute. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

Custom domain name.

---

##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 Hosted Zone ID.

---

##### `lambdaEntry`<sup>Required</sup> <a name="lambdaEntry" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.lambdaEntry"></a>

```typescript
public readonly lambdaEntry: string;
```

- *Type:* string

Path to your Lambda handler file.

---

##### `partitionKey`<sup>Required</sup> <a name="partitionKey" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute

DynamoDB partition key attribute.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM prefix matching your ServerlessSpaSecurityConstruct.

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 Zone Name.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.advanced"></a>

```typescript
public readonly advanced: AdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a>

Advanced customization options.

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain aliases.

---

##### `disableSortKey`<sup>Optional</sup> <a name="disableSortKey" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.disableSortKey"></a>

```typescript
public readonly disableSortKey: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable the sort key.

When true, the table is created without a sort key.

---

##### `securityRegion`<sup>Optional</sup> <a name="securityRegion" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.securityRegion"></a>

```typescript
public readonly securityRegion: string;
```

- *Type:* string
- *Default:* 'us-east-1'

Region where SecurityStack is deployed.

---

##### `sortKey`<sup>Optional</sup> <a name="sortKey" id="serverless-spa-construct.WithCustomDomainAndWafProps.property.sortKey"></a>

```typescript
public readonly sortKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* Default sort key (SK, STRING)

DynamoDB sort key attribute.

---

### WithCustomDomainProps <a name="WithCustomDomainProps" id="serverless-spa-construct.WithCustomDomainProps"></a>

Props for ServerlessSpaConstruct.withCustomDomain() - Custom domain with certificate from SecurityStack.

*Example*

```typescript
ServerlessSpaConstruct.withCustomDomain(this, 'App', {
  lambdaEntry: './src/api/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
  ssmPrefix: '/myapp/security/',
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.WithCustomDomainProps.Initializer"></a>

```typescript
import { WithCustomDomainProps } from 'serverless-spa-construct'

const withCustomDomainProps: WithCustomDomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.domainName">domainName</a></code> | <code>string</code> | Custom domain name (e.g., 'www.example.com'). |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 Hosted Zone ID (from AWS Console). |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.lambdaEntry">lambdaEntry</a></code> | <code>string</code> | Path to your Lambda handler file. |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB partition key attribute. |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM prefix matching your ServerlessSpaSecurityConstruct. |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 Zone Name (e.g., 'example.com'). |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a></code> | Advanced customization options. |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain aliases (e.g., ['example.com']). |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.disableSortKey">disableSortKey</a></code> | <code>boolean</code> | Whether to disable the sort key. |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.securityRegion">securityRegion</a></code> | <code>string</code> | Region where SecurityStack is deployed. |
| <code><a href="#serverless-spa-construct.WithCustomDomainProps.property.sortKey">sortKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB sort key attribute. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="serverless-spa-construct.WithCustomDomainProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

Custom domain name (e.g., 'www.example.com').

---

##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="serverless-spa-construct.WithCustomDomainProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 Hosted Zone ID (from AWS Console).

---

##### `lambdaEntry`<sup>Required</sup> <a name="lambdaEntry" id="serverless-spa-construct.WithCustomDomainProps.property.lambdaEntry"></a>

```typescript
public readonly lambdaEntry: string;
```

- *Type:* string

Path to your Lambda handler file.

---

##### `partitionKey`<sup>Required</sup> <a name="partitionKey" id="serverless-spa-construct.WithCustomDomainProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute

DynamoDB partition key attribute.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.WithCustomDomainProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM prefix matching your ServerlessSpaSecurityConstruct.

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="serverless-spa-construct.WithCustomDomainProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 Zone Name (e.g., 'example.com').

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.WithCustomDomainProps.property.advanced"></a>

```typescript
public readonly advanced: AdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a>

Advanced customization options.

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.WithCustomDomainProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain aliases (e.g., ['example.com']).

---

##### `disableSortKey`<sup>Optional</sup> <a name="disableSortKey" id="serverless-spa-construct.WithCustomDomainProps.property.disableSortKey"></a>

```typescript
public readonly disableSortKey: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable the sort key.

When true, the table is created without a sort key.

---

##### `securityRegion`<sup>Optional</sup> <a name="securityRegion" id="serverless-spa-construct.WithCustomDomainProps.property.securityRegion"></a>

```typescript
public readonly securityRegion: string;
```

- *Type:* string
- *Default:* 'us-east-1'

Region where SecurityStack is deployed.

---

##### `sortKey`<sup>Optional</sup> <a name="sortKey" id="serverless-spa-construct.WithCustomDomainProps.property.sortKey"></a>

```typescript
public readonly sortKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* Default sort key (SK, STRING)

DynamoDB sort key attribute.

---

### WithWafAndCertificateSecurityProps <a name="WithWafAndCertificateSecurityProps" id="serverless-spa-construct.WithWafAndCertificateSecurityProps"></a>

Props for ServerlessSpaSecurityConstruct.withWafAndCertificate() - WAF + custom header + certificate.

*Example*

```typescript
ServerlessSpaSecurityConstruct.withWafAndCertificate(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  rateLimit: 3000,
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.Initializer"></a>

```typescript
import { WithWafAndCertificateSecurityProps } from 'serverless-spa-construct'

const withWafAndCertificateSecurityProps: WithWafAndCertificateSecurityProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.domainName">domainName</a></code> | <code>string</code> | The primary domain name for the certificate. |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | Route53 hosted zone ID for DNS validation. |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.zoneName">zoneName</a></code> | <code>string</code> | Route53 hosted zone name for DNS validation. |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Additional domain names (Subject Alternative Names) for the certificate. |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for cross-region sharing. |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a></code> | Advanced customization options. |
| <code><a href="#serverless-spa-construct.WithWafAndCertificateSecurityProps.property.rateLimit">rateLimit</a></code> | <code>number</code> | WAF rate limit (requests per 5 minutes). |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

The primary domain name for the certificate.

---

##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

Route53 hosted zone ID for DNS validation.

---

##### `zoneName`<sup>Required</sup> <a name="zoneName" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.zoneName"></a>

```typescript
public readonly zoneName: string;
```

- *Type:* string

Route53 hosted zone name for DNS validation.

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]

Additional domain names (Subject Alternative Names) for the certificate.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM Parameter Store prefix for cross-region sharing.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.advanced"></a>

```typescript
public readonly advanced: SecurityAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a>

Advanced customization options.

---

##### `rateLimit`<sup>Optional</sup> <a name="rateLimit" id="serverless-spa-construct.WithWafAndCertificateSecurityProps.property.rateLimit"></a>

```typescript
public readonly rateLimit: number;
```

- *Type:* number
- *Default:* 2000

WAF rate limit (requests per 5 minutes).

---

### WithWafProps <a name="WithWafProps" id="serverless-spa-construct.WithWafProps"></a>

Props for ServerlessSpaConstruct.withWaf() - WAF protection (requires SecurityStack in us-east-1).

*Example*

```typescript
// First deploy SecurityStack in us-east-1
ServerlessSpaConstruct.withWaf(this, 'App', {
  lambdaEntry: './src/api/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  ssmPrefix: '/myapp/security/',
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.WithWafProps.Initializer"></a>

```typescript
import { WithWafProps } from 'serverless-spa-construct'

const withWafProps: WithWafProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WithWafProps.property.lambdaEntry">lambdaEntry</a></code> | <code>string</code> | Path to your Lambda handler file. |
| <code><a href="#serverless-spa-construct.WithWafProps.property.partitionKey">partitionKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB partition key attribute. |
| <code><a href="#serverless-spa-construct.WithWafProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM prefix matching your ServerlessSpaSecurityConstruct. |
| <code><a href="#serverless-spa-construct.WithWafProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a></code> | Advanced customization options. |
| <code><a href="#serverless-spa-construct.WithWafProps.property.disableSortKey">disableSortKey</a></code> | <code>boolean</code> | Whether to disable the sort key. |
| <code><a href="#serverless-spa-construct.WithWafProps.property.securityRegion">securityRegion</a></code> | <code>string</code> | Region where SecurityStack is deployed. |
| <code><a href="#serverless-spa-construct.WithWafProps.property.sortKey">sortKey</a></code> | <code>aws-cdk-lib.aws_dynamodb.Attribute</code> | DynamoDB sort key attribute. |

---

##### `lambdaEntry`<sup>Required</sup> <a name="lambdaEntry" id="serverless-spa-construct.WithWafProps.property.lambdaEntry"></a>

```typescript
public readonly lambdaEntry: string;
```

- *Type:* string

Path to your Lambda handler file.

---

##### `partitionKey`<sup>Required</sup> <a name="partitionKey" id="serverless-spa-construct.WithWafProps.property.partitionKey"></a>

```typescript
public readonly partitionKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute

DynamoDB partition key attribute.

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.WithWafProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM prefix matching your ServerlessSpaSecurityConstruct.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.WithWafProps.property.advanced"></a>

```typescript
public readonly advanced: AdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.AdvancedOptions">AdvancedOptions</a>

Advanced customization options.

---

##### `disableSortKey`<sup>Optional</sup> <a name="disableSortKey" id="serverless-spa-construct.WithWafProps.property.disableSortKey"></a>

```typescript
public readonly disableSortKey: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to disable the sort key.

When true, the table is created without a sort key.

---

##### `securityRegion`<sup>Optional</sup> <a name="securityRegion" id="serverless-spa-construct.WithWafProps.property.securityRegion"></a>

```typescript
public readonly securityRegion: string;
```

- *Type:* string
- *Default:* 'us-east-1'

Region where SecurityStack is deployed.

---

##### `sortKey`<sup>Optional</sup> <a name="sortKey" id="serverless-spa-construct.WithWafProps.property.sortKey"></a>

```typescript
public readonly sortKey: Attribute;
```

- *Type:* aws-cdk-lib.aws_dynamodb.Attribute
- *Default:* Default sort key (SK, STRING)

DynamoDB sort key attribute.

---

### WithWafSecurityProps <a name="WithWafSecurityProps" id="serverless-spa-construct.WithWafSecurityProps"></a>

Props for ServerlessSpaSecurityConstruct.withWaf() - Full security with WAF.

*Example*

```typescript
ServerlessSpaSecurityConstruct.withWaf(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  rateLimit: 3000,
});
```


#### Initializer <a name="Initializer" id="serverless-spa-construct.WithWafSecurityProps.Initializer"></a>

```typescript
import { WithWafSecurityProps } from 'serverless-spa-construct'

const withWafSecurityProps: WithWafSecurityProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#serverless-spa-construct.WithWafSecurityProps.property.ssmPrefix">ssmPrefix</a></code> | <code>string</code> | SSM Parameter Store prefix for cross-region sharing. |
| <code><a href="#serverless-spa-construct.WithWafSecurityProps.property.advanced">advanced</a></code> | <code><a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a></code> | Advanced customization options. |
| <code><a href="#serverless-spa-construct.WithWafSecurityProps.property.rateLimit">rateLimit</a></code> | <code>number</code> | WAF rate limit (requests per 5 minutes). |

---

##### `ssmPrefix`<sup>Required</sup> <a name="ssmPrefix" id="serverless-spa-construct.WithWafSecurityProps.property.ssmPrefix"></a>

```typescript
public readonly ssmPrefix: string;
```

- *Type:* string

SSM Parameter Store prefix for cross-region sharing.

---

##### `advanced`<sup>Optional</sup> <a name="advanced" id="serverless-spa-construct.WithWafSecurityProps.property.advanced"></a>

```typescript
public readonly advanced: SecurityAdvancedOptions;
```

- *Type:* <a href="#serverless-spa-construct.SecurityAdvancedOptions">SecurityAdvancedOptions</a>

Advanced customization options.

---

##### `rateLimit`<sup>Optional</sup> <a name="rateLimit" id="serverless-spa-construct.WithWafSecurityProps.property.rateLimit"></a>

```typescript
public readonly rateLimit: number;
```

- *Type:* number
- *Default:* 2000

WAF rate limit (requests per 5 minutes).

---



