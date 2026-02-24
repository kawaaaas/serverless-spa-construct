# serverless-spa-construct

A high-level AWS CDK construct library for building production-ready serverless Single Page Applications (SPA) on AWS.

This library provides two high-level constructs and nine low-level constructs that together create a complete serverless SPA infrastructure including DynamoDB, Cognito, API Gateway, Lambda, S3, CloudFront, WAF, ACM, Secrets Manager, Lambda@Edge, and SSM Parameter Store.

## Why This Construct?

### The Problem

Building a production-ready SPA on AWS requires orchestrating 10+ services across multiple regions. CloudFront demands that WAF WebACLs, ACM certificates, and Lambda@Edge functions all reside in us-east-1, while your application stack lives in another region. Managing cross-region dependencies, secret rotation, and multi-layer authentication by hand is tedious, error-prone, and results in hundreds of lines of CDK code that every team ends up rewriting.

### What This Library Solves

This construct library encapsulates all of that complexity behind a clean factory method API. One call creates a fully wired infrastructure. Here is what you get out of the box:

### CDK-Level Benefits

- Factory method pattern (`minimal`, `withWaf`, `withCustomDomain`, `withCustomDomainAndWaf`) lets you pick exactly the feature set you need. No unused resources, no wasted cost.
- Cross-region dependency management via SSM Parameter Store is handled automatically. The security stack in us-east-1 writes WAF ARN, certificate ARN, secret ARN, Lambda@Edge version ARN, and custom header name to SSM. The main stack reads them at deploy time through `AwsCustomResource` with least-privilege IAM policies. You never touch SSM directly.
- Auto-wiring between constructs eliminates manual plumbing. `ApiConstruct` automatically receives the DynamoDB table and Cognito User Pool. `FrontendConstruct` automatically receives the REST API, WAF WebACL ARN, certificate, and Lambda@Edge version. All IAM grants (DynamoDB read/write, Secrets Manager read, SSM read) are created for you.
- Two-level API design: high-level factory methods for common patterns, plus nine low-level constructs (`DatabaseConstruct`, `AuthConstruct`, `ApiConstruct`, `FrontendConstruct`, `WafConstruct`, `CertificateConstruct`, `SecretConstruct`, `LambdaEdgeConstruct`, `SsmConstruct`) for when you need full control.
- The `advanced` option on every factory method lets you override any sub-construct property (GSIs, WAF custom rules, rotation interval, cache TTL, removal policy, tags) without dropping down to the low-level API.

### Architecture-Level Benefits

- Multi-layer origin protection: API Gateway is not directly accessible from the internet. Lambda@Edge injects a secret custom header (`x-origin-verify`) into every origin request at the CloudFront edge. A Lambda Authorizer on API Gateway validates this header against the Secrets Manager value. Only requests that pass through CloudFront reach your API.
- Dual authentication in a single Lambda Authorizer: when both Cognito and custom header protection are enabled, the Lambda Authorizer validates the JWT token (via `aws-jwt-verify`) and the custom header in one invocation. This avoids the overhead of chaining two separate authorizers.
- Automatic secret rotation: `SecretConstruct` creates a Secrets Manager secret with a rotation Lambda that generates a new UUID on a configurable schedule (default: 7 days). The rotation handler follows the standard four-step Secrets Manager protocol (`createSecret` / `setSecret` / `testSecret` / `finishSecret`) and updates the SSM parameter after rotation to maintain cross-region consistency.
- Cross-region secret replication: the primary secret in us-east-1 is automatically replicated to your application region (default: `ap-northeast-1`). The Lambda Authorizer in the main stack reads from the local replica, avoiding cross-region latency on every API call.
- In-memory caching in both Lambda functions: the Lambda@Edge function and the Lambda Authorizer cache the secret value in memory with a configurable TTL (default: 300 seconds). This reduces Secrets Manager API calls to a minimum while ensuring rotated values propagate within the TTL window.
- WAF with sensible defaults: rate limiting (default: 2000 requests per 5 minutes), AWS Managed Rules Common Rule Set, and AWS Managed Rules SQLi Rule Set are all enabled by default. You can add custom rules, adjust the rate limit, or provide a completely custom rule set via the `rules` override.
- SPA routing via CloudFront Functions: a lightweight CloudFront Function rewrites extension-less paths to `/index.html` at the viewer-request stage. Unlike custom error responses, this approach does not intercept API Gateway error responses (403, 404), so real API errors are returned to the client as-is.
- S3 Origin Access Control (OAC): the S3 bucket blocks all public access. CloudFront accesses it exclusively through OAC, not the legacy Origin Access Identity.
- Cognito User Pool with SPA-friendly defaults: email sign-in, self sign-up, email auto-verification, SRP auth flow, no client secret (required for browser-based SPAs), and a secure password policy (min 8 chars, lowercase + digits required).
- DynamoDB single-table design defaults: PK/SK string attributes, on-demand billing, optional GSIs, and optional point-in-time recovery. The sort key can be disabled for simple key-value use cases.
- ACM certificate with DNS validation: `CertificateConstruct` creates a certificate in us-east-1 and validates it against your Route53 hosted zone. Alternative domain names (SANs) are supported.
- Route53 DNS records: `FrontendConstruct` automatically creates A records for the primary domain and all alternative domain names, pointing to the CloudFront distribution.

