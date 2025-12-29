---
sidebar_position: 1
---

# ODE Formulus

Formulus is an offline-first mobile app available for Android and iOS that enables seamless data collection in environments with limited connectivity. It allows users to collect data offline and synchronize it with a `synkronus` server when connectivity is restored. The app also displays your custom application as the main entry point, providing a tailored user experience.

## Installation

:::caution Early Development Phase
Formulus is currently in early development. The app is only available for Android and requires installation via Android Debug Bridge (adb).
:::

You can download the latest version from the GitHub releases page (available after the first alpha release) and install it on your Android device using the following command:

```bash
adb install formulus.apk
```

**System Requirements:**
- Android 7.0 (API level 24) or higher
- Developer options enabled on your device
- USB debugging enabled

We are actively working to make the app available through official app stores for both Android and iOS platforms.

## Usage

### Initial Setup

When you first launch Formulus, you'll be prompted to connect to your `synkronus` server:

1. **Server Configuration**: Enter your server URL and credentials
2. **Authentication**: Log in with the username and password you created in your synkronus instance
3. **Synchronization**: The app will download your custom application specification, including:
   - Form definitions and schemas
   - UI render packs (powered by [jsonforms](https://jsonforms.io/))
   - Custom styling and branding

### Main Interface

Once authenticated, Formulus displays your custom application as the primary interface, providing seamless access to your data collection workflows.

## Key Features

Formulus serves as a comprehensive wrapper around your custom application, providing essential mobile data collection capabilities:

- **Offline-First Architecture**: Collect data without internet connectivity
- **Automatic Synchronization**: Seamlessly sync with your `synkronus` server when online
- **Advanced Form Rendering**: Powered by jsonforms with support for:
  - Native device features (camera, GPS, file storage)
  - Rich input types and validation
  - Custom UI components
- **Robust Data Management**: Secure local storage with conflict resolution
- **Cross-Platform Compatibility**: Consistent experience across Android and iOS

## Using Formulus without a Custom App

:::warning Alpha Feature
This feature is currently in alpha development and may be unstable. Use with caution in production environments.
:::

Formulus can operate in standalone mode without requiring a custom application. To use this feature:

1. **Download and Install**: Follow the installation instructions above
2. **Server Connection**: Log in directly to your `synkronus` server using your credentials
3. **Form Access**: Formulus will automatically display a list of all forms available in your synkronus instance

This mode is ideal for:
- **Quick prototyping** and testing form designs
- **Simple data collection** workflows that don't require custom UI
- **Getting started** with ODE before developing a full custom application
