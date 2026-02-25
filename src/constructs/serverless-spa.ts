import { RemovalPolicy, Stack, Tags } from 'aws-cdk-lib';
import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Attribute } from 'aws-cdk-lib/aws-dynamodb';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IVersion, Version } from 'aws-cdk-lib/aws-lambda';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { ApiConstruct } from './api-construct';
import { AuthConstruct, AuthConstructProps } from './auth-construct';
import { DatabaseConstruct, DatabaseConstructProps } from './database-construct';
import { FrontendConstruct } from './frontend-construct';

// ============================================================================
// Base Types for Advanced Customization
// ============================================================================

/**
 * Security configuration for cross-region WAF and custom header integration.
 */
export interface SecurityConfig {
  /**
   * SSM Parameter Store prefix where security values are stored.
   * @default '/myapp/security/'
   */
  readonly ssmPrefix?: string;

  /**
   * The region where ServerlessSpaSecurityConstruct is deployed.
   * @default 'us-east-1'
   */
  readonly securityRegion?: string;

  /**
   * When true, only retrieve certificate-arn from SSM (skip WAF/secret/edge parameters).
   * Used internally by withCustomDomain() which doesn't need WAF resources.
   * @internal
   */
  readonly _certificateOnly?: boolean;
}

/**
 * API advanced options (table/userPool/entry are auto-wired).
 */
export interface ApiAdvancedOptions {
  /**
   * Optional Cognito User Pool Client ID for JWT validation in Lambda Authorizer.
   */
  readonly userPoolClientId?: string;

  /**
   * Custom header name for CloudFront-only access restriction.
   * @default 'x-origin-verify'
   */
  readonly customHeaderName?: string;

  /**
   * Optional Secrets Manager secret ARN for custom header validation.
   */
  readonly secretArn?: string;

  /**
   * Enable Lambda Authorizer for custom header validation.
   * @default true when secretArn is provided
   */
  readonly enableLambdaAuthorizer?: boolean;

  /**
   * Cache TTL for Lambda Authorizer secret value in seconds.
   * @default 300
   */
  readonly authorizerCacheTtlSeconds?: number;
}

/**
 * Frontend advanced options (api/customHeaderName/webAclArn are auto-wired).
 */
export interface FrontendAdvancedOptions {
  /**
   * Custom domain name for the CloudFront distribution.
   */
  readonly domainName?: string;

  /**
   * Additional domain names (aliases) for the CloudFront distribution.
   */
  readonly alternativeDomainNames?: string[];

  /**
   * ACM certificate for the custom domain.
   */
  readonly certificate?: ICertificate;

  /**
   * Route53 hosted zone ID for creating DNS records.
   */
  readonly hostedZoneId?: string;

  /**
   * Route53 hosted zone name.
   */
  readonly zoneName?: string;

  /**
   * Lambda@Edge function version for origin request.
   */
  readonly edgeFunctionVersion?: IVersion;

  /**
   * Removal policy for the S3 bucket.
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Whether to automatically delete objects when the bucket is removed.
   * @default false
   */
  readonly autoDeleteObjects?: boolean;
}

/**
 * Advanced customization options for fine-grained control.
 * Use these only when you need to override default behaviors.
 */
export interface AdvancedOptions {
  /** Override DatabaseConstruct settings */
  readonly database?: DatabaseConstructProps;
  /** Override AuthConstruct settings */
  readonly auth?: AuthConstructProps;
  /** Override ApiConstruct settings (table/userPool are auto-wired) */
  readonly api?: ApiAdvancedOptions;
  /** Override FrontendConstruct settings (api/headers are auto-wired) */
  readonly frontend?: FrontendAdvancedOptions;
  /** Security/WAF configuration */
  readonly security?: SecurityConfig;
  /** Removal policy for all resources @default - Inherits from app-level RemovalPolicy setting */
  readonly removalPolicy?: RemovalPolicy;
  /** Tags to apply to all resources */
  readonly tags?: { [key: string]: string };
}

