---
sidebar_position: 4
---

# Formulus App Setup

Build and run the Formulus Android app on a physical device or emulator.

## Prerequisites

Before starting, ensure:

- [ ] Android device connected via USB (or emulator running)
- [ ] USB debugging enabled on device
- [ ] ADB recognizes your device
- [ ] Server is running (see [Synkronus Server Setup](/docs/quick-start/synkronus-server))

## Step 1: Verify Device Connection

Check that your device is recognized:

```bash
adb devices
```

**Expected output:**

```
List of devices attached
YCYNW18209009206        device
```

If no devices appear:

1. Enable **Developer Options** on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times

2. Enable **USB Debugging**:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

3. Accept the USB debugging prompt on your device

4. Try again:

   ```bash
   adb devices
   ```

## Step 2: Navigate to Formulus Directory

```bash
cd formulus
```

## Step 3: Start Metro Bundler (Optional but Recommended)

In a separate terminal, start the Metro bundler:

```bash
cd formulus
npm start
```

Keep this terminal open. Metro is the JavaScript bundler for React Native.

**Alternative:** Metro will start automatically when you run the app, but starting it manually gives you better control.

## Step 4: Build and Run Android App

Build and install the app on your connected device:

```bash
npm run android
```

**What this does:**

1. Compiles the Android app
2. Builds the APK
3. Installs it on your device
4. Starts the app
5. Connects to Metro bundler

**Expected output:**

```
> formulus-app@0.0.1 android
> react-native run-android

info Installing the app...
...
Installing APK 'formulus-v1.0-1-debug-20251211.apk' on 'FIG-LX1 - 8.0.0' for :app:debug
Installed on 1 device.
info Connecting to the development server...
info Starting the app on "YCYNW18209009206"...
```

## Step 5: Verify App is Running

The app should automatically open on your device. You should see:

- Formulus splash screen
- Main app interface
- No connection errors (yet - we'll configure the server next)

## Building for Different Scenarios

### Build Only (Don't Install)

```bash
cd formulus/android
./gradlew assembleDebug
```

The APK will be at:

```
formulus/android/app/build/outputs/apk/debug/formulus-v1.0-1-debug-YYYYMMDD.apk
```

### Install on Specific Device

```bash
adb -s DEVICE_ID install -r path/to/app.apk
```

### Run on Emulator

```bash
# Start emulator first
emulator -avd YOUR_AVD_NAME

# Then run
npm run android
```

## Development Workflow

### Hot Reload

The app supports Fast Refresh. When you save a file:

- **JavaScript changes** - Automatically reload
- **Native changes** - Require app restart

### Reload Manually

- **Shake device** → Select "Reload"
- **Or** Press `R` twice in Metro terminal
- **Or** Press `Ctrl+M` (Windows/Linux) or `Cmd+M` (Mac) → Select "Reload"

### Debug Menu

Access the developer menu:

- **Shake device**
- **Or** `adb shell input keyevent 82` (Menu key)
- **Or** `Ctrl+M` / `Cmd+M`

## Configuring the App

### Option A: Scan QR Code (Recommended)

1. **Generate QR code** using Synkronus CLI (see [QR Code Login](/docs/components/formulus/configuration#qr-code-login))
2. **Open Formulus app** on your device
3. **Tap "Scan QR Code"** on the welcome/settings screen
4. **Point camera** at the QR code
5. **Settings auto-populate** - Server URL, username, password
6. **Tap "Connect"** to verify and save

### Option B: Manual Configuration

1. **Open Formulus app**
2. **Go to Settings** (gear icon or menu)
3. **Enter Server URL**: `http://YOUR_SERVER_IP` (e.g., `http://192.168.100.7`)
4. **Enter Username**: Your username
5. **Enter Password**: Your password
6. **Tap "Test Connection"** to verify
7. **Tap "Save"**

**Important:** Use your computer's IP address (not `localhost`) since your Android device is on a different machine.

### Finding Your Server IP

```bash
# Linux
hostname -I | awk '{print $1}'

# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1
```

## Troubleshooting

### Issue: "No devices/emulators found"

**Solutions:**

```bash
# Restart ADB
adb kill-server
adb start-server

# Check devices
adb devices

# Verify USB debugging is enabled
```

### Issue: Build fails with lint errors

**Solution:** For development, you can skip lint:

```bash
cd formulus/android
./gradlew assembleDebug -x lintDebug -x lintRelease
```

### Issue: "Metro bundler not found"

**Solution:** Start Metro manually:

```bash
cd formulus
npm start
```

Then in another terminal:

```bash
npm run android
```

### Issue: App crashes on startup

**Check:**

1. Metro bundler is running
2. Device and computer are on the same network (for Metro)
3. Check device logs:

   ```bash
   adb logcat | grep -i "reactnative\|formulus"
   ```

### Issue: "Unable to resolve module"

**Solution:**

```bash
cd formulus
rm -rf node_modules
npm install
npm start -- --reset-cache
```

## Next Steps

Now that the app is running:

1. **Configure the server connection** (see above)
2. **Login** with your credentials
3. **Sync app bundle** to download forms
4. **Start collecting data!**

For more details, see:

- [Formulus Configuration](/docs/components/formulus/configuration)
- [Using Formulus App](/docs/components/formulus/features)
- [Troubleshooting](/docs/components/formulus/troubleshooting)
