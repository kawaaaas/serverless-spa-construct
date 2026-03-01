<p align="center">
  <h1 align="center">serverless-spa-construct</h1>
  <p align="center">
    A high-level AWS CDK construct library for building production-ready serverless Single Page Applications on AWS.
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/serverless-spa-construct"><img src="https://img.shields.io/npm/v/serverless-spa-construct.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/serverless-spa-construct"><img src="https://img.shields.io/npm/dm/serverless-spa-construct.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/kawaaaas/serverless-spa-construct/actions"><img src="https://img.shields.io/github/actions/workflow/status/kawaaaas/serverless-spa-construct/release.yml?style=flat-square&label=build" alt="build status" /></a>
  <a href="https://github.com/kawaaaas/serverless-spa-construct/blob/main/LICENSE"><img src="https://img.shields.io/github/license/kawaaaas/serverless-spa-construct?style=flat-square" alt="license" /></a>
  <a href="https://constructs.dev/packages/serverless-spa-construct"><img src="https://img.shields.io/badge/constructs.dev-serverless--spa--construct-orange?style=flat-square" alt="construct hub" /></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#usage-patterns">Usage Patterns</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Why This Construct?

Building a production-ready SPA on AWS requires orchestrating 10+ services across multiple regions. CloudFront demands that WAF WebACLs, ACM certificates, and Lambda@Edge functions all reside in `us-east-1`, while your application stack lives in another region. Managing cross-region dependencies, secret rotation, and multi-layer authentication by hand is tedious, error-prone, and results in hundreds of lines of CDK code that every team ends up rewriting.

This construct library encapsulates all of that complexity behind a clean factory method API. One call creates a fully wired infrastructure:

| What you get                       | Details                                                                                                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Factory method pattern             | `minimal`, `withWaf`, `withCustomDomain`, `withCustomDomainAndWaf` — pick exactly the feature set you need                                                                                    |
| Cross-region dependency management | SSM Parameter Store handles WAF ARN, certificate ARN, secret ARN, Lambda@Edge version ARN, and custom header name automatically                                                               |
| Auto-wiring between constructs     | `ApiConstruct` receives DynamoDB table and Cognito User Pool. `FrontendConstruct` receives REST API, WAF WebACL ARN, certificate, and Lambda@Edge version. All IAM grants are created for you |
| Two-level API design               | High-level factory methods for common patterns, plus nine low-level constructs for full control                                                                                               |
| `advanced` option                  | Override any sub-construct property (GSIs, WAF custom rules, rotation interval, cache TTL, removal policy, tags) without dropping down to the low-level API                                   |

### Architecture-Level Benefits

- **Multi-layer origin protection** — Lambda@Edge injects a secret custom header (`x-origin-verify`) into every origin request. A Lambda Authorizer validates this header against the Secrets Manager value. Only requests through CloudFront reach your API.
- **Dual authentication** — JWT token (via `aws-jwt-verify`) and custom header validation in a single Lambda Authorizer invocation.
- **Automatic secret rotation** — Secrets Manager secret with a rotation Lambda (UUID, configurable schedule, default 7 days). Cross-region replication to your application region avoids latency.
- **In-memory caching** — Both Lambda@Edge and Lambda Authorizer cache secret values (configurable TTL, default 300s) to minimize Secrets Manager API calls.
- **WAF with sensible defaults** — Rate limiting (2000 req/5min), AWS Managed Rules Common Rule Set, and SQLi Rule Set enabled by default.
- **SPA routing via CloudFront Functions** — Extension-less paths rewrite to `/index.html` without intercepting API error responses.
- **S3 Origin Access Control (OAC)** — No legacy OAI. S3 bucket blocks all public access.
- **Cognito SPA-friendly defaults** — Email sign-in, self sign-up, SRP auth flow, no client secret.
- **DynamoDB single-table design** — PK/SK string attributes, on-demand billing, optional GSIs and PITR.
- **ACM certificate with DNS validation** — Certificate in `us-east-1` validated against Route53 hosted zone with SAN support.

## Architecture

```
                                    ┌──────────────────┐
                                    │  Cognito          │
                                    │  User Pool        │
                                    │  (JWT issuer)     │
                                    └────────┬─────────┘
                                             │ JWT verification
┌────────┐    ┌──────────────┐    ┌──────────┴─────────────┐
│  User  │───▶│  CloudFront  │───▶│ API Gateway (REST)     │
└────────┘    │              │    │ - Resource policy       │
              │ /api/* ──────┼───▶│ - Cognito Authorizer   │
              │              │    └──────────┬──────────────┘
              │ /* ──────────┼──┐            │
              └──────────────┘  │            ▼
                                │  ┌─────────┴─────────┐
                                │  │ Lambda             │
                                │  │ (Node.js 20.x)    │
                                │  └─────────┬─────────┘
                                │            │
                                ▼            ▼
                      ┌──────────────┐  ┌───────────┐
                      │ S3 Bucket    │  │ DynamoDB  │
                      └──────────────┘  └───────────┘
```