// ============================================================================
// Factory Method Props - Clear Required vs Optional
// ============================================================================

/**
 * Props for ServerlessSpaConstruct.minimal() - Simplest setup with CloudFront default domain.
 *
 * @example
 * ServerlessSpaConstruct.minimal(this, 'App', {
 *   lambdaEntry: './src/api/handler.ts',
 *   partitionKey: { name: 'PK', type: AttributeType.STRING },
 * });
 */
export interface MinimalProps {
  // === REQUIRED ===
  /** Path to your Lambda handler file (e.g., './src/api/handler.ts') */
  readonly lambdaEntry: string;

  /**
   * DynamoDB partition key attribute.
   */
  readonly partitionKey: Attribute;

  // === OPTIONAL ===
  /**
   * DynamoDB sort key attribute.
   * @default - Default sort key (SK, STRING)
   */
  readonly sortKey?: Attribute;

  /**
   * Whether to disable the sort key.
   * When true, the table is created without a sort key.
   * @default false
   */
  readonly disableSortKey?: boolean;

  /** Advanced customization options */
  readonly advanced?: AdvancedOptions;
}

/**
 * Props for ServerlessSpaConstruct.withCustomDomain() - Custom domain with certificate from SecurityStack.
 *
 * @example
 * ServerlessSpaConstruct.withCustomDomain(this, 'App', {
 *   lambdaEntry: './src/api/handler.ts',
 *   partitionKey: { name: 'PK', type: AttributeType.STRING },
 *   domainName: 'www.example.com',
 *   hostedZoneId: 'Z1234567890ABC',
 *   zoneName: 'example.com',
 *   ssmPrefix: '/myapp/security/',
 * });
 */
export interface WithCustomDomainProps {
  // === REQUIRED ===
  /** Path to your Lambda handler file */
  readonly lambdaEntry: string;

  /**
   * DynamoDB partition key attribute.
   */
  readonly partitionKey: Attribute;

  /** Custom domain name (e.g., 'www.example.com') */
  readonly domainName: string;
  /** Route53 Hosted Zone ID (from AWS Console) */
  readonly hostedZoneId: string;
  /** Route53 Zone Name (e.g., 'example.com') */
  readonly zoneName: string;
  /** SSM prefix matching your ServerlessSpaSecurityConstruct */
  readonly ssmPrefix: string;

  // === OPTIONAL ===
  /**
   * DynamoDB sort key attribute.
   * @default - Default sort key (SK, STRING)
   */
  readonly sortKey?: Attribute;

  /**
   * Whether to disable the sort key.
   * When true, the table is created without a sort key.
   * @default false
   */
  readonly disableSortKey?: boolean;

  /** Additional domain aliases (e.g., ['example.com']) */
  readonly alternativeDomainNames?: string[];
  /** Region where SecurityStack is deployed @default 'us-east-1' */
  readonly securityRegion?: string;
  /** Advanced customization options */
  readonly advanced?: AdvancedOptions;
}

/**
 * Props for ServerlessSpaConstruct.withWaf() - WAF protection (requires SecurityStack in us-east-1).
 *
 * @example
 * // First deploy SecurityStack in us-east-1
 * ServerlessSpaConstruct.withWaf(this, 'App', {
 *   lambdaEntry: './src/api/handler.ts',
 *   partitionKey: { name: 'PK', type: AttributeType.STRING },
 *   ssmPrefix: '/myapp/security/',
 * });
 */
export interface WithWafProps {
  // === REQUIRED ===
  /** Path to your Lambda handler file */
  readonly lambdaEntry: string;

  /**
   * DynamoDB partition key attribute.
   */
  readonly partitionKey: Attribute;

  /** SSM prefix matching your ServerlessSpaSecurityConstruct */
  readonly ssmPrefix: string;

