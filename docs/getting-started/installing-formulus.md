---
sidebar_position: 4
---

# Installing Formulus App

Complete guide for installing the Formulus mobile application on Android devices.

## Overview

Formulus is available for Android devices through multiple installation methods. Choose the method that best fits your needs:

- **F-Droid** (Recommended for end users) - Official app store for free and open source Android apps
- **Direct APK** - Download and install the APK file directly
- **Development Build** - For developers who want to build from source

## System Requirements

Before installing, ensure your device meets these requirements:

| Requirement | Minimum |
|-------------|---------|
| **Android Version** | Android 7.0 (API level 24) or higher |
| **Storage Space** | 50 MB free space |
| **Internet Connection** | Required for initial setup and synchronization |
| **Permissions** | Camera, Storage, Location (for form features) |

## Installation Methods

### Method 1: F-Droid (Recommended)

F-Droid is the recommended installation method for end users. It provides automatic updates and ensures you're installing the official version.

#### Step 1: Install F-Droid

If you don't have F-Droid installed:

1. **Download F-Droid** from [f-droid.org](https://f-droid.org/)
2. **Enable installation from unknown sources**:
   - Go to Settings → Security → Unknown Sources
   - Enable the option for your browser or file manager
3. **Install F-Droid** by opening the downloaded APK file

#### Step 2: Add Formulus Repository

1. **Open F-Droid** on your device
2. **Navigate to Settings** → **Repositories**
3. **Tap the "+" button** to add a new repository
4. **Enter the Formulus repository URL** (provided by your organization)
5. **Tap "Add"** to save the repository

#### Step 3: Install Formulus

1. **Open F-Droid** on your device
2. **Navigate to the Updates tab** or search for "Formulus"
3. **Find Formulus** in the app list
4. **Tap on Formulus** to open the app details
5. **Tap "Install"** to begin installation
6. **Wait for installation** to complete
7. **Tap "Open"** to launch the app

#### Automatic Updates

Once installed via F-Droid, Formulus will automatically update when new versions are available:

1. **F-Droid checks for updates** periodically
2. **Notifications appear** when updates are available
3. **Tap the notification** or open F-Droid to update
4. **Updates install automatically** through F-Droid

### Method 2: Direct APK Installation

If F-Droid is not available or you prefer direct installation:

#### Step 1: Download the APK

1. **Download the latest APK** from the [releases page](https://github.com/OpenDataEnsemble/ode/releases)
2. **Save the file** to your device's Downloads folder

#### Step 2: Enable Unknown Sources

1. **Go to Settings** → **Security** (or **Apps** on newer Android versions)
2. **Enable "Install unknown apps"** or **"Unknown Sources"**
3. **Select your browser or file manager** and enable installation

#### Step 3: Install the APK

1. **Open your file manager** or Downloads app
2. **Navigate to the Downloads folder**
3. **Tap on the Formulus APK file**
4. **Review the permissions** requested by the app
5. **Tap "Install"** to begin installation
6. **Wait for installation** to complete
7. **Tap "Open"** to launch the app

### Method 3: Development Build

For developers who want to build and install from source, see the [Development Installation Guide](/development/formulus-development).

## Post-Installation Setup

After installing Formulus, you need to configure it to connect to your Synkronus server:

### Initial Configuration

1. **Open Formulus** on your device
2. **You'll see the welcome screen** with configuration options
3. **Choose your configuration method**:
   - **QR Code Scan** (Recommended) - Scan a QR code with server details
   - **Manual Entry** - Enter server URL and credentials manually

### QR Code Configuration

1. **Tap "Scan QR Code"** on the welcome screen
2. **Grant camera permission** if prompted
3. **Point the camera** at the QR code provided by your administrator
4. **Settings auto-populate** with server URL, username, and password
5. **Tap "Connect"** to verify and save the configuration

### Manual Configuration

1. **Tap "Manual Configuration"** on the welcome screen
2. **Enter Server URL**: `http://your-server-ip:8080` or `https://your-server-domain`
3. **Enter Username**: Your username provided by your administrator
4. **Enter Password**: Your password
5. **Tap "Test Connection"** to verify connectivity
6. **Tap "Save"** to store the configuration

### First Login

1. **After configuration**, you'll be prompted to log in
2. **Credentials should be pre-filled** (if using QR code)
3. **Tap "Login"** to authenticate
4. **Wait for authentication** - A token is stored locally for future sessions
5. **You'll be redirected** to the main app interface

## Verification

To verify that Formulus is installed correctly:

1. **Check app icon** appears in your app drawer
2. **Open the app** and verify it launches without errors
3. **Check Settings** to confirm server configuration is saved
4. **Test connection** by tapping "Test Connection" in Settings
5. **Verify login** by logging in with your credentials

## Troubleshooting Installation

### Installation Fails

**Problem**: APK installation fails with "App not installed" error.

**Solutions**:
- Ensure you have enough storage space (at least 50 MB free)
- Check that "Unknown Sources" is enabled for your file manager
- Try downloading the APK again (file may be corrupted)
- Ensure your device meets minimum Android version requirements (7.0+)

### App Crashes on Launch

**Problem**: Formulus crashes immediately after opening.

**Solutions**:
- Restart your device
- Clear app data: Settings → Apps → Formulus → Storage → Clear Data
- Uninstall and reinstall the app
- Check that your device has sufficient RAM available

### Cannot Connect to Server

**Problem**: App cannot connect to the Synkronus server.

**Solutions**:
- Verify server URL is correct (check for typos)
- Ensure device has internet connection
- Check that server is running and accessible
- Verify firewall settings aren't blocking the connection
- For local development, use `10.0.2.2` instead of `localhost` on Android emulator

### F-Droid Not Finding Updates

**Problem**: F-Droid doesn't show Formulus updates.

**Solutions**:
- Ensure the Formulus repository is added correctly
- Refresh F-Droid repositories: Settings → Repositories → Tap refresh
- Check that F-Droid has internet connection
- Verify repository URL is correct and accessible

## Updating Formulus

### Via F-Droid

Updates are automatic when using F-Droid:

1. **F-Droid checks for updates** automatically
2. **Notification appears** when updates are available
3. **Open F-Droid** and navigate to Updates tab
4. **Tap "Update"** next to Formulus
5. **Wait for download and installation**

### Via Direct APK

1. **Download the latest APK** from the releases page
2. **Install over existing installation** (no need to uninstall)
3. **App data is preserved** during update

## Uninstalling Formulus

To uninstall Formulus:

1. **Go to Settings** → **Apps** (or **Application Manager**)
2. **Find Formulus** in the app list
3. **Tap on Formulus**
4. **Tap "Uninstall"**
5. **Confirm uninstallation**

**Note**: Uninstalling will remove all local data, including:
- Saved observations (not yet synced)
- App configuration
- Cached app bundles
- Local database

**Important**: Ensure all data is synced to the server before uninstalling.

## Related Documentation

- [Formulus Features](/using/formulus-features) - Learn about app features and usage
- [Your First Form](/using/your-first-form) - Get started with data collection
- [Synchronization](/using/synchronization) - Understand how data syncs work
- [Development Installation](/development/formulus-development) - For developers building from source

