---
sidebar_position: 4
---

# App Bundle Format

Technical specification for ODE app bundle format.

## Overview

App bundles are ZIP archives containing custom application files, form specifications, and configuration. They are uploaded to the Synkronus server and downloaded by mobile devices during synchronization.

## Bundle Structure

An app bundle is a ZIP file with the following structure:

```
app-bundle.zip
├── index.html              # Main entry point (required)
├── manifest.json           # Bundle metadata (required)
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   └── formulus-load.js
│   └── images/
│       └── logo.png
├── forms/                  # Form specifications (optional)
│   ├── survey-v1.json
│   └── health-v1.json
└── config/                 # Configuration files (optional)
    └── settings.json
```

## Manifest Format

The `manifest.json` file defines bundle metadata:

```json
{
  "version": "20250114-123456",
  "name": "My Custom App",
  "description": "Description of the custom application",
  "entryPoint": "index.html",
  "createdAt": "2025-01-14T10:00:00Z"
}
```

### Manifest Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | Yes | Version identifier (typically timestamp-based) |
| `name` | string | Yes | Application name |
| `description` | string | No | Application description |
| `entryPoint` | string | Yes | Path to main HTML file (relative to bundle root) |
| `createdAt` | string (ISO 8601) | No | Creation timestamp |

## Entry Point

The entry point (`index.html` by default) is the main HTML file loaded when the app bundle is opened. It should:

1. Include the Formulus load script
2. Initialize the application
3. Use the Formulus JavaScript interface

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Custom App</title>
  <script src="assets/js/formulus-load.js"></script>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <h1>My Custom App</h1>
  <script src="assets/js/app.js"></script>
</body>
</html>
```

## Form Specifications

Form specifications can be included in the `forms/` directory. Each form file should contain:

- Schema definition
- UI schema definition
- Form metadata

**Example form file:**

```json
{
  "formType": "survey",
  "version": "1.0.0",
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "Name"
      }
    }
  },
  "uischema": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/name"
      }
    ]
  }
}
```

## Versioning

App bundles support versioning:

- Each upload creates a new version
- Versions are identified by timestamp (format: `YYYYMMDD-HHMMSS`)
- Only one version is active at a time
- Mobile devices download the active version during sync

### Version Management

Versions are managed through the API or CLI:

```bash
# List versions
synk app-bundle versions

# Switch active version
synk app-bundle switch 20250114-123456
```

## File Requirements

### Required Files

- `manifest.json`: Bundle metadata
- `index.html`: Main entry point (or file specified in `entryPoint`)

### Optional Files

- `assets/`: CSS, JavaScript, images, and other assets
- `forms/`: Form specification files
- `config/`: Configuration files

## File Size Limits

| Component | Limit | Notes |
|-----------|-------|-------|
| **Total bundle size** | 100 MB | Maximum ZIP file size |
| **Individual file** | 50 MB | Maximum size per file |
| **Form specification** | 1 MB | Maximum size per form file |

## Upload Process

### Using CLI

```bash
# Upload bundle
synk app-bundle upload bundle.zip --activate

# Upload with validation skipped (not recommended)
synk app-bundle upload bundle.zip --skip-validation
```

### Using API

```bash
curl -X POST http://your-server:8080/api/app-bundle/push \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "bundle=@bundle.zip" \
  -F "activate=true"
```

## Validation

Before activation, bundles are validated:

1. **Structure validation**: Verifies required files exist
2. **Manifest validation**: Validates manifest.json format
3. **Entry point validation**: Verifies entry point file exists
4. **Form validation**: Validates form specification files (if present)

## Download Process

Mobile devices download app bundles during synchronization:

1. Device requests app bundle manifest
2. Server returns current active version
3. Device checks if it has the active version
4. If not, device downloads bundle files
5. Bundle is extracted and cached locally

## Best Practices

1. **Keep bundles small**: Minimize file sizes for faster downloads
2. **Use relative paths**: All file references should be relative to bundle root
3. **Version consistently**: Use timestamp-based versioning
4. **Test before upload**: Test bundles locally before uploading
5. **Include formulus-load.js**: Always include the Formulus load script
6. **Optimize assets**: Compress images and minify JavaScript/CSS

## Related Documentation

- [Custom Applications Guide](/guides/custom-applications)
- [API Reference](/reference/api)
- [Form Design Guide](/guides/form-design)
