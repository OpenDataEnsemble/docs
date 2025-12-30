---
sidebar_position: 3
---

# Formulus Configuration

Configure Formulus to connect to your Synkronus server.

## Overview

Formulus can be configured to connect to your Synkronus server in two ways:

1. **QR Code Scan** (Recommended) - Quick and easy configuration
2. **Manual Entry** - Enter server details manually

## QR Code Login

The easiest way to configure Formulus is by scanning a QR code that contains all server connection details.

### Prerequisites

- [ ] Synkronus CLI installed and configured (see [CLI Installation](/docs/components/synkronus-cli/installation))
- [ ] Logged in to the server via CLI
- [ ] Know your server's network IP address

### Finding Your Server IP

The mobile app needs to connect over the network, so you need your computer's IP address:

```bash
# Linux
hostname -I | awk '{print $1}'

# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1
```

**Example output:**

```
192.168.100.7
```

**Important:** Use this IP address (not `localhost`) in the QR code.

### Generating a QR Code

#### Interactive Mode

Run the QR command and follow the prompts:

```bash
cd synkronus-cli
./bin/synk qr
```

**Prompts:**

```
Server URL [http://localhost]: http://192.168.100.7
Username [admin]: admin
Password: [enter password]
✓ QR code generated successfully
Output file: 192.168.100.7.png
```

#### With Custom Output File

Specify the output filename:

```bash
./bin/synk qr -o formulus-login-qr.png
```

#### Non-Interactive Mode

Pipe values for automation:

```bash
echo -e "http://192.168.100.7\nadmin\nPassword" | ./bin/synk qr -o login-qr.png
```

### Using the QR Code

1. **Open Formulus app** on your device
2. **Go to Settings** (or first-run setup)
3. **Tap "Scan QR Code"** button
4. **Point camera at QR code**
5. **Settings auto-populate**
6. **Tap "Save" or "Connect"**

### QR Code Contents

The QR code encodes settings in **FRMLS format** (Formulus Markup Language Settings):

```
FRMLS:v:<base64(version)>;s:<base64(serverUrl)>;u:<base64(username)>;p:<base64(password)>;;
```

**What gets configured:**

- Server URL
- Username
- Password

The app will automatically:
- Test the connection
- Login with credentials
- Download the app bundle
- Sync available forms

### Creating QR Codes for Multiple Users

```bash
# Create user first
./bin/synk user create

# Generate QR for each user
echo -e "http://192.168.100.7\nfieldworker1\nPassword1" | ./bin/synk qr -o fieldworker1-qr.png
echo -e "http://192.168.100.7\nsupervisor1\nPassword2" | ./bin/synk qr -o supervisor1-qr.png
```

## Manual Configuration

If you prefer to configure manually or QR code scanning isn't available:

### Step 1: Open Settings

1. **Open Formulus app**
2. **Go to Settings** (gear icon or menu)

### Step 2: Enter Server Details

1. **Server URL**: `http://YOUR_SERVER_IP` (e.g., `http://192.168.100.7`)
2. **Username**: Your username
3. **Password**: Your password

**Important:** Use your computer's IP address (not `localhost`) since your Android device is on a different machine.

### Step 3: Test Connection

1. **Tap "Test Connection"** to verify
2. **Should see** "Connection successful" message

### Step 4: Save Settings

1. **Tap "Save"**
2. **Settings are stored** locally on device

## Server Connection

### Connection Requirements

- Device and server on **same network** (Wi-Fi)
- Server **running and accessible**
- **Port 80** not blocked by firewall
- **Correct IP address** (not localhost)

### Testing Connection

From your computer, test server accessibility:

```bash
# Test from computer
curl http://YOUR_IP/health

# Should return: OK
```

### Troubleshooting Connection

**Issue: "Connection failed"**

**Check:**

1. Server URL is correct (use IP, not localhost)
2. Device has network access
3. Server is running
4. Same network as server

**Solution:**

```bash
# Verify server is running
cd synkronus
docker compose ps

# Test server from device network
curl http://YOUR_IP/health
```

## Authentication

### Login Process

After configuration:

1. **Navigate to Login screen** (if not automatic)
2. **Credentials should be pre-filled** (from QR or manual entry)
3. **Tap "Login"**
4. **Wait for authentication** - Token is stored locally

**Success indicators:**
- ✅ "Login successful" message
- ✅ Redirected to home/dashboard
- ✅ User info displayed

### Token Management

- Tokens are **stored locally** on device
- Tokens **auto-refresh** when expired
- **Logout** clears tokens

### Changing Credentials

1. **Go to Settings**
2. **Update username/password**
3. **Test connection**
4. **Save**
5. **Login again** with new credentials

## Sync Settings

### Auto-Sync

Configure automatic synchronization:

- **Enable/disable** auto-sync
- **Sync on WiFi only** - Save mobile data
- **Sync interval** - How often to sync

### Manual Sync

1. **Go to Sync screen**
2. **Tap "Sync Now"**
3. **Watch progress** - Upload count, status

### Sync Process

1. **Pull** - Download new forms and server data
2. **Push** - Upload pending observations
3. **Attachments** - Upload photos, audio, etc.
4. **Confirmation** - Server acknowledges receipt

## Best Practices

### Security

1. **Don't share QR codes publicly** - They contain credentials
2. **Use strong passwords** - QR codes encode the actual password
3. **Rotate credentials** - Generate new QR codes when passwords change
4. **Delete old QR images** - Remove from disk after distribution

### Distribution

- **Print for field workers** - Physical handout
- **Email securely** - Encrypted or password-protected
- **Display on screen** - For immediate scanning
- **Internal documentation** - For team reference

### Naming Conventions

Use descriptive filenames for QR codes:

```bash
# Include environment
./bin/synk qr -o production-login.png
./bin/synk qr -o staging-login.png

# Include user role
./bin/synk qr -o fieldworker-login.png
./bin/synk qr -o supervisor-login.png
```

## Troubleshooting

### Issue: QR code won't scan

**Possible causes:**
- Image too small
- Poor lighting
- Damaged/blurry print

**Solutions:**
- Display larger on screen
- Improve lighting
- Reprint at higher quality

### Issue: "Invalid QR code" error

**Possible causes:**
- QR contains wrong format
- Corrupted image

**Solution:**
- Regenerate the QR code
- Verify with a QR reader app first

### Issue: Settings won't save

**Check:**

1. All fields filled correctly
2. Connection test successful
3. App has storage permission

**Solution:**

1. Test connection first
2. Save settings
3. Restart app
4. Verify settings persisted

## Related Content

- [Formulus Installation](/docs/components/formulus/installation)
- [Formulus Features](/docs/components/formulus/features)
- [Synkronus CLI Installation](/docs/components/synkronus-cli/installation)
- [Troubleshooting](/docs/components/formulus/troubleshooting)
