# Contributing

Thank you for your interest in contributing to `serverless-spa-construct`.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/serverless-spa-construct.git`
3. Install dependencies: `yarn install`
4. Create a branch: `git checkout -b feat/my-feature`

## Development

This project uses [projen](https://projen.io/) to manage project configuration. Do not edit generated files directly.

```bash
# Build the project
npx projen build

# Run tests
npx projen test

# Lint
npx projen eslint

# Generate API docs
npx projen docgen
```

### Project structure

- `src/constructs/` — CDK construct source code
- `src/lambda/` — Lambda function handlers
- `test/` — Unit tests
- `.projenrc.ts` — Project configuration (edit this instead of package.json, tsconfig, etc.)

## Pull Request Process

1. Ensure your code passes all checks: `npx projen build`
2. Write or update tests for your changes
3. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
   - `feat: add new feature`
   - `fix: resolve bug`
   - `chore: update dependencies`
4. Open a PR against `main`
5. Fill out the PR template

## Code Style

- Code is formatted with Prettier and linted with ESLint (enforced via pre-commit hooks)
- Follow existing patterns in the codebase
- Use CDK best practices (enforced by `eslint-plugin-cdk`)

## Reporting Issues

- Use the [bug report template](https://github.com/kawaaas/serverless-spa-construct/issues/new?template=bug_report.yml) for bugs
- Use the [feature request template](https://github.com/kawaaas/serverless-spa-construct/issues/new?template=feature_request.yml) for enhancements

## License

By contributing, you agree that your contributions will be licensed under the [Apache-2.0 License](LICENSE).
