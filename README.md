# ODE Website

This is the website for ODE. It is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Local Development

```bash
npm install
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Testing

**Always test your changes before pushing to avoid broken links and deployment failures.**

### Quick Validation (Recommended)

Run fast validation tests that catch most issues in seconds:

```bash
npm run test
```

This validates:
- All `docId` references in `docusaurus.config.ts` point to existing files
- Internal markdown links are valid
- Configuration paths are correct

### Full Validation

For complete validation, run the full build:

```bash
npm run build
```

Or run both tests and build:

```bash
npm run validate
```

### Pre-Push Hook

A pre-push hook automatically runs validation tests before you push. If tests fail, the push will be blocked. This helps catch issues early.

To skip the hook (not recommended):

```bash
git push --no-verify
```

⚠️ **Note:** Even if you skip the hook, CI will still validate your changes and block deployment if validation fails.

## Deployment

The website is deployed automatically using GitHub Actions when changes are pushed to the `main` branch. The deployment process:

1. Runs fast validation tests
2. Runs full Docusaurus build
3. Deploys to GitHub Pages (only if all checks pass)

Broken links or validation errors will prevent deployment.