  // === OPTIONAL ===
  /**
   * DynamoDB sort key attribute.
   * @default - Default sort key (SK, STRING)
   */
  readonly sortKey?: Attribute;

  /**
   * Whether to disable the sort key.
   * When true, the table is created without a sort key.
   * @default false
   */
  readonly disableSortKey?: boolean;

  /** Region where SecurityStack is deployed @default 'us-east-1' */
  readonly securityRegion?: string;
  /** Advanced customization options */
  readonly advanced?: AdvancedOptions;
}

/**
 * Props for ServerlessSpaConstruct.withCustomDomainAndWaf() - Full featured setup.
 *
 * @example
 * ServerlessSpaConstruct.withCustomDomainAndWaf(this, 'App', {
 *   lambdaEntry: './src/api/handler.ts',
 *   partitionKey: { name: 'PK', type: AttributeType.STRING },
 *   domainName: 'www.example.com',
 *   hostedZoneId: 'Z1234567890ABC',
 *   zoneName: 'example.com',
 *   ssmPrefix: '/myapp/security/',
 * });
 */
export interface WithCustomDomainAndWafProps {
  // === REQUIRED ===
  /** Path to your Lambda handler file */
  readonly lambdaEntry: string;

  /**
   * DynamoDB partition key attribute.
   */
  readonly partitionKey: Attribute;

  /** Custom domain name */
  readonly domainName: string;
  /** Route53 Hosted Zone ID */
  readonly hostedZoneId: string;
  /** Route53 Zone Name */
  readonly zoneName: string;
  /** SSM prefix matching your ServerlessSpaSecurityConstruct */
  readonly ssmPrefix: string;

  // === OPTIONAL ===
  /**
   * DynamoDB sort key attribute.
   * @default - Default sort key (SK, STRING)
   */
  readonly sortKey?: Attribute;

  /**
   * Whether to disable the sort key.
   * When true, the table is created without a sort key.
   * @default false
   */
  readonly disableSortKey?: boolean;

  /** Additional domain aliases */
  readonly alternativeDomainNames?: string[];
  /** Region where SecurityStack is deployed @default 'us-east-1' */
  readonly securityRegion?: string;
  /** Advanced customization options */
  readonly advanced?: AdvancedOptions;
}

/**
 * Internal API configuration including entry path.
 */
export interface ApiInternalOptions extends ApiAdvancedOptions {
  /**
   * Path to the Lambda handler entry file.
   */
  readonly entry?: string;
}

/**
 * Internal props for direct constructor usage.
 */
export interface ServerlessSpaProps {
  /** Database configuration */
  readonly database?: DatabaseConstructProps;
  /** Auth configuration */
  readonly auth?: AuthConstructProps;
  /** API configuration */
  readonly api?: ApiInternalOptions;
  /** Frontend configuration */
  readonly frontend?: FrontendAdvancedOptions;
  /** Security/WAF configuration */
  readonly security?: SecurityConfig;
  /** Removal policy */
  readonly removalPolicy?: RemovalPolicy;
  /** Tags */
  readonly tags?: { [key: string]: string };
}

/**
 * A high-level CDK construct that creates a complete serverless SPA infrastructure.
 *
 * ## Recommended: Use Factory Methods
 *
 * Factory methods provide clear, use-case specific APIs.
 *
 * @example
 * // Simplest setup - CloudFront default domain
 * ServerlessSpaConstruct.minimal(this, 'App', {
 *   lambdaEntry: './src/api/handler.ts',
 *   partitionKey: { name: 'PK', type: AttributeType.STRING },
 * });
 *
 * ## Architecture
 *
 * This construct creates:
 * - DynamoDB table (single-table design, on-demand)
 * - Cognito User Pool (JWT authentication)
 * - API Gateway + Lambda (backend API)
 * - S3 + CloudFront (static hosting)
 */