When WAF and custom domain are enabled, the security stack (`us-east-1`) adds:

```
┌───────────────────┐    ┌───────────────────┐    ┌─────────────────────┐
│ WAF WebACL        │    │ Secrets Manager   │    │ ACM Certificate     │
│ (CLOUDFRONT)      │    │ (auto-rotation)   │    │ (DNS validation)    │
└───────────────────┘    └────────┬──────────┘    └─────────────────────┘
                                  │
                         ┌────────┴──────────┐
                         │ Lambda@Edge       │
                         │ (origin request)  │
                         └───────────────────┘
                                  │
                         ┌────────┴──────────┐
                         │ SSM Parameters    │
                         │ (cross-region)    │
                         └───────────────────┘
```

### Cross-Region Architecture

```
us-east-1 (Security Stack)              Your Region (Main Stack)
┌───────────────────────────┐            ┌───────────────────────────┐
│ WAF WebACL                │            │ DynamoDB                  │
│ ACM Certificate           │   SSM      │ Cognito User Pool         │
│ Secrets Manager (primary) │ ─────────▶ │ API Gateway + Lambda      │
│ Lambda@Edge               │  params    │ S3 + CloudFront           │
│ SSM Parameters            │            │ Secrets Manager (replica) │
└───────────────────────────┘            └───────────────────────────┘
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
import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { ServerlessSpaConstruct } from 'serverless-spa-construct';

export class MyAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const app = ServerlessSpaConstruct.minimal(this, 'App', {
      lambdaEntry: './lambda/handler.ts',
      partitionKey: { name: 'PK', type: AttributeType.STRING },
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

> For a complete working example, see the [serverless-spa-construct-test](https://github.com/kawaaaas/serverless-spa-construct-test) repository.

## Usage Patterns

### Pattern 1: Minimal (Development / Testing)

No custom domain, no WAF. Uses CloudFront default domain.

```ts
ServerlessSpaConstruct.minimal(this, 'App', {
  lambdaEntry: './lambda/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  sortKey: { name: 'SK', type: AttributeType.STRING },
});
```

### Pattern 2: Custom Domain

Requires a `ServerlessSpaSecurityConstruct` with certificate deployed in `us-east-1` first.

```ts
ServerlessSpaConstruct.withCustomDomain(this, 'App', {
  lambdaEntry: './lambda/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
  ssmPrefix: '/myapp/security/',
  alternativeDomainNames: ['example.com'],
});
```

### Pattern 3: WAF Protection

Requires a `ServerlessSpaSecurityConstruct` with WAF deployed in `us-east-1` first.

```ts
ServerlessSpaConstruct.withWaf(this, 'App', {
  lambdaEntry: './lambda/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  ssmPrefix: '/myapp/security/',
});
```

### Pattern 4: Custom Domain + WAF (Full Production)

Requires a `ServerlessSpaSecurityConstruct` with WAF and certificate deployed in `us-east-1` first.

```ts
ServerlessSpaConstruct.withCustomDomainAndWaf(this, 'App', {
  lambdaEntry: './lambda/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  sortKey: { name: 'SK', type: AttributeType.STRING },
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
  ssmPrefix: '/myapp/security/',
  alternativeDomainNames: ['example.com'],
  securityRegion: 'us-east-1',
});
```

## Full Example: Two-Stack Production Deployment

A complete production setup with a security stack in `us-east-1` and a main application stack in your preferred region. A working reference implementation is available at [serverless-spa-construct-test](https://github.com/kawaaaas/serverless-spa-construct-test).

<details>
<summary>Click to expand full example</summary>

### CDK App Entry Point

```ts
// bin/app.ts
import * as cdk from 'aws-cdk-lib/core';
import { SecurityStack } from '../lib/security-stack';
import { MainStack } from '../lib/main-stack';

const app = new cdk.App();

const securityStack = new SecurityStack(app, 'SecurityStack', {
  env: { region: 'us-east-1' },
  crossRegionReferences: true,
});

const mainStack = new MainStack(app, 'MainStack', {
  env: { region: 'ap-northeast-1' },
  crossRegionReferences: true,
});

mainStack.addDependency(securityStack);
```

### Security Stack (us-east-1)

```ts
// lib/security-stack.ts
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { ServerlessSpaSecurityConstruct } from 'serverless-spa-construct';

