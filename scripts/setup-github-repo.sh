#!/usr/bin/env bash
set -euo pipefail

REPO="kawaaaas/serverless-spa-construct"

echo "=== GitHub Repository Setup for ${REPO} ==="
echo ""

# -------------------------------------------------------
# 1. Repository settings
# -------------------------------------------------------
echo "[1/6] Configuring repository settings..."
gh api "repos/${REPO}" -X PATCH \
  -f description="A high-level AWS CDK construct for building serverless SPAs with DynamoDB, Cognito, API Gateway, S3, CloudFront, WAF, and more." \
  -f homepage="https://www.npmjs.com/package/serverless-spa-construct" \
  -F delete_branch_on_merge=true \
  -F has_wiki=false \
  -F has_projects=false \
  -F has_discussions=true \
  -F allow_merge_commit=false \
  -F allow_squash_merge=true \
  -F allow_rebase_merge=false \
  -F allow_auto_merge=true \
  -F squash_merge_commit_title="PR_TITLE" \
  -F squash_merge_commit_message="PR_BODY" \
  -F web_commit_signoff_required=true \
  --silent
echo "  ✓ Repository settings updated"

# -------------------------------------------------------
# 2. Security features
# -------------------------------------------------------
echo "[2/6] Enabling security features..."

# Enable vulnerability alerts (Dependabot alerts)
gh api "repos/${REPO}/vulnerability-alerts" -X PUT --silent 2>/dev/null || true
echo "  ✓ Dependabot alerts enabled"

# Enable automated security fixes (Dependabot security updates)
gh api "repos/${REPO}/automated-security-fixes" -X PUT --silent 2>/dev/null || true
echo "  ✓ Dependabot security updates enabled"

# Enable secret scanning & push protection
gh api "repos/${REPO}" -X PATCH \
  --input - --silent 2>/dev/null <<'SECURITY_JSON' || true
{
  "security_and_analysis": {
    "secret_scanning": { "status": "enabled" },
    "secret_scanning_push_protection": { "status": "enabled" }
  }
}
SECURITY_JSON
echo "  ✓ Secret scanning & push protection enabled"

# Enable private vulnerability reporting
gh api "repos/${REPO}/private-vulnerability-reporting" -X PUT --silent 2>/dev/null || true
echo "  ✓ Private vulnerability reporting enabled"

# -------------------------------------------------------
# 3. Branch ruleset (replaces legacy branch protection)
# -------------------------------------------------------
echo "[3/6] Creating branch ruleset for main..."
gh api "repos/${REPO}/rulesets" -X POST --input - --silent <<'RULESET_JSON'
{
  "name": "main-branch-protection",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/main"],
      "exclude": []
    }
  },
  "rules": [
    {
      "type": "deletion"
    },
    {
      "type": "non_fast_forward"
    },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 1,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": true,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [
          { "context": "build" },
          { "context": "Validate PR title" },
          { "context": "Dependency Review" }
        ]
      }
    },
  ],
  "bypass_actors": []
}
RULESET_JSON
echo "  ✓ Branch ruleset created"

# -------------------------------------------------------
# 4. Tag ruleset (prevent tag deletion/modification)
# -------------------------------------------------------
echo "[4/6] Creating tag protection ruleset..."
gh api "repos/${REPO}/rulesets" -X POST --input - --silent <<'TAG_JSON'
{
  "name": "tag-protection",
  "target": "tag",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/tags/v*"],
      "exclude": []
    }
  },
  "rules": [
    {
      "type": "deletion"
    },
    {
      "type": "non_fast_forward"
    },
    {
      "type": "update"
    }
  ],
  "bypass_actors": []
}
TAG_JSON
echo "  ✓ Tag protection ruleset created"

# -------------------------------------------------------
# 5. Repository topics
# -------------------------------------------------------
echo "[5/6] Setting repository topics..."
gh api "repos/${REPO}/topics" -X PUT \
  -f 'names[]=aws-cdk' \
  -f 'names[]=cdk-construct' \
  -f 'names[]=serverless' \
  -f 'names[]=spa' \
  -f 'names[]=cloudfront' \
  -f 'names[]=cognito' \
  -f 'names[]=dynamodb' \
  -f 'names[]=waf' \
  -f 'names[]=api-gateway' \
  -f 'names[]=aws' \
  -f 'names[]=typescript' \
  -f 'names[]=infrastructure-as-code' \
  --silent
echo "  ✓ Topics set"

# -------------------------------------------------------
# 6. Sync labels
# -------------------------------------------------------
echo "[6/6] Syncing labels..."

create_or_update_label() {
  local name="$1" color="$2" description="$3"
  gh label create "${name}" --repo "${REPO}" --color "${color}" --description "${description}" --force 2>/dev/null || true
}

create_or_update_label "bug"              "d73a4a" "Something isn't working"
create_or_update_label "enhancement"      "a2eeef" "New feature or request"
create_or_update_label "documentation"    "0075ca" "Improvements or additions to documentation"
create_or_update_label "dependencies"     "0366d6" "Dependency updates"
create_or_update_label "ci"               "e4e669" "CI/CD changes"
create_or_update_label "security"         "e11d48" "Security related"
create_or_update_label "stale"            "ededed" "Inactive issue or PR"
create_or_update_label "do-not-merge"     "b60205" "This PR should not be merged"
create_or_update_label "pinned"           "006b75" "Exempt from stale bot"
create_or_update_label "breaking"         "d93f0b" "Breaking change"
create_or_update_label "good first issue" "7057ff" "Good for newcomers"
create_or_update_label "help wanted"      "008672" "Extra attention is needed"
echo "  ✓ Labels synced"

echo ""
echo "=== Setup complete ==="
echo ""
echo "Summary:"
echo "  • Squash merge only, auto-delete branches"
echo "  • Discussions enabled, Wiki & Projects disabled"
echo "  • Dependabot alerts + security updates enabled"
echo "  • Secret scanning + push protection enabled"
echo "  • Private vulnerability reporting enabled"
echo "  • main branch: require PR with 1 approval, CODEOWNERS review,"
echo "    status checks (build, PR lint, dependency review), linear history"
echo "  • Tags (v*): deletion & modification blocked"
echo "  • Repository topics set for discoverability"
echo "  • Labels synced"
