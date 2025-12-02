---
sidebar_position: 1
title: "ADB Setup for Android Development"
---

# ADB Setup for Android Development

This guide will walk you through setting up Android Debug Bridge (ADB) on your development machine. ADB is a command-line tool that allows you to communicate with Android devices for debugging, installing apps, and accessing device features.

## What is ADB?

**Android Debug Bridge (ADB)** is a versatile command-line tool that lets you:
- Install and debug Android applications
- Access a Unix shell on your Android device
- Transfer files between your computer and device
- View device logs and system information
- Enable USB debugging and manage device connections

## Prerequisites

- An Android device (phone or tablet) running Android 4.0 or higher
- A USB cable to connect your device to your computer
- Administrator/sudo access on your development machine

## Installation

### macOS

#### Option 1: Using Homebrew (Recommended)

```bash
brew install android-platform-tools
```

#### Option 2: Manual Installation

1. Download the **Command Line Tools** from [Android Developer website](https://developer.android.com/studio#command-tools)
2. Extract the ZIP file to a location like `~/Library/Android/sdk`
3. Add ADB to your PATH by editing `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

4. Reload your shell configuration:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

### Windows

#### Option 1: Using Chocolatey

```powershell
choco install adb
```

#### Option 2: Using Scoop

```powershell
scoop install adb
```

#### Option 3: Manual Installation

1. Download the **Command Line Tools** from [Android Developer website](https://developer.android.com/studio#command-tools)
2. Extract the ZIP file to a location like `C:\Android\sdk`
3. Add ADB to your PATH:
   - Open **System Properties** > **Environment Variables**
   - Under **System Variables**, find and select **Path**, then click **Edit**
   - Click **New** and add: `C:\Android\sdk\platform-tools`
   - Click **OK** to save

4. Open a new Command Prompt or PowerShell window

### Linux

#### Option 1: Using Package Manager

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install android-tools-adb android-tools-fastboot
```

**Fedora:**
```bash
sudo dnf install android-tools
```

**Arch Linux:**
```bash
sudo pacman -S android-tools
```

#### Option 2: Manual Installation

1. Download the **Command Line Tools** from [Android Developer website](https://developer.android.com/studio#command-tools)
2. Extract the ZIP file to a location like `~/Android/sdk`
3. Add ADB to your PATH by editing `~/.bashrc` or `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

4. Reload your shell configuration:
```bash
source ~/.bashrc  # or source ~/.zshrc
```

## Verify Installation

After installation, verify that ADB is working correctly:

```bash
adb version
```

You should see output like:
```
Android Debug Bridge version 1.0.41
Version 33.0.3-8952118
```

## Setting Up Your Android Device

### Step 1: Enable Developer Options

1. Open **Settings** on your Android device
2. Navigate to **About phone** (or **About device**)
3. Find **Build number** and tap it **7 times**
4. You'll see a message saying "You are now a developer!"

### Step 2: Enable USB Debugging

1. Go back to **Settings**
2. Navigate to **Developer options** (usually under **System** or **Advanced**)
3. Enable **USB debugging**
4. If prompted, tap **OK** to confirm

### Step 3: Connect Your Device

1. Connect your Android device to your computer using a USB cable
2. On your device, you may see a prompt asking "Allow USB debugging?"
3. Check **"Always allow from this computer"** (optional but recommended)
4. Tap **OK**

### Step 4: Verify Connection

Run the following command to verify your device is connected:

```bash
adb devices
```

You should see output like:
```
List of devices attached
ABC123XYZ456    device
```

If you see `unauthorized` instead of `device`, you need to:
1. Check your device screen for the USB debugging authorization prompt
2. Tap **Allow** on the prompt
3. Run `adb devices` again

## Common ADB Commands

Here are some useful ADB commands for development:

### Check Connected Devices
```bash
adb devices
```

### Install an APK
```bash
adb install path/to/app.apk
```

### Install with Replace (upgrade existing app)
```bash
adb install -r path/to/app.apk
```

### Uninstall an App
```bash
adb uninstall com.example.package
```

### View Device Logs
```bash
adb logcat
```

### Filter Logs by Tag
```bash
adb logcat -s TAG_NAME
```

### Clear Logs
```bash
adb logcat -c
```

### Pull File from Device
```bash
adb pull /sdcard/file.txt ~/Desktop/
```

### Push File to Device
```bash
adb push ~/Desktop/file.txt /sdcard/
```

### Open Shell on Device
```bash
adb shell
```

### Reboot Device
```bash
adb reboot
```

### Reboot to Bootloader
```bash
adb reboot bootloader
```

## Troubleshooting

### Device Not Showing Up

**Issue:** `adb devices` shows no devices or shows `unauthorized`

**Solutions:**
1. **Check USB cable**: Try a different USB cable (some cables are charge-only)
2. **Check USB port**: Try a different USB port on your computer
3. **Check USB mode**: On your device, when connected, pull down the notification shade and ensure USB mode is set to **File Transfer** or **MTP** (not Charge only)
4. **Revoke USB debugging**: In Developer options, tap **Revoke USB debugging authorizations**, then reconnect
5. **Restart ADB server**:
   ```bash
   adb kill-server
   adb start-server
   adb devices
   ```

### macOS: "adb: command not found"

**Solution:** Make sure you've added ADB to your PATH and reloaded your shell:
```bash
echo 'export PATH=$PATH:$HOME/Library/Android/sdk/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

### Windows: "adb is not recognized"

**Solution:** 
1. Verify ADB is in your PATH by checking `C:\Android\sdk\platform-tools\adb.exe` exists
2. Open a **new** Command Prompt window (PATH changes require a new session)
3. Try the full path: `C:\Android\sdk\platform-tools\adb.exe devices`

### Linux: Permission Denied

**Solution:** Create a udev rule for your device:

1. Find your device's vendor ID:
   ```bash
   lsusb
   ```
   Look for your device and note the ID (e.g., `18d1:4ee2`)

2. Create a udev rule file:
   ```bash
   sudo nano /etc/udev/rules.d/51-android.rules
   ```

3. Add a line (replace `18d1` with your vendor ID):
   ```
   SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0664", GROUP="plugdev"
   ```

4. Set permissions:
   ```bash
   sudo chmod a+r /etc/udev/rules.d/51-android.rules
   sudo udevadm control --reload-rules
   sudo udevadm trigger
   ```

5. Add your user to the plugdev group:
   ```bash
   sudo usermod -aG plugdev $USER
   ```
   (You'll need to log out and back in for this to take effect)

### Device Shows as "Offline"

**Solutions:**
1. Disconnect and reconnect the USB cable
2. Restart ADB server:
   ```bash
   adb kill-server
   adb start-server
   ```
3. On your device, toggle **USB debugging** off and on again
4. Try a different USB cable or port

## Wireless ADB (Advanced)

For wireless debugging (Android 11+), you can connect via Wi-Fi:

1. Connect your device via USB first
2. Enable **Wireless debugging** in Developer options
3. Note the IP address and port shown
4. Run:
   ```bash
   adb connect IP_ADDRESS:PORT
   ```
5. You can now disconnect the USB cable

## Next Steps

Now that ADB is set up, you can:
- Install and test Android applications
- Debug apps using `adb logcat`
- Transfer files between your computer and device
- Access device shell for advanced operations

### Developing Formulus with React Native

Once ADB is configured and your Android device is connected, you can develop Formulus using React Native:

1. **Navigate to the Formulus folder** in your terminal:
   ```bash
   cd path/to/formulus
   ```

2. **Run the React Native app** on your connected Android device:
   ```bash
   npx react-native run-android
   ```
   This command will:
   - Build the React Native app
   - Install it on your connected Android device via ADB
   - Start the Metro bundler

3. **Enable Hot Reload** (optional): In a separate terminal window, start the Metro bundler:
   ```bash
   npx react-native start
   ```
   The app will automatically update (hot reload) whenever you modify the React Native code, just like a website would refresh in a browser.

**Note:** Make sure your device is connected and visible with `adb devices` before running the React Native commands.

### Other ODE Development Tasks

For ODE-specific development, you can now:
- Install Formulus APK files for testing
- View logs from Synkronus server interactions
- Debug custom applications built with ODE

## Additional Resources

- [Official ADB Documentation](https://developer.android.com/studio/command-line/adb)
- [Android Developer Guide](https://developer.android.com/studio)
- [USB Driver Installation (Windows)](https://developer.android.com/studio/run/oem-usb)

## Need Help?

If you encounter issues not covered here, please:
1. Check the [Android Developer Forums](https://developer.android.com/studio/intro/community)
2. Reach out to the ODE community at [hello@opendataensemble.org](mailto:hello@opendataensemble.org)