export class ServerlessSpaConstruct extends Construct {
  // ============================================================================
  // Factory Methods - Recommended API
  // ============================================================================

  /**
   * Creates a minimal ServerlessSpaConstruct with CloudFront default domain.
   * Best for: Development, testing, or when custom domain is not needed.
   */
  public static minimal(scope: Construct, id: string, props: MinimalProps): ServerlessSpaConstruct {
    return new ServerlessSpaConstruct(scope, id, {
      ...props.advanced,
      database: {
        ...props.advanced?.database,
        partitionKey: props.partitionKey,
        sortKey: props.sortKey,
        disableSortKey: props.disableSortKey,
      },
      api: {
        ...props.advanced?.api,
        entry: props.lambdaEntry,
      },
    });
  }

  /**
   * Creates a ServerlessSpaConstruct with custom domain and certificate from SecurityStack.
   * Requires: ServerlessSpaSecurityConstruct with certificate deployed in us-east-1 first.
   * Best for: Production deployments with your own domain.
   */
  public static withCustomDomain(scope: Construct, id: string, props: WithCustomDomainProps): ServerlessSpaConstruct {
    return new ServerlessSpaConstruct(scope, id, {
      ...props.advanced,
      database: {
        ...props.advanced?.database,
        partitionKey: props.partitionKey,
        sortKey: props.sortKey,
        disableSortKey: props.disableSortKey,
      },
      api: {
        ...props.advanced?.api,
        entry: props.lambdaEntry,
      },
      frontend: {
        ...props.advanced?.frontend,
        domainName: props.domainName,
        hostedZoneId: props.hostedZoneId,
        zoneName: props.zoneName,
        alternativeDomainNames: props.alternativeDomainNames,
      },
      security: {
        ssmPrefix: props.ssmPrefix,
        securityRegion: props.securityRegion,
        _certificateOnly: true,
      },
    });
  }

  /**
   * Creates a ServerlessSpaConstruct with WAF protection.
   * Requires: ServerlessSpaSecurityConstruct deployed in us-east-1 first.
   * Best for: Production deployments requiring WAF protection.
   */
  public static withWaf(scope: Construct, id: string, props: WithWafProps): ServerlessSpaConstruct {
    return new ServerlessSpaConstruct(scope, id, {
      ...props.advanced,
      database: {
        ...props.advanced?.database,
        partitionKey: props.partitionKey,
        sortKey: props.sortKey,
        disableSortKey: props.disableSortKey,
      },
      api: {
        ...props.advanced?.api,
        entry: props.lambdaEntry,
      },
      security: {
        ssmPrefix: props.ssmPrefix,
        securityRegion: props.securityRegion,
      },
    });
  }

  /**
   * Creates a ServerlessSpaConstruct with custom domain AND WAF protection.
   * Requires: ServerlessSpaSecurityConstruct deployed in us-east-1 first.
   * Best for: Production deployments with custom domain and WAF.
   */
  public static withCustomDomainAndWaf(scope: Construct, id: string, props: WithCustomDomainAndWafProps): ServerlessSpaConstruct {
    return new ServerlessSpaConstruct(scope, id, {
      ...props.advanced,
      database: {
        ...props.advanced?.database,
        partitionKey: props.partitionKey,
        sortKey: props.sortKey,
        disableSortKey: props.disableSortKey,
      },
      api: {
        ...props.advanced?.api,
        entry: props.lambdaEntry,
      },
      frontend: {
        ...props.advanced?.frontend,
        domainName: props.domainName,
        hostedZoneId: props.hostedZoneId,
        zoneName: props.zoneName,
        alternativeDomainNames: props.alternativeDomainNames,
      },
      security: {
        ssmPrefix: props.ssmPrefix,
        securityRegion: props.securityRegion,
      },
    });
  }

  // ============================================================================
  // Instance Properties
  // ============================================================================
  /**
   * The DatabaseConstruct instance.
   */
  public readonly database: DatabaseConstruct;