## Architecture

```
                                    +------------------+
                                    |  Cognito         |
                                    |  User Pool       |
                                    |  (JWT issuer)    |
                                    +--------+---------+
                                             | JWT verification
+--------+    +--------------+    +----------+-------------+
|  User  |--->|  CloudFront  |--->| API Gateway (REST)     |
+--------+    |              |    | - Resource policy      |
              | /api/* ------+--->| - Cognito Authorizer   |
              |              |    +----------+-------------+
              | /* ----------+--+            |
              +--------------+  |            v
                                |  +---------+---------+
                                |  | Lambda            |
                                |  | (Node.js 20.x)    |
                                |  +---------+---------+
                                |            |
                                v            v
                      +--------------+  +-----------+
                      | S3 Bucket    |  | DynamoDB  |
                      +--------------+  +-----------+
```

When WAF and custom domain are enabled, the security stack (us-east-1) adds:

```
+-------------------+    +-------------------+    +---------------------+
| WAF WebACL        |    | Secrets Manager   |    | ACM Certificate     |
| (CLOUDFRONT)      |    | (auto-rotation)   |    | (DNS validation)    |
+-------------------+    +--------+----------+    +---------------------+
                                  |
                         +--------+----------+
                         | Lambda@Edge       |
                         | (origin request)  |
                         +-------------------+
                                  |
                         +--------+----------+
                         | SSM Parameters    |
                         | (cross-region)    |
                         +-------------------+
```

## Installation

```bash
npm install serverless-spa-construct
```

Or with yarn:

```bash
yarn add serverless-spa-construct
```

Peer dependencies (must be installed separately):

```bash
npm install aws-cdk-lib constructs
```

## Quick Start

The simplest setup uses `ServerlessSpaConstruct.minimal()` with a CloudFront default domain:

```ts
import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { ServerlessSpaConstruct } from "serverless-spa-construct";

export class MyAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const app = ServerlessSpaConstruct.minimal(this, "App", {
      lambdaEntry: "./lambda/handler.ts",
      partitionKey: { name: "PK", type: AttributeType.STRING },
    });

    // Access outputs
    // app.distributionDomainName - CloudFront URL
    // app.apiUrl                - API Gateway endpoint
    // app.userPoolId            - Cognito User Pool ID
    // app.userPoolClientId      - Cognito User Pool Client ID
    // app.tableName             - DynamoDB table name
  }
}
```

## Usage Patterns

### Pattern 1: Minimal (Development / Testing)

No custom domain, no WAF. Uses CloudFront default domain.

```ts
ServerlessSpaConstruct.minimal(this, "App", {
  lambdaEntry: "./lambda/handler.ts",
  partitionKey: { name: "PK", type: AttributeType.STRING },
  sortKey: { name: "SK", type: AttributeType.STRING },
});
```

### Pattern 2: Custom Domain

Requires a `ServerlessSpaSecurityConstruct` with certificate deployed in us-east-1 first.

```ts
ServerlessSpaConstruct.withCustomDomain(this, "App", {
  lambdaEntry: "./lambda/handler.ts",
  partitionKey: { name: "PK", type: AttributeType.STRING },
  domainName: "www.example.com",
  hostedZoneId: "Z1234567890ABC",
  zoneName: "example.com",
  ssmPrefix: "/myapp/security/",
  alternativeDomainNames: ["example.com"],
});
```

### Pattern 3: WAF Protection

Requires a `ServerlessSpaSecurityConstruct` with WAF deployed in us-east-1 first.

```ts
ServerlessSpaConstruct.withWaf(this, "App", {
  lambdaEntry: "./lambda/handler.ts",
  partitionKey: { name: "PK", type: AttributeType.STRING },
  ssmPrefix: "/myapp/security/",
});
```

### Pattern 4: Custom Domain + WAF (Full Production)

Requires a `ServerlessSpaSecurityConstruct` with WAF and certificate deployed in us-east-1 first.

