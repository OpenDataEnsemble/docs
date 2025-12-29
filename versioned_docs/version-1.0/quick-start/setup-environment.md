---
sidebar_position: 2
---

# Setup Environment

Set up your development environment for ODE application development.

## Development Platforms

ODE app development can be done on Linux, macOS, or Windows (using WSL2).

## Step 1: Clone the Repository

### Fork the Repository

If you haven't already, fork the ODE repository on GitHub:

1. Navigate to [https://github.com/OpenDataEnsemble/ode](https://github.com/OpenDataEnsemble/ode)
2. Click the "Fork" button in the top-right corner
3. Wait for the fork to complete

### Clone Your Fork

Clone your fork to your local machine:

```bash
# Navigate to your workspace directory
cd ~/Desktop/ode-workspace

# Clone your fork (replace YOUR_USERNAME with your GitHub username)
git clone https://github.com/YOUR_USERNAME/ode.git

# Navigate into the repository
cd ode
```

### Configure Git Remotes

Add the original repository as an upstream remote:

```bash
# Add upstream remote
git remote add upstream https://github.com/OpenDataEnsemble/ode.git

# Verify remotes
git remote -v
```

You should see:
```
origin    https://github.com/YOUR_USERNAME/ode.git (fetch)
origin    https://github.com/YOUR_USERNAME/ode.git (push)
upstream  https://github.com/OpenDataEnsemble/ode.git (fetch)
upstream  https://github.com/OpenDataEnsemble/ode.git (push)
```

### Verify Branch

Check which branch you're on (should be `dev`):

```bash
git branch
```

If you're on a different branch, switch to `dev`:

```bash
git checkout dev
```

## Step 2: Install Dependencies

ODE is a monorepo with multiple components requiring different dependency managers.

### Install Node.js Dependencies

#### Formulus (React Native App)

```bash
cd formulus
npm install
cd ..
```

#### Formulus Formplayer (React Web App)

```bash
cd formulus-formplayer
npm install
cd ..
```

#### Packages/Tokens (Design Tokens)

```bash
cd packages/tokens
npm install
cd ../..
```

### Install Go Dependencies

#### Synkronus (Go Server)

```bash
cd synkronus
go mod download
cd ..
```

#### Synkronus CLI (Go CLI Tool)

```bash
cd synkronus-cli
go mod download
cd ..
```

### Generate Formulus Files

The Formulus app requires generated files for WebView integration:

```bash
cd formulus
npm run generate
cd ..
```

**Expected output:**

```
✅ Successfully generated injection script at ...
✅ Successfully generated JSDoc interface at ...
```

## Step 3: Verify Installation

### Verify Node.js Dependencies

```bash
# Check formulus
cd formulus
npm list --depth=0 | head -10
cd ..

# Check formulus-formplayer
cd formulus-formplayer
npm list --depth=0 | head -10
cd ..
```

### Verify Go Dependencies

```bash
# Verify synkronus
cd synkronus
go mod verify
cd ..

# Verify synkronus-cli
cd synkronus-cli
go mod verify
cd ..
```

**Expected output:**

```
all modules verified
```

### Verify Generated Files

```bash
ls -la formulus/assets/webview/
```

You should see:
- `FormulusInjectionScript.js`
- `formulus-api.js`
- `formulus-load.js`
- `placeholder_app.html`

## Complete Setup Script

For convenience, here's a complete setup script:

```bash
#!/bin/bash
# Navigate to repository root
cd /path/to/ode-workspace/ode

# Node.js dependencies
echo "Installing Node.js dependencies..."
cd formulus && npm install && cd ..
cd formulus-formplayer && npm install && cd ..
cd packages/tokens && npm install && cd ../..

# Go dependencies
echo "Installing Go dependencies..."
cd synkronus && go mod download && cd ..
cd synkronus-cli && go mod download && cd ..

# Generate formulus files
echo "Generating formulus files..."
cd formulus && npm run generate && cd ..

echo "✅ Environment setup complete!"
```

## Repository Structure

After cloning, your repository structure will look like:

```
ode/
├── formulus/              # React Native mobile app
├── formulus-formplayer/   # React web app
├── synkronus/             # Go API server
├── synkronus-cli/         # Go CLI tool
├── packages/              # Shared packages
│   └── tokens/            # Design tokens
└── README.md              # Main README
```

## Troubleshooting

### Issue: npm install fails

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: go mod download fails

**Solutions:**

```bash
# Check Go version
go version  # Should be 1.22+

# Set GOPROXY if needed
export GOPROXY=https://proxy.golang.org,direct

# Try again
go mod download
```

### Issue: npm run generate fails

**Solutions:**

```bash
# Reinstall formulus dependencies
cd formulus
rm -rf node_modules package-lock.json
npm install
npm run generate
```

## Next Steps

Once your environment is set up:

1. **Proceed to** [Synkronus Server Setup](/docs/quick-start/synkronus-server) to configure Docker and the database
2. **Or** continue with [Deploy Local Instance](/docs/quick-start/deploy-local-instance)