  /**
   * The AuthConstruct instance.
   */
  public readonly auth: AuthConstruct;

  /**
   * The ApiConstruct instance.
   */
  public readonly api: ApiConstruct;

  /**
   * The FrontendConstruct instance.
   */
  public readonly frontend: FrontendConstruct;

  /**
   * The domain name of the CloudFront distribution.
   * Convenience property for frontend.distributionDomainName.
   */
  public readonly distributionDomainName: string;

  /**
   * The URL of the REST API endpoint.
   * Convenience property for api.apiUrl.
   */
  public readonly apiUrl: string;

  /**
   * The ID of the Cognito User Pool.
   * Convenience property for auth.userPoolId.
   */
  public readonly userPoolId: string;

  /**
   * The ID of the Cognito User Pool Client.
   * Convenience property for auth.userPoolClientId.
   */
  public readonly userPoolClientId: string;

  /**
   * The name of the DynamoDB table.
   * Convenience property for database.tableName.
   */
  public readonly tableName: string;

  /**
   * The WAF WebACL ARN retrieved from SSM Parameter Store.
   * Only available when security config is provided.
   */
  public webAclArn?: string;

  /**
   * The custom header name retrieved from SSM Parameter Store.
   * Only available when security config is provided.
   */
  public securityCustomHeaderName?: string;

  /**
   * The secret ARN retrieved from SSM Parameter Store.
   * Only available when security config is provided.
   */
  public secretArn?: string;

  /**
   * The Lambda@Edge function version ARN retrieved from SSM Parameter Store.
   * Only available when security config is provided.
   */
  public edgeFunctionVersionArn?: string;

  /**
   * The certificate ARN retrieved from SSM Parameter Store.
   * Only available when security config with certificate is provided.
   */
  public certificateArn?: string;

  /**
   * The ICertificate resolved from SSM Parameter Store certificate ARN.
   * Only available when security config with certificate is provided.
   */
  public certificate?: ICertificate;

  /**
   * The AwsCustomResource for retrieving SSM parameters from us-east-1.
   * Only available when security config is provided.
   */
  public ssmParameterReader?: AwsCustomResource;

