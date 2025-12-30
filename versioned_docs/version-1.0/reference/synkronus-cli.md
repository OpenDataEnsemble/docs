---
sidebar_position: 7
---

# Synkronus CLI Reference

Complete technical reference for the Synkronus command-line interface tool.

## Overview

Synkronus CLI (`synk`) is a command-line utility for interacting with the Synkronus API. It provides functionality for authentication, data synchronization, app bundle management, user administration, and data export.

## Installation

### From Source

```bash
go install github.com/OpenDataEnsemble/ode/synkronus-cli/cmd/synkronus@latest
```

### Build from Source

```bash
git clone https://github.com/OpenDataEnsemble/ode.git
cd ode/synkronus-cli
go build -o bin/synk ./cmd/synkronus
```

### Verify Installation

```bash
synk --version
```

## Configuration

### Configuration File

The CLI uses a YAML configuration file located at `$HOME/.synkronus.yaml` by default.

**Example configuration:**

```yaml
api:
  url: http://localhost:8080
  version: 1.0.0
```

### Multiple Endpoints

You can manage multiple server endpoints:

```bash
# Create separate config files
synk config init -o ~/.synkronus-dev.yaml
synk config init -o ~/.synkronus-prod.yaml

# Set default config
synk config use ~/.synkronus-dev.yaml

# Override for single command
synk --config ~/.synkronus-prod.yaml status
```

### Configuration Commands

#### Initialize Config

```bash
synk config init -o ~/.synkronus.yaml
```

#### Use Config

```bash
synk config use ~/.synkronus.yaml
```

#### Show Current Config

```bash
synk config show
```

## Authentication

### Login

Authenticate with the Synkronus server:

```bash
synk login --username your-username
```

The CLI will prompt for password interactively. Authentication tokens are stored in the configuration file.

### Check Status

Verify authentication status:

```bash
synk status
```

**Output:**
```
Authenticated as: your-username
Server: http://localhost:8080
API Version: 1.0.0
Token expires: 2025-01-15 10:30:00
```

### Logout

Clear authentication:

```bash
synk logout
```

## App Bundle Management

### List Versions

List all available app bundle versions:

```bash
synk app-bundle versions
```

**Output:**
```
Available app bundle versions:
  20250114-123456 * (current)
  20250113-120000
  20250112-110000
```

### Get Manifest

Get the current app bundle manifest:

```bash
synk app-bundle manifest
```

### Download Bundle

Download the entire app bundle:

```bash
synk app-bundle download --output ./app-bundle
```

### Download Specific File

Download a specific file from the bundle:

```bash
synk app-bundle download index.html
synk app-bundle download assets/css/styles.css
```

### Upload Bundle

Upload a new app bundle (admin only):

```bash
synk app-bundle upload bundle.zip
```

**Options:**
- `--activate`: Automatically activate the uploaded bundle
- `--skip-validation`: Skip bundle validation (not recommended)
- `--verbose`: Show detailed output

**Example:**
```bash
synk app-bundle upload bundle.zip --activate --verbose
```

### Switch Version

Switch to a specific app bundle version (admin only):

```bash
synk app-bundle switch 20250114-123456
```

## Data Synchronization

### Pull Data

Pull data from the server:

```bash
synk sync pull output.json --client-id your-client-id
```

**Options:**
- `--client-id`: Client identifier (required)
- `--current-version`: Last known version number
- `--after-change-id`: Pull changes after specific change ID
- `--schema-types`: Filter by schema types (comma-separated)
- `--limit`: Maximum number of records to pull

**Examples:**
```bash
# Pull all data
synk sync pull data.json --client-id client-123

# Pull with filters
synk sync pull data.json --client-id client-123 \
  --after-change-id 1234 \
  --schema-types survey,visit \
  --limit 100
```

### Push Data

Push data to the server:

```bash
synk sync push data.json
```

The JSON file should contain observations in the sync format.

## Data Export

### Export Observations

Export all observations as a Parquet ZIP archive:

```bash
synk data export exports.zip
```

**Options:**
- `--output` or `-o`: Output file path
- `--format`: Export format (parquet, json, csv)

**Examples:**
```bash
# Export to Parquet ZIP
synk data export observations.zip

# Export to specific directory
synk data export ./backups/observations_20250114.zip

# Export to JSON
synk data export observations.json --format json
```

