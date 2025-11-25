---
sidebar_position: 4
title: "Installing Formulus Pre-release (Android)"
---

# Installing Formulus Pre-release Android App

This guide will walk you through installing the pre-release version of the Formulus Android app using F-Droid and Obtainium. This method provides automatic updates and doesn't require a Google account.

## What You'll Need

### F-Droid
**F-Droid** is an open-source app store for Android that focuses on free and open-source software (FOSS). Unlike the Google Play Store, F-Droid:
- Doesn't require a Google account
- Respects your privacy (no tracking)
- Only hosts open-source applications
- Provides transparent app information and build processes

### Obtainium
**Obtainium** allows you to install and update apps directly from their source code repositories (like GitHub). Benefits include:
- Get updates directly from developers, often faster than app stores
- Access pre-release and beta versions
- No intermediary app store required
- Automatic update notifications
- Full control over which apps you track

## Installation Steps

### Step 1: Install F-Droid

1. Open your Android device's web browser and navigate to [f-droid.org](https://f-droid.org)
2. Tap the **"Download F-Droid"** button on the homepage
3. Once the APK file downloads, open it to begin installation
4. If prompted, enable **"Install from unknown sources"** or **"Install unknown apps"** for your browser in your device settings
5. Complete the F-Droid installation
6. Open F-Droid and let it update its repository list (this may take a few minutes on first launch)

<img src="/img/alpha-install/1_install_fdroid.png" alt="F-Droid in app store" width="50%" />

### Step 2: Install Obtainium

1. Open the **F-Droid** app
2. Tap the search icon and search for **"Obtainium"**

<img src="/img/alpha-install/2_fdroid_search_obtainium.png" alt="Search for Obtainium in F-Droid" width="50%" />

3. Select **Obtainium** from the search results
4. Tap **"Install"** and wait for the installation to complete

<img src="/img/alpha-install/3_fdroid_install_obtainium.png" alt="Install Obtainium" width="50%" />

5. Once installed, open **Obtainium**

<img src="/img/alpha-install/4_open_obtainium.png" alt="Open Obtainium" width="50%" />

### Step 3: Add Formulus to Obtainium

1. In Obtainium, tap the **"Add App"** button (usually a + icon)

<img src="/img/alpha-install/5_obtainium_empty.png" alt="Obtainium empty state" width="50%" />

2. In the app URL or search field, type: **`OpenDataEnsemble/ode`**
3. Obtainium will automatically detect the GitHub repository
4. **Enable pre-releases** by toggling the pre-release option (this is important to access the beta versions)
5. Tap **"Add"** or **"OK"** to confirm

<img src="/img/alpha-install/6_obtainium_add_app.png" alt="Add app in Obtainium" width="50%" />

6. Obtainium will fetch the latest pre-release version of Formulus

### Step 4: Install Formulus

1. Once Obtainium has added Formulus, tap on the Formulus entry in your app list
2. Tap the **"Install"** button

<img src="/img/alpha-install/7_app_added_install.png" alt="App added, ready to install" width="50%" />

3. Wait for the APK to download
4. When prompted, allow installation from Obtainium if needed

<img src="/img/alpha-install/8a_allow_install.png" alt="Allow installation" width="50%" />

5. Tap **"Install"** to install Formulus

<img src="/img/alpha-install/8b_install.png" alt="Install Formulus" width="50%" />

6. Once installed, you can launch Formulus directly from Obtainium or from your app drawer

<img src="/img/alpha-install/9_installed.png" alt="Formulus installed" width="50%" />

## First Launch

When you first open Formulus, you'll see the welcome screen. To get started, tap **"Settings"** to configure your server connection.

<img src="/img/alpha-install/X_formulus_welcome.png" alt="Formulus welcome screen" width="50%" />

## Keeping Formulus Updated

Obtainium will automatically check for new pre-release versions of Formulus. When an update is available:
1. You'll receive a notification from Obtainium
2. Open Obtainium and tap on Formulus
3. Tap **"Update"** to download and install the latest version

You can also manually check for updates by opening Obtainium and pulling down to refresh the app list.

## Troubleshooting

### Can't Install from Unknown Sources
If you're unable to install F-Droid or apps from Obtainium, you may need to enable installation from unknown sources:
- Go to **Settings** > **Security** (or **Apps**)
- Find and enable **"Install unknown apps"** or **"Unknown sources"**
- Grant permission for your browser (for F-Droid) and Obtainium

### F-Droid Repository Not Loading
If F-Droid's repository isn't loading:
- Ensure you have a stable internet connection
- Try force-closing and reopening F-Droid
- Go to **Settings** in F-Droid and tap **"Repositories"**, then pull down to refresh

### Obtainium Can't Find the App
Make sure you've typed the repository name correctly: **`OpenDataEnsemble/ode`**

If issues persist, you can try entering the full GitHub URL: **`https://github.com/OpenDataEnsemble/ode`**

## Need Help?

If you encounter any issues or have questions, please reach out to us at [hello@opendataensemble.org](mailto:hello@opendataensemble.org).
