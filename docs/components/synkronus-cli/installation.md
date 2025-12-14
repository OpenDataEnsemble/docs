---
sidebar_position: 2
---

# Synkronus CLI Installation

Build and configure the Synkronus CLI tool for server management and mobile app configuration.

## What is Synkronus CLI?

The Synkronus CLI (`synk`) is a command-line tool for:

- **Authentication** - Login/logout and token management
- **App Bundle Management** - Upload, download, and manage app bundles
- **QR Code Generation** - Create QR codes for mobile app login
- **User Management** - Create and manage users (admin)
- **Data Sync** - Push and pull observation data
- **Data Export** - Export data as Parquet archives

## Prerequisites

Before starting, ensure:

- [ ] Go 1.22+ installed
- [ ] Synkronus server running (see [Synkronus Server Setup](/docs/quick-start/synkronus-server))
- [ ] Admin credentials available

## Step 1: Build the CLI

Navigate to the synkronus-cli directory and build:

```bash
cd synkronus-cli
go build -o bin/synk ./cmd/synkronus
```

**Verify the build:**

```bash
./bin/synk --help
```

**Expected output:**

```
NAME
  synk - Synkronus CLI - A command-line interface for the Synkronus API

COMMANDS
  app-bundle    Manage app bundles
  attachments   Manage file attachments
  completion    Generate shell completion script
  config        Manage CLI configuration
  data          Data-related operations
  health        Check the health of the Synkronus API
  login         Login to the Synkronus API
  logout        Logout from the Synkronus API
  qr            Generate a QR code image for configuring Formulus
  status        Show authentication status
  sync          Sync data with the server
  user          Manage Synkronus users (admin only)
  version       Print version information
```

## Step 2: Initialize Configuration

Create the default configuration file:

```bash
./bin/synk config init -f
```

**Output:**

```
Configuration file created at /home/username/.synkronus.yaml
```

## Step 3: Configure API URL

Set the server URL to point to your nginx proxy:

```bash
# For local CLI usage (same machine as server)
./bin/synk config set api.url http://localhost

# OR for network access (use your IP)
./bin/synk config set api.url http://192.168.100.7
```

**Verify configuration:**

```bash
./bin/synk config view
```

**Expected output:**

```
Current Configuration:
api:
    url: http://localhost
    version: 1.0.0
auth:
    token: ""

Config file: /home/username/.synkronus.yaml
```

## Step 4: Login to the Server

### Interactive Login (Recommended)

```bash
./bin/synk login -u admin
```

Enter your password when prompted (input is hidden for security).

### Manual Token Setup (Alternative)

If interactive login isn't available, authenticate via API:

```bash
# Get token from API
curl -s -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Password"}'
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": 1765557228
}
```

Set the tokens manually:

```bash
./bin/synk config set auth.token "YOUR_TOKEN"
./bin/synk config set auth.refresh_token "YOUR_REFRESH_TOKEN"
./bin/synk config set auth.expires_at YOUR_EXPIRES_AT
```

## Step 5: Verify Authentication

Check your login status:

```bash
./bin/synk status
```

**Expected output:**

```
Configuration
Config file: /home/username/.synkronus.yaml
API endpoint: http://localhost

Authentication Status
Username: admin
Role: admin
Expires at: 2025-12-12 19:33:48 +0300 EAT
```

## Step 6: Check Server Health

Verify server connectivity:

```bash
./bin/synk health
```

```bash
./bin/synk version
```

**Expected output:**

```
CLI Version
Version: v0.2.0

Server Version
Server version: dev
Database: postgresql PostgreSQL 17.x
System: linux/amd64 (4 CPUs)
```

## Configuration File

The CLI stores configuration at `~/.synkronus.yaml`:

```yaml
api:
  url: http://localhost
  version: 1.0.0
auth:
  token: "eyJhbGciOiJIUzI1NiIs..."
  refresh_token: "eyJhbGciOiJIUzI1NiIs..."
  expires_at: 1765557228
```

### Multiple Server Configurations

You can manage multiple server configurations:

```bash
# Create separate configs
./bin/synk config init -o ~/.synkronus-dev.yaml
./bin/synk config init -o ~/.synkronus-prod.yaml

# Switch between configs
./bin/synk config use ~/.synkronus-dev.yaml
./bin/synk config use ~/.synkronus-prod.yaml

# Use temporarily for one command
./bin/synk --config ~/.synkronus-prod.yaml status
```

## Shell Completion

Enable tab completion for your shell:

### Bash

```bash
# Current session
source <(./bin/synk completion bash)

# Permanent (Linux)
sudo ./bin/synk completion bash > /etc/bash_completion.d/synk
```

### Zsh

```bash
source <(./bin/synk completion zsh)
```

### Fish

```bash
./bin/synk completion fish | source
```

## Troubleshooting

### Issue: "no valid token available"

**Solution:** Login again or set tokens manually:

```bash
./bin/synk login -u admin
```

### Issue: "connection refused"

**Solution:** Check server is running:

```bash
docker compose ps
curl http://localhost/health
```

### Issue: CLI not found

**Solution:** Use full path or add to PATH:

```bash
# Use full path
./bin/synk status

# Or add to PATH
export PATH=$PATH:/path/to/synkronus-cli/bin
```

## Next Steps

- Continue to [Commands Reference](/docs/components/synkronus-cli/commands-reference) for all available commands
- Learn about [QR Code Generation](/docs/components/formulus/configuration#qr-code-login) for mobile app configuration
- See [App Bundle Management](/docs/build/custom-applications/deployment) for deploying apps

## Related Content

- [Commands Reference](/docs/components/synkronus-cli/commands-reference)
- [Synkronus CLI Documentation](/docs/documentation/synkronus-cli/cli)
- [Formulus Configuration](/docs/components/formulus/configuration)