export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ServerlessSpaSecurityConstruct.withWafAndCertificate(this, 'Security', {
      ssmPrefix: '/myapp/security/',
      rateLimit: 2000,
      domainName: 'www.example.com',
      hostedZoneId: 'Z1234567890ABC',
      zoneName: 'example.com',
      alternativeDomainNames: ['example.com'],
    });
  }
}
```

### Main Application Stack

```ts
// lib/main-stack.ts
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as path from 'path';
import { ServerlessSpaConstruct } from 'serverless-spa-construct';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ServerlessSpaConstruct.withCustomDomainAndWaf(this, 'App', {
      lambdaEntry: path.join(__dirname, '../lambda/handler.ts'),
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      sortKey: { name: 'SK', type: AttributeType.STRING },
      domainName: 'www.example.com',
      hostedZoneId: 'Z1234567890ABC',
      zoneName: 'example.com',
      ssmPrefix: '/myapp/security/',
      alternativeDomainNames: ['example.com'],
      securityRegion: 'us-east-1',
      advanced: {
        tags: {
          Project: 'MyApp',
          Environment: 'Production',
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

</details>

## Security Construct Factory Methods

`ServerlessSpaSecurityConstruct` must be deployed in `us-east-1`. It provides security resources shared with the main stack via SSM Parameter Store.

| Factory Method            | WAF | Custom Header + Lambda@Edge | ACM Certificate |
| ------------------------- | :-: | :-------------------------: | :-------------: |
| `minimal()`               |  —  |             ✅              |        —        |
| `withWaf()`               | ✅  |             ✅              |        —        |
| `withCertificate()`       |  —  |             ✅              |       ✅        |
| `withWafAndCertificate()` | ✅  |             ✅              |       ✅        |

<details>
<summary>Security construct examples</summary>

```ts
// Minimal: custom header only
ServerlessSpaSecurityConstruct.minimal(this, 'Security', {
  ssmPrefix: '/myapp/security/',
});

// WAF protection
ServerlessSpaSecurityConstruct.withWaf(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  rateLimit: 3000,
});

// Certificate only
ServerlessSpaSecurityConstruct.withCertificate(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
});

// Full security suite
ServerlessSpaSecurityConstruct.withWafAndCertificate(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  rateLimit: 2000,
  domainName: 'www.example.com',
  hostedZoneId: 'Z1234567890ABC',
  zoneName: 'example.com',
  alternativeDomainNames: ['example.com'],
});
```

</details>

## Advanced Options

Both high-level constructs accept an `advanced` option for fine-grained control over individual sub-constructs.

<details>
<summary>ServerlessSpaConstruct advanced options</summary>

```ts
ServerlessSpaConstruct.minimal(this, 'App', {
  lambdaEntry: './lambda/handler.ts',
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  advanced: {
    database: {
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecoveryEnabled: true,
      globalSecondaryIndexes: [
        {
          indexName: 'GSI1',
          partitionKey: { name: 'GSI1PK', type: AttributeType.STRING },
          sortKey: { name: 'GSI1SK', type: AttributeType.STRING },
        },
      ],
    },
    api: {
      customHeaderName: 'x-custom-verify',
      authorizerCacheTtlSeconds: 600,
    },
    frontend: {
      edgeFunctionVersion: myEdgeFunctionVersion,
    },
    removalPolicy: RemovalPolicy.RETAIN,
    tags: {
      Team: 'Backend',
    },
  },
});
```

</details>

<details>
<summary>ServerlessSpaSecurityConstruct advanced options</summary>

```ts
ServerlessSpaSecurityConstruct.withWaf(this, 'Security', {
  ssmPrefix: '/myapp/security/',
  rateLimit: 5000,
  advanced: {
    waf: {
      enableCommonRuleSet: true,
      enableSqliRuleSet: true,
      customRules: [
        {
          name: 'BlockBadBots',
          priority: 10,
          statement: {
            byteMatchStatement: {
              searchString: 'BadBot',
              fieldToMatch: { singleHeader: { name: 'user-agent' } },
              textTransformations: [{ priority: 0, type: 'LOWERCASE' }],
              positionalConstraint: 'CONTAINS',
            },
          },
          action: { block: {} },
        },
      ],
    },
    secret: {
      customHeaderName: 'x-custom-verify',
      rotationDays: 14,
    },
    replicaRegions: ['ap-northeast-1', 'eu-west-1'],
    edgeCacheTtlSeconds: 600,
    removalPolicy: RemovalPolicy.DESTROY,
  },
});
```

</details>

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

<details>
<summary>Low-level construct example</summary>

```ts
import { DatabaseConstruct, AuthConstruct, ApiConstruct, FrontendConstruct } from 'serverless-spa-construct';

const database = new DatabaseConstruct(this, 'Database', {
  partitionKey: { name: 'PK', type: AttributeType.STRING },
});

const auth = new AuthConstruct(this, 'Auth');

const api = new ApiConstruct(this, 'Api', {
  entry: './lambda/handler.ts',
  table: database.table,
  userPool: auth.userPool,
});

const frontend = new FrontendConstruct(this, 'Frontend', {
  api: api.api,
  customHeaderName: api.customHeaderName,
});
```

</details>

## How SSM-Based Dependency Management Works

The two stacks communicate through SSM Parameter Store, not through CloudFormation exports or hard-coded ARNs.

1. `ServerlessSpaSecurityConstruct` creates resources in `us-east-1` and writes their identifiers to SSM parameters under a shared prefix (e.g., `/myapp/security/`):
   - `{prefix}waf-acl-arn` — WAF WebACL ARN
   - `{prefix}custom-header-name` — Custom header name (e.g., `x-origin-verify`)
   - `{prefix}secret-arn` — Secrets Manager secret ARN
   - `{prefix}edge-function-version-arn` — Lambda@Edge function version ARN
   - `{prefix}certificate-arn` — ACM certificate ARN

2. `ServerlessSpaConstruct` in the main stack creates individual `AwsCustomResource` instances that call `ssm:GetParameter` against `us-east-1` at deploy time. Each reader has a least-privilege IAM policy scoped to `arn:aws:ssm:{region}:{account}:parameter{prefix}*`.

3. The retrieved values configure CloudFront (WAF association, certificate, Lambda@Edge), API Gateway (Lambda Authorizer with secret ARN), and other resources.

This approach avoids circular dependencies between stacks, allows independent updates, supports multiple environments via SSM prefix namespacing, and automatically picks up rotated secret values on redeployment.

## Security Model

This library implements defense in depth with multiple independent security layers:

```
User Request
  │
  ▼
[1] WAF WebACL ─── rate limiting + managed rules
  │
  ▼
[2] CloudFront ─── HTTPS only, OAC for S3
  │
  ▼
[3] Lambda@Edge ── injects secret custom header at origin request
  │
  ▼
[4] Lambda Authorizer ── validates custom header + JWT in one call
  │
  ▼
[5] API Gateway ── proxies to Lambda
  │
  ▼
[6] Lambda Handler ── DynamoDB access with least-privilege grants
```

| Layer             | What it does                                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WAF               | Blocks malicious traffic before CloudFront. Rate limiting prevents volumetric attacks. AWS Managed Rules block known attack patterns.                                                    |
| CloudFront        | Enforces HTTPS via `ViewerProtocolPolicy.HTTPS_ONLY`. S3 accessed exclusively through OAC with `BlockPublicAccess.BLOCK_ALL`.                                                            |
| Lambda@Edge       | Runs on every `/api/*` origin request. Retrieves secret from Secrets Manager and injects as custom header. In-memory caching (default 300s TTL). Rejects with 403 if secret unavailable. |
| Lambda Authorizer | Validates (a) custom header matches secret value and (b) JWT token is valid against Cognito User Pool. Both checks must pass.                                                            |
| API Gateway       | REST API with proxy integration. CORS configured with `Cors.ALL_ORIGINS` and `Cors.ALL_METHODS` by default.                                                                              |
| Lambda Handler    | Receives only authorized requests. Has read/write access to DynamoDB via `grantReadWriteData`.                                                                                           |

<details>
<summary>Secret Rotation Lifecycle</summary>

The `SecretConstruct` creates a rotation Lambda that follows the standard Secrets Manager four-step protocol:

1. **createSecret** — Generates a new UUID and stores it as `AWSPENDING`.
2. **setSecret** — No-op (no external service to update).
3. **testSecret** — No-op (no external service to test).
4. **finishSecret** — Promotes `AWSPENDING` to `AWSCURRENT` and updates the SSM parameter for cross-region consistency.

The rotation interval is configurable (default: 7 days). After rotation, the new secret value propagates to replicas automatically via Secrets Manager replication. The Lambda@Edge and Lambda Authorizer caches expire within the configured TTL (default: 300 seconds), after which they fetch the new value.

</details>

## Prerequisites

- Node.js 18.x or later
- AWS CDK v2.189.1 or later
- AWS CLI configured with appropriate credentials
- Route53 hosted zone (for custom domain features)

## API Reference

Full API documentation is auto-generated. See the [API.md](./API.md) file for detailed type definitions and property descriptions.

Also available on [Construct Hub](https://constructs.dev/packages/serverless-spa-construct).

## Contributing

Contributions are welcome. Please read the [contributing guide](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## License

[Apache-2.0](LICENSE)

---

<p align="center">
  Built with <a href="https://aws.amazon.com/cdk/">AWS CDK</a>
</p>
