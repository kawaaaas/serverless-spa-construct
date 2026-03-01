import { RemovalPolicy } from "aws-cdk-lib";
import { Attribute, AttributeType, BillingMode, GlobalSecondaryIndexProps, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

/**
 * Properties for DatabaseConstruct.
 */
export interface DatabaseConstructProps {
  /**
   * Optional table name.
   * If not specified, CDK will generate a unique name.
   */
  readonly tableName?: string;

  /**
   * Partition key attribute.
   * @default { name: 'PK', type: AttributeType.STRING }
   */
  readonly partitionKey?: Attribute;

  /**
   * Sort key attribute.
   * @default { name: 'SK', type: AttributeType.STRING }
   */
  readonly sortKey?: Attribute;

  /**
   * Whether to disable the sort key. When true, the table is created without a sort key.
   * @default false
   */
  readonly disableSortKey?: boolean;

  /**
   * Global secondary indexes to add to the table.
   * @default - No GSIs
   */
  readonly globalSecondaryIndexes?: GlobalSecondaryIndexProps[];

  /**
   * DynamoDB billing mode.
   * @default BillingMode.PAY_PER_REQUEST
   */
  readonly billingMode?: BillingMode;

  /**
   * Removal policy for the table.
   * @default - Inherits from app-level RemovalPolicy setting
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Enable point-in-time recovery.
   * @default false
   */
  readonly pointInTimeRecoveryEnabled?: boolean;
}

/**
 * A CDK construct that creates a DynamoDB table with sensible defaults.
 *
 * This construct is designed for single-table design patterns and provides:
 * - Default partition key (PK) and sort key (SK) with string type
 * - On-demand billing mode for cost optimization
 * - DESTROY removal policy for development environments
 * - Support for GSIs and custom table properties
 */
export class DatabaseConstruct extends Construct {
  /**
   * The DynamoDB table created by this construct.
   * Exposes Table (not ITable) to enable use of the grants property.
   */
  public readonly table: Table;

  /**
   * The name of the DynamoDB table.
   */
  public readonly tableName: string;

  /**
   * The ARN of the DynamoDB table.
   */
  public readonly tableArn: string;

  constructor(scope: Construct, id: string, props?: DatabaseConstructProps) {
    super(scope, id);

    // Default partition key: PK (String)
    const partitionKey: Attribute = props?.partitionKey ?? {
      name: "PK",
      type: AttributeType.STRING,
    };

    // Default sort key: SK (String), unless explicitly disabled
    const sortKey: Attribute | undefined = props?.disableSortKey
      ? undefined
      : (props?.sortKey ?? {
          name: "SK",
          type: AttributeType.STRING,
        });

    // Create the DynamoDB table
    const table = new Table(this, "Table", {
      tableName: props?.tableName,
      partitionKey,
      sortKey,
      billingMode: props?.billingMode ?? BillingMode.PAY_PER_REQUEST,
      removalPolicy: props?.removalPolicy,
      pointInTimeRecoverySpecification: { pointInTimeRecoveryEnabled: props?.pointInTimeRecoveryEnabled ?? false },
    });

    // Add GSIs if specified
    if (props?.globalSecondaryIndexes) {
      for (const gsi of props.globalSecondaryIndexes) {
        table.addGlobalSecondaryIndex(gsi);
      }
    }

    // Expose public properties
    this.table = table;
    this.tableName = table.tableName;
    this.tableArn = table.tableArn;
  }
}
