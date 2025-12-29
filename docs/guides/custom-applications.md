---
sidebar_position: 2
---

# Custom Applications

Complete guide to building and deploying custom applications that integrate with ODE.

## Overview

Custom applications are web-based interfaces that run within the Formulus mobile app, providing specialized workflows and user experiences. They allow you to create custom navigation, integrate with the ODE form system, and build specialized interfaces for specific use cases.

## How Custom Applications Work

Custom applications are defined in app bundles, which include:

- HTML, CSS, and JavaScript files
- Form specifications
- Custom renderers for question types
- Configuration files

The app bundle is uploaded to the Synkronus server and downloaded by mobile devices during synchronization. When a user opens a custom application, it runs in a WebView within the Formulus app.

## Formulus JavaScript Interface

Custom applications interact with Formulus through a JavaScript interface. The API is injected automatically when your app loads.

### Getting the Formulus API

Always use the `getFormulus()` helper function to ensure the API is ready:

```html
<!-- Include the load script -->
<script src="formulus-load.js"></script>

<script>
  async function initializeMyApp() {
    try {
      const api = await getFormulus();
      
      // Now it's safe to use the API
      const version = await api.getVersion();
      console.log('Formulus Host Version:', version);
    } catch (error) {
      console.error('Failed to load Formulus API:', error);
    }
  }
  
  initializeMyApp();
</script>
```

### Available Methods

The Formulus interface provides methods for:

- **Form Operations**: Create, edit, and delete observations
- **Data Access**: Query observations and form specifications
- **Device Features**: Access camera, GPS, file system, etc.
- **Synchronization**: Trigger sync operations

### Creating Observations

```javascript
// Create a new observation
await formulus.addObservation(formType, initializationData);
```

### Editing Observations

```javascript
// Edit an existing observation
await formulus.editObservation(formType, observationId);
```

### Deleting Observations

```javascript
// Delete an observation
await formulus.deleteObservation(formType, observationId);
```

## App Bundle Structure

An app bundle is a ZIP file containing:

```
app-bundle/
├── index.html          # Main entry point
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── forms/              # Form specifications (optional)
└── manifest.json       # Bundle metadata
```

### Manifest File

The manifest defines bundle metadata:

```json
{
  "version": "1.0.0",
  "name": "My Custom App",
  "description": "Description of the app",
  "entryPoint": "index.html"
}
```

## Building Custom Applications

### Development Setup

1. **Reference the API**: Copy `formulus-api.js` into your project for autocompletion
2. **Include the Load Script**: Add `formulus-load.js` to your HTML
3. **Use getFormulus()**: Always await the API before using it

### Example Application

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Custom App</title>
  <script src="formulus-load.js"></script>
</head>
<body>
  <h1>My Custom App</h1>
  <button id="createForm">Create Observation</button>
  
  <script>
    async function init() {
      const api = await getFormulus();
      
      document.getElementById('createForm').addEventListener('click', async () => {
        try {
          await api.addObservation('my-form-type', {});
          alert('Observation created!');
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
    
    init();
  </script>
</body>
</html>
```

## Deployment

### Uploading App Bundles

Upload app bundles using the Synkronus CLI:

```bash
synk app-bundle upload bundle.zip --activate
```

Or use the API:

```bash
curl -X POST http://your-server:8080/api/app-bundle/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "bundle=@bundle.zip"
```

### Version Management

App bundles support versioning:

- Each upload creates a new version
- Versions are identified by timestamp
- Switch between versions using the CLI or API
- Mobile devices download the active version during sync

## Custom Renderers

Custom applications can include custom renderers for question types. See the [Form Design guide](/guides/form-design) for details on creating custom renderers.

## Best Practices

1. **Wait for API**: Always use `getFormulus()` before accessing the API
2. **Error Handling**: Implement proper error handling for all API calls
3. **Offline Support**: Design apps to work gracefully when offline
4. **Performance**: Optimize for mobile devices and slower networks
5. **Testing**: Test thoroughly in both development and production environments

## Related Documentation

- [Form Design Guide](/guides/form-design)
- [Formulus Interface Documentation](https://github.com/OpenDataEnsemble/ode/tree/main/formulus/src/webview)
- [App Bundle Format Reference](/reference/app-bundle-format)