  /**
   * Protected constructor - use factory methods instead.
   * @see ServerlessSpaConstruct.minimal
   * @see ServerlessSpaConstruct.withCustomDomain
   * @see ServerlessSpaConstruct.withWaf
   * @see ServerlessSpaConstruct.withCustomDomainAndWaf
   */
  // eslint-disable-next-line cdk/construct-props-struct-name
  protected constructor(scope: Construct, id: string, props?: ServerlessSpaProps) {
    super(scope, id);

    // Apply tags to all child resources
    if (props?.tags) {
      Object.entries(props.tags).forEach(([key, value]) => {
        Tags.of(this).add(key, value);
      });
    }

    const removalPolicy = props?.removalPolicy;

    // Create AwsCustomResource for cross-region SSM parameter retrieval if security config is provided
    if (props?.security) {
      const ssmPrefix = props.security.ssmPrefix ?? '/myapp/security/';
      const securityRegion = props.security.securityRegion ?? 'us-east-1';

      // SSM parameter ARN pattern for least-privilege access
      const ssmParameterArnPattern = `arn:aws:ssm:${securityRegion}:${Stack.of(this).account}:parameter${ssmPrefix}*`;

      // Create individual AwsCustomResource for each SSM parameter
      const createSsmReader = (readerId: string, paramName: string): AwsCustomResource => {
        const call = {
          service: 'SSM',
          action: 'getParameter',
          parameters: {
            Name: `${ssmPrefix}${paramName}`,
          },
          region: securityRegion,
          physicalResourceId: PhysicalResourceId.of(`${id}-ssm-${paramName}-${Date.now()}`),
        };
        return new AwsCustomResource(this, readerId, {
          onCreate: call,
          onUpdate: call,
          policy: AwsCustomResourcePolicy.fromStatements([
            new PolicyStatement({
              actions: ['ssm:GetParameter'],
              resources: [ssmParameterArnPattern],
            }),
          ]),
        });
      };

      // Create WAF/secret/edge SSM readers only when not in certificateOnly mode
      if (!props.security._certificateOnly) {
        const wafAclReader = createSsmReader('SsmWafAclArn', 'waf-acl-arn');
        const headerNameReader = createSsmReader('SsmCustomHeaderName', 'custom-header-name');
        const secretArnReader = createSsmReader('SsmSecretArn', 'secret-arn');
        const edgeFnReader = createSsmReader('SsmEdgeFunctionVersionArn', 'edge-function-version-arn');

        this.ssmParameterReader = wafAclReader;

        this.webAclArn = wafAclReader.getResponseField('Parameter.Value');
        this.securityCustomHeaderName = headerNameReader.getResponseField('Parameter.Value');
        this.secretArn = secretArnReader.getResponseField('Parameter.Value');
        this.edgeFunctionVersionArn = edgeFnReader.getResponseField('Parameter.Value');
      }

      // Read certificate ARN from SSM when frontend has a custom domain
      if (props?.frontend?.domainName) {
        const certArnReader = createSsmReader('SsmCertificateArn', 'certificate-arn');
        this.certificateArn = certArnReader.getResponseField('Parameter.Value');
        this.certificate = Certificate.fromCertificateArn(this, 'SsmCertificate', this.certificateArn);
      }
    }

    // Create DatabaseConstruct
    this.database = new DatabaseConstruct(this, 'Database', {
      ...props?.database,
      ...(removalPolicy !== undefined && { removalPolicy }),
    });

    // Create AuthConstruct
    this.auth = new AuthConstruct(this, 'Auth', {
      ...props?.auth,
    });

    // Create ApiConstruct with auto-wired dependencies
    this.api = new ApiConstruct(this, 'Api', {
      entry: props?.api?.entry ?? '',
      table: this.database.table,
      userPool: this.auth.userPool,
      userPoolClientId: this.auth.userPoolClientId,
      customHeaderName: props?.api?.customHeaderName,
      secretArn: props?.api?.secretArn ?? (props?.security ? this.secretArn : undefined),
      enableLambdaAuthorizer: props?.api?.enableLambdaAuthorizer,
      authorizerCacheTtlSeconds: props?.api?.authorizerCacheTtlSeconds,
    });

    // Create FrontendConstruct with auto-wired dependencies
    this.frontend = new FrontendConstruct(this, 'Frontend', {
      api: this.api.api,
      customHeaderName: this.api.customHeaderName,
      domainName: props?.frontend?.domainName,
      alternativeDomainNames: props?.frontend?.alternativeDomainNames,
      hostedZoneId: props?.frontend?.hostedZoneId,
      zoneName: props?.frontend?.zoneName,
      edgeFunctionVersion: props?.frontend?.edgeFunctionVersion,
      ...(removalPolicy !== undefined && {
        removalPolicy,
        autoDeleteObjects: removalPolicy === RemovalPolicy.DESTROY,
      }),
      ...(props?.security && { webAclArn: this.webAclArn }),
      ...(props?.security &&
        this.edgeFunctionVersionArn && {
          edgeFunctionVersion: Version.fromVersionArn(this, 'EdgeFunctionVersion', this.edgeFunctionVersionArn),
        }),
      ...(this.certificate && { certificate: this.certificate }),
    });

    // Set convenience properties
    this.distributionDomainName = this.frontend.distributionDomainName;
    this.apiUrl = this.api.apiUrl;
    this.userPoolId = this.auth.userPoolId;
    this.userPoolClientId = this.auth.userPoolClientId;
    this.tableName = this.database.tableName;
  }
}
