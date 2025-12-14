---
sidebar_position: 4
---

# Deployment

Deploy custom applications to ODE by creating and uploading app bundles.

## What is an App Bundle?

An **app bundle** is a ZIP file containing:

- **`app/`** - Custom web application (HTML, JS, CSS)
- **`forms/`** - JSON form definitions (schema + UI)
- **`APP_INFO.json`** - Generated manifest (created by server)

The Formulus mobile app downloads and runs the app bundle, enabling customized data collection workflows.

## App Bundle Structure

```
bundle.zip
├── app/
│   ├── index.html          # Entry point
│   ├── config.json         # App configuration
│   ├── formulus-load.js    # Formulus bridge script
│   └── assets/
│       └── *.js, *.css     # Built assets
└── forms/
    ├── registration/
    │   ├── schema.json     # JSON Schema (draft-07)
    │   └── ui.json         # UI layout definition
    ├── visit/
    │   ├── schema.json
    │   └── ui.json
    └── result/
        ├── schema.json
        └── ui.json
```

## Prerequisites

- [ ] Synkronus CLI configured and logged in (see [CLI Installation](/docs/components/synkronus-cli/installation))
- [ ] Node.js installed (for building apps)
- [ ] Demo app or custom app ready

## Building an App Bundle

### Using the Demo Malaria Screening App

Navigate to the demo app:

```bash
cd /path/to/demos/demo_malaria_screening
```

#### Step 1: Install Dependencies

```bash
cd app
npm install
```

#### Step 2: Build the App

```bash
npm run build
```

**Output:** Built files in `../app-bundles/app/`

#### Step 3: Validate Forms (Optional)

```bash
npm run validate:forms
```

Checks:
- JSON Schema syntax
- UI schema format
- Field references

#### Step 4: Create the Bundle ZIP

```bash
npm run zip
```

**Output:**

```
Created zip: /path/to/demo_malaria_screening/app-bundles/bundle-v1.0.6.zip
```

### Bundle Contents Verification

Check what's in the bundle:

```bash
unzip -l app-bundles/bundle-v1.0.6.zip
```

**Expected output:**

```
Archive:  bundle-v1.0.6.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2025-12-11 19:39   app/assets/
   443314  2025-12-11 19:39   app/assets/index-f2c34314.js
      494  2025-12-11 19:39   app/config.json
     3327  2025-12-11 19:39   app/formulus-load.js
      470  2025-12-11 19:39   app/index.html
        0  2025-12-11 19:39   forms/registration/
     3371  2025-12-11 19:39   forms/registration/schema.json
     2430  2025-12-11 19:39   forms/registration/ui.json
     ...
```

## Uploading an App Bundle

### Basic Upload

```bash
cd synkronus-cli
./bin/synk app-bundle upload /path/to/bundle-v1.0.6.zip
```

### Upload with Auto-Activation

```bash
./bin/synk app-bundle upload /path/to/bundle-v1.0.6.zip --activate
```

### Upload with Verbose Output

```bash
./bin/synk app-bundle upload /path/to/bundle-v1.0.6.zip --activate --verbose
```

**Expected output:**

```
Validating bundle structure...
✓ Bundle structure is valid

Bundle Information:
  Size: 148328 bytes
  Files: 10
  Forms: 3
  Renderers: 0

Uploading bundle...
✓ App bundle uploaded successfully!
Version: 0001

Manifest:
  Version: 0001
  Hash: b0494d5cc7164221f1c6dd957b9e61ff...

Activating version 0001...
✓ Version 0001 activated successfully!
```

### Skip Validation (Not Recommended)

```bash
./bin/synk app-bundle upload bundle.zip --skip-validation
```

## Managing App Bundle Versions

### List Available Versions

```bash
./bin/synk app-bundle versions
```

**Output:**

```
Available App Bundle Versions:
- 0001 *
- 0002
```

The `*` indicates the currently active version.

### View Current Manifest

```bash
./bin/synk app-bundle manifest
```

**Output:**

```
App Bundle Manifest:
Version: 0001
Generated At: 2025-12-11T16:41:19Z
Hash: b0494d5cc7164221f1c6dd957b9e61ff...
Files: 11
  - APP_INFO.json (10640 bytes)
  - app/assets/index-f2c34314.js (443314 bytes)
  - app/config.json (494 bytes)
  - app/formulus-load.js (3327 bytes)
  - app/index.html (470 bytes)
... and 6 more files (use --all to show all)
```

### Show All Files

```bash
./bin/synk app-bundle manifest --all
```

### Switch Active Version

```bash
./bin/synk app-bundle switch 0002
```

**Output:**

```
✓ Version 0002 activated successfully!
```

### View Version Changes

```bash
./bin/synk app-bundle changes 0001 0002
```

## Downloading App Bundles

### Download Current Bundle

```bash
./bin/synk app-bundle download --output ./downloaded-bundle/
```

### Download Specific File

```bash
./bin/synk app-bundle download app/index.html
```

## Creating a Custom App Bundle

### Minimal Structure

```
my-bundle/
├── app/
│   ├── index.html
│   └── formulus-load.js
└── forms/
    └── myform/
        ├── schema.json
        └── ui.json
```

### Minimal index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <script src="formulus-load.js"></script>
</head>
<body>
  <h1>My Custom App</h1>
  <script>
    // Use Formulus API
    window.Formulus.showForm('myform');
  </script>
</body>
</html>
```

### Create ZIP

```bash
cd my-bundle
zip -r ../my-bundle.zip app/ forms/
```

### Upload

```bash
./bin/synk app-bundle upload my-bundle.zip --activate
```

## Best Practices

### Version Control

- Use semantic versioning in `package.json`
- Tag releases in Git
- Keep changelog of form changes

### Testing

- Test locally before uploading
- Validate forms: `npm run validate:forms`
- Test on actual device before production

### Deployment

- Upload to staging first
- Test with sample data
- Switch versions atomically
- Keep previous versions for rollback

### Form Design

- Keep forms focused and simple
- Use clear field labels
- Add validation rules
- Test on mobile devices

## Troubleshooting

### Issue: "Bundle structure is invalid"

**Check:**
- Bundle has `app/` directory
- Bundle has `forms/` directory (if using forms)
- `app/index.html` exists

### Issue: Upload fails with auth error

**Solution:**

```bash
./bin/synk status  # Check if logged in
./bin/synk login -u admin  # Re-login if needed
```

### Issue: Forms don't appear in app

**Check:**
- Form schema is valid JSON Schema draft-07
- UI schema references correct property paths
- Bundle was uploaded and activated

### Issue: App shows blank screen

**Check:**
- Use `HashRouter` not `BrowserRouter` (React apps)
- `formulus-load.js` is included
- No JavaScript errors (check device logs)

## Command Reference

| Command | Description |
|---------|-------------|
| `synk app-bundle upload FILE` | Upload bundle |
| `synk app-bundle upload FILE --activate` | Upload and activate |
| `synk app-bundle versions` | List versions |
| `synk app-bundle manifest` | Show manifest |
| `synk app-bundle switch VERSION` | Change active version |
| `synk app-bundle download` | Download bundle |
| `synk app-bundle changes V1 V2` | Compare versions |

## Related Content

- [Synkronus CLI Installation](/docs/components/synkronus-cli/installation)
- [Synkronus CLI Commands](/docs/components/synkronus-cli/commands-reference)
- [App Bundle API](/docs/reference/rest-api/app-bundle)
- [App Bundle Structure](/docs/build/custom-applications/app-bundle-structure)
- [Building Custom Apps](/docs/build/custom-applications/building)