```ts
ServerlessSpaConstruct.withCustomDomainAndWaf(this, "App", {
  lambdaEntry: "./lambda/handler.ts",
  partitionKey: { name: "PK", type: AttributeType.STRING },
  sortKey: { name: "SK", type: AttributeType.STRING },
  domainName: "www.example.com",
  hostedZoneId: "Z1234567890ABC",
  zoneName: "example.com",
  ssmPrefix: "/myapp/security/",
  alternativeDomainNames: ["example.com"],
  securityRegion: "us-east-1",
});
```

## Full Example: Two-Stack Production Deployment

This example shows a complete production setup with a security stack in us-east-1 and a main application stack in your preferred region. A working reference implementation is available at [serverless-spa-construct-test](https://github.com/kawaaaas/serverless-spa-construct-test).

### CDK App Entry Point

```ts
// bin/app.ts
import * as cdk from "aws-cdk-lib/core";
import { SecurityStack } from "../lib/security-stack";
import { MainStack } from "../lib/main-stack";

const app = new cdk.App();

// Security stack must be deployed in us-east-1
// (CloudFront requires WAF WebACLs and ACM certificates in this region)
const securityStack = new SecurityStack(app, "SecurityStack", {
  env: { region: "us-east-1" },
  crossRegionReferences: true,
});

// Main stack can be deployed in any region
const mainStack = new MainStack(app, "MainStack", {
  env: { region: "ap-northeast-1" },
  crossRegionReferences: true,
});

// Main stack depends on security stack for SSM parameters
mainStack.addDependency(securityStack);
```

### Security Stack (us-east-1)

```ts
// lib/security-stack.ts
import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { ServerlessSpaSecurityConstruct } from "serverless-spa-construct";

export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ServerlessSpaSecurityConstruct.withWafAndCertificate(this, "Security", {
      ssmPrefix: "/myapp/security/",
      rateLimit: 2000,
      domainName: "www.example.com",
      hostedZoneId: "Z1234567890ABC",
      zoneName: "example.com",
      alternativeDomainNames: ["example.com"],
    });
  }
}
```

### Main Application Stack

```ts
// lib/main-stack.ts
import { AttributeType } from "aws-cdk-lib/aws-dynamodb";
import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as path from "path";
import { ServerlessSpaConstruct } from "serverless-spa-construct";

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ServerlessSpaConstruct.withCustomDomainAndWaf(this, "App", {
      lambdaEntry: path.join(__dirname, "../lambda/handler.ts"),
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      domainName: "www.example.com",
      hostedZoneId: "Z1234567890ABC",
      zoneName: "example.com",
      ssmPrefix: "/myapp/security/",
      alternativeDomainNames: ["example.com"],
      securityRegion: "us-east-1",
      advanced: {
        tags: {
          Project: "MyApp",
          Environment: "Production",
        },
      },
    });
  }
}
```

### Deployment

```bash
# Deploy both stacks (CDK resolves dependencies automatically)
npx cdk deploy --all

# Or deploy individually
npx cdk deploy SecurityStack
npx cdk deploy MainStack
```

## Security Construct Factory Methods

`ServerlessSpaSecurityConstruct` must be deployed in us-east-1. It provides security resources that are shared with the main stack via SSM Parameter Store.

| Factory Method            | WAF | Custom Header + Lambda@Edge | ACM Certificate |
| ------------------------- | --- | --------------------------- | --------------- |
| `minimal()`               | -   | Yes                         | -               |
| `withWaf()`               | Yes | Yes                         | -               |
| `withCertificate()`       | -   | Yes                         | Yes             |
| `withWafAndCertificate()` | Yes | Yes                         | Yes             |

```ts
// Minimal: custom header only
ServerlessSpaSecurityConstruct.minimal(this, "Security", {
  ssmPrefix: "/myapp/security/",
});

// WAF protection
ServerlessSpaSecurityConstruct.withWaf(this, "Security", {
  ssmPrefix: "/myapp/security/",
  rateLimit: 3000,
});

// Certificate only
ServerlessSpaSecurityConstruct.withCertificate(this, "Security", {
  ssmPrefix: "/myapp/security/",
  domainName: "www.example.com",
  hostedZoneId: "Z1234567890ABC",
  zoneName: "example.com",
});

// Full security suite
ServerlessSpaSecurityConstruct.withWafAndCertificate(this, "Security", {
  ssmPrefix: "/myapp/security/",
  rateLimit: 2000,
  domainName: "www.example.com",
  hostedZoneId: "Z1234567890ABC",
  zoneName: "example.com",
  alternativeDomainNames: ["example.com"],
});
```

## Advanced Options

Both high-level constructs accept an `advanced` option for fine-grained control over individual sub-constructs.

### ServerlessSpaConstruct

```ts
ServerlessSpaConstruct.minimal(this, "App", {
  lambdaEntry: "./lambda/handler.ts",
  partitionKey: { name: "PK", type: AttributeType.STRING },
  advanced: {
    database: {
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecoveryEnabled: true,
      globalSecondaryIndexes: [
        {
          indexName: "GSI1",
          partitionKey: { name: "GSI1PK", type: AttributeType.STRING },
          sortKey: { name: "GSI1SK", type: AttributeType.STRING },
        },
      ],
    },
    api: {
      customHeaderName: "x-custom-verify",
      authorizerCacheTtlSeconds: 600,
    },
    frontend: {
      edgeFunctionVersion: myEdgeFunctionVersion,
    },
    removalPolicy: RemovalPolicy.RETAIN,
    tags: {
      Team: "Backend",
    },
  },
});
```

### ServerlessSpaSecurityConstruct

```ts
ServerlessSpaSecurityConstruct.withWaf(this, "Security", {
  ssmPrefix: "/myapp/security/",
  rateLimit: 5000,
  advanced: {
    waf: {
      enableCommonRuleSet: true,
      enableSqliRuleSet: true,
      customRules: [
        {
          name: "BlockBadBots",
          priority: 10,
          statement: {
            byteMatchStatement: {
              searchString: "BadBot",
              fieldToMatch: { singleHeader: { name: "user-agent" } },
              textTransformations: [{ priority: 0, type: "LOWERCASE" }],
              positionalConstraint: "CONTAINS",
            },
          },
          action: { block: {} },
        },
      ],
    },
    secret: {
      customHeaderName: "x-custom-verify",
      rotationDays: 14,
    },
    replicaRegions: ["ap-northeast-1", "eu-west-1"],
    edgeCacheTtlSeconds: 600,
    removalPolicy: RemovalPolicy.DESTROY,
  },
});
```

## Low-Level Constructs

For cases where the high-level constructs do not fit your needs, you can use the low-level constructs individually.

| Construct              | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `DatabaseConstruct`    | DynamoDB table with single-table design defaults (PK/SK, on-demand billing) |
| `AuthConstruct`        | Cognito User Pool with SPA-friendly defaults (email sign-in, SRP auth)      |
| `ApiConstruct`         | API Gateway (REST) + Lambda with Cognito/Lambda Authorizer support          |
| `FrontendConstruct`    | S3 + CloudFront with SPA routing, OAC, and optional custom domain           |
| `WafConstruct`         | WAF WebACL (CLOUDFRONT scope) with rate limiting and managed rules          |
| `CertificateConstruct` | ACM certificate with Route53 DNS validation                                 |
| `SecretConstruct`      | Secrets Manager secret with auto-rotation for custom header values          |
| `LambdaEdgeConstruct`  | Lambda@Edge function for injecting custom headers into origin requests      |
| `SsmConstruct`         | SSM Parameter Store for cross-region configuration sharing                  |

Example using low-level constructs:

```ts
import {
  DatabaseConstruct,
  AuthConstruct,
  ApiConstruct,
  FrontendConstruct,
} from "serverless-spa-construct";

const database = new DatabaseConstruct(this, "Database", {
  partitionKey: { name: "PK", type: AttributeType.STRING },
});

const auth = new AuthConstruct(this, "Auth");

const api = new ApiConstruct(this, "Api", {
  entry: "./lambda/handler.ts",
  table: database.table,
  userPool: auth.userPool,
});

const frontend = new FrontendConstruct(this, "Frontend", {
  api: api.api,
  customHeaderName: api.customHeaderName,
});
```

## Cross-Region Architecture

This library uses a two-stack pattern because CloudFront requires certain resources (WAF WebACL, ACM certificate, Lambda@Edge) to be in us-east-1.

```
us-east-1 (Security Stack)              Your Region (Main Stack)
+---------------------------+            +---------------------------+
| WAF WebACL                |            | DynamoDB                  |
| ACM Certificate           |   SSM      | Cognito User Pool         |
| Secrets Manager (primary) | ---------> | API Gateway + Lambda      |
| Lambda@Edge               |  params    | S3 + CloudFront           |
| SSM Parameters            |            | Secrets Manager (replica) |
+---------------------------+            +---------------------------+
```

### How SSM-Based Dependency Management Works

The two stacks communicate through SSM Parameter Store, not through CloudFormation exports or hard-coded ARNs. This decoupling is intentional:

1. The `ServerlessSpaSecurityConstruct` creates resources in us-east-1 and writes their identifiers to SSM parameters under a shared prefix (e.g., `/myapp/security/`):
   - `{prefix}waf-acl-arn` -- WAF WebACL ARN
   - `{prefix}custom-header-name` -- Custom header name (e.g., `x-origin-verify`)
   - `{prefix}secret-arn` -- Secrets Manager secret ARN
   - `{prefix}edge-function-version-arn` -- Lambda@Edge function version ARN
   - `{prefix}certificate-arn` -- ACM certificate ARN

2. The `ServerlessSpaConstruct` in the main stack creates individual `AwsCustomResource` instances that call `ssm:GetParameter` against us-east-1 at deploy time. Each reader has a least-privilege IAM policy scoped to `arn:aws:ssm:{region}:{account}:parameter{prefix}*`.

3. The retrieved values are used to configure CloudFront (WAF association, certificate, Lambda@Edge), API Gateway (Lambda Authorizer with secret ARN), and other resources.

This approach has several advantages over alternatives:

- No circular dependency between stacks (a common problem with CloudFormation exports).
- The security stack can be updated independently without redeploying the main stack.
- The SSM prefix acts as a namespace, allowing multiple environments (dev, staging, prod) to coexist in the same account.
- Secret rotation updates the SSM parameter automatically, so the next deployment of the main stack picks up the latest value.

## Security Model

This library implements defense in depth with multiple independent security layers:

```
User Request
  |
  v
[1] WAF WebACL (rate limiting + managed rules)
  |
  v
[2] CloudFront (HTTPS only, OAC for S3)
  |
  v
[3] Lambda@Edge (injects secret custom header at origin request)
  |
  v
[4] Lambda Authorizer (validates custom header + JWT in one call)
  |
  v
[5] API Gateway (proxies to Lambda)
  |
  v
[6] Lambda Handler (DynamoDB access with least-privilege grants)
```

Layer 1 -- WAF: Blocks malicious traffic before it reaches CloudFront. Rate limiting prevents volumetric attacks. AWS Managed Rules (Common Rule Set, SQLi Rule Set) block known attack patterns. Custom rules can be added for application-specific filtering.

Layer 2 -- CloudFront: Enforces HTTPS via `ViewerProtocolPolicy.HTTPS_ONLY`. S3 is accessed exclusively through Origin Access Control (OAC), not the legacy OAI. The S3 bucket has `BlockPublicAccess.BLOCK_ALL` enabled.

Layer 3 -- Lambda@Edge: Runs at the CloudFront edge on every `/api/*` origin request. Retrieves the current secret value from Secrets Manager (us-east-1) and injects it as a custom header (`x-origin-verify`). Uses in-memory caching (configurable TTL, default 300s) to minimize Secrets Manager API calls. If the secret cannot be retrieved, the request is rejected with 403 before reaching API Gateway.

Layer 4 -- Lambda Authorizer: Validates two things in a single invocation: (a) the custom header matches the expected secret value (read from the local Secrets Manager replica with in-memory caching), and (b) the JWT token from the `Authorization` header is valid against the Cognito User Pool (using `aws-jwt-verify`). Both checks must pass. This dual validation ensures that only requests originating from CloudFront with a valid authenticated user can reach the backend.

Layer 5 -- API Gateway: REST API with proxy integration. CORS is configured with `Cors.ALL_ORIGINS` and `Cors.ALL_METHODS` by default.

Layer 6 -- Lambda Handler: Receives only authorized requests. Has read/write access to the DynamoDB table via `grantReadWriteData`. Secrets Manager read access is granted only when `secretArn` is provided.

### Secret Rotation Lifecycle

The `SecretConstruct` creates a rotation Lambda that follows the standard Secrets Manager four-step protocol:

1. `createSecret` -- Generates a new UUID and stores it as `AWSPENDING`.
2. `setSecret` -- No-op (no external service to update).
3. `testSecret` -- No-op (no external service to test).
4. `finishSecret` -- Promotes `AWSPENDING` to `AWSCURRENT` and updates the SSM parameter to maintain cross-region consistency.

The rotation interval is configurable (default: 7 days). After rotation, the new secret value propagates to replicas automatically via Secrets Manager replication. The Lambda@Edge and Lambda Authorizer caches expire within the configured TTL (default: 300 seconds), after which they fetch the new value.

## Prerequisites

- Node.js 18.x or later
- AWS CDK v2.189.1 or later
- AWS CLI configured with appropriate credentials
- Route53 hosted zone (for custom domain features)

## API Reference

Full API documentation is auto-generated. See the [API.md](./API.md) file for detailed type definitions and property descriptions.

## License

Apache-2.0