## User Management

### Create User

Create a new user (admin only):

```bash
synk user create --username newuser --password secret --role read-write
```

**Options:**
- `--username`: Username (required)
- `--password`: Password (required)
- `--role`: User role (read-only, read-write, admin)

### List Users

List all users:

```bash
synk user list
```

### Get User

Get user details:

```bash
synk user get username
```

### Update User

Update user information:

```bash
synk user update username --password newpassword --role read-write
```

### Delete User

Delete a user:

```bash
synk user delete username
```

## QR Code Generation

### Generate Login QR Code

Generate a QR code for Formulus app configuration:

```bash
synk qr login --output login-qr.png
```

**Options:**
- `--output` or `-o`: Output file path
- `--server-url`: Override server URL
- `--username`: Username to include
- `--password`: Password to include

### Generate Admin QR Code

Generate admin configuration QR code:

```bash
synk qr admin --output admin-qr.png
```

## Shell Completion

The CLI supports shell completion for bash, zsh, fish, and PowerShell.

<Tabs>
  <TabItem value="bash" label="Bash">

```bash
# Current session
source <(synk completion bash)

# Persistent (Linux)
sudo synk completion bash > /etc/bash_completion.d/synk

# Persistent (macOS)
synk completion bash > /usr/local/etc/bash_completion.d/synk
```

  </TabItem>
  <TabItem value="zsh" label="Zsh">

```bash
# Current session
source <(synk completion zsh)

# Persistent
echo "[[ \$commands[synk] ]] && synk completion zsh > \"\${fpath[1]}/_synk\"" >> ~/.zshrc
```

  </TabItem>
  <TabItem value="fish" label="Fish">

```bash
# Current session
synk completion fish | source

# Persistent
synk completion fish > ~/.config/fish/completions/synk.fish
```

  </TabItem>
  <TabItem value="powershell" label="PowerShell">

```powershell
# Current session
synk completion powershell | Out-String | Invoke-Expression

# Persistent (add to profile)
Add-Content -Path $PROFILE -Value "synk completion powershell | Out-String | Invoke-Expression"
```

  </TabItem>
</Tabs>

## Command Reference

### Global Flags

- `--config`: Specify configuration file
- `--verbose` or `-v`: Verbose output
- `--help` or `-h`: Show help
- `--version`: Show version

### Command Structure

```
synk [global-flags] <command> [command-flags] [arguments]
```

## Examples

### Complete Workflow

```bash
# 1. Configure CLI
synk config init -o ~/.synkronus.yaml

# 2. Login
synk login --username admin

# 3. Upload app bundle
synk app-bundle upload bundle.zip --activate

# 4. Create user
synk user create --username fieldworker --password secret --role read-write

# 5. Generate QR code for user
synk qr login --username fieldworker --password secret --output qr.png

# 6. Export data
synk data export observations.zip
```

### Development Workflow

```bash
# Switch to dev server
synk config use ~/.synkronus-dev.yaml

# Test sync
synk sync pull test.json --client-id test-client

# Upload test bundle
synk app-bundle upload test-bundle.zip --activate --verbose
```

## Error Handling

### Common Errors

**Authentication Failed:**
```
Error: authentication failed: invalid credentials
```
Solution: Verify username and password, check server is running

**Server Unreachable:**
```
Error: unable to connect to server
```
Solution: Check server URL, verify network connectivity

**Permission Denied:**
```
Error: permission denied: admin role required
```
Solution: Use admin account or request permissions

### Debug Mode

Enable verbose output for debugging:

```bash
synk --verbose <command>
```

## Best Practices

1. **Use Configuration Files**: Store server URLs and settings in config files
2. **Version Control**: Track app bundle versions carefully
3. **Backup Data**: Regularly export data using `synk data export`
4. **Test First**: Test commands on dev server before production
5. **Use Shell Completion**: Enable completion for better UX

## Related Documentation

- [Synkronus Server Reference](/reference/synkronus-server) - Server API documentation
- [App Bundle Format](/reference/app-bundle-format) - Bundle structure
- [API Reference](/reference/api) - Complete API documentation
- [Deployment Guide](/guides/deployment) - Server deployment

