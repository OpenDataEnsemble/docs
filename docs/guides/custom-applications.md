---
sidebar_position: 2
---

# Custom Applications

Complete guide to building and deploying custom applications that integrate with ODE.

## Overview

Custom applications are React applications that run within the Formulus mobile app, providing specialized workflows and user experiences. They allow you to create custom navigation, integrate with the ODE form system, and build specialized interfaces for specific use cases.

## Application Structure

Custom applications follow a standardized structure for consistency and maintainability:

```
my-app/
├── app.config.json          # App configuration and theme
├── forms/                   # Form definitions
│   ├── survey/
│   │   ├── schema.json      # JSON Schema (draft-07)
│   │   └── ui.json          # Formulus UI schema
│   └── forms-manifest.json  # Form registry
├── src/
│   ├── components/          # Reusable components
│   ├── screens/             # Main screens
│   ├── utils/               # Utility functions
│   └── theme.js             # Theme generation
├── scripts/                 # Build and validation scripts
├── package.json
└── vite.config.js
```

## Configuration System

### app.config.json

The `app.config.json` file is the single source of truth for your application's configuration:

```json
{
  "$schema": "https://ode.dev/schemas/app-config-v1.json",
  "name": "My Application",
  "version": "1.0.0",
  "navigation": {
    "tabs": ["Home", "Forms", "Sync", "More"]
  },
  "theme": {
    "light": {
      "primary": "#1976d2",
      "primaryLight": "#42a5f5",
      "primaryDark": "#1565c0",
      "onPrimary": "#ffffff",
      "background": "#fafafa",
      "surface": "#ffffff",
      "onBackground": "#212121",
      "onSurface": "#424242"
    },
    "dark": {
      "primary": "#42a5f5",
      "primaryLight": "#90caf9",
      "primaryDark": "#1976d2",
      "onPrimary": "#000000",
      "background": "#121212",
      "surface": "#1e1e1e",
      "onBackground": "#ffffff",
      "onSurface": "#e0e0e0"
    }
  }
}
```

### Theme Integration

Themes are automatically generated from your configuration:

```javascript
// src/theme.js
import { createTheme } from '@mui/material/styles';
import appConfig from '../public/app.config.json';

export function buildTheme(mode = 'light') {
  const colors = appConfig.theme[mode] ?? appConfig.theme.light;
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: colors.primaryLight,
        dark: colors.primaryDark,
        contrastText: colors.onPrimary,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      // ... complete theme configuration
    },
  });
}
```

## Form Development

### Form Structure

Each form consists of two files:

1. **schema.json**: JSON Schema (draft-07) defining data structure
2. **ui.json**: Formulus UI schema defining form layout and behavior

### Example Form

**schema.json:**
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Full Name"
    },
    "age": {
      "type": "integer",
      "title": "Age",
      "minimum": 0,
      "maximum": 120
    },
    "email": {
      "type": "string",
      "title": "Email",
      "format": "email"
    }
  },
  "required": ["name", "age"]
}
```

**ui.json:**
```json
{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/name"
    },
    {
      "type": "Control",
      "scope": "#/properties/age"
    },
    {
      "type": "Control",
      "scope": "#/properties/email"
    }
  ]
}
```

## Form Integration

### Opening Forms

Use the Formulus API to open forms:

```javascript
import { openForm } from './utils/formulusApi';

async function handleFormSubmit() {
  try {
    const result = await openForm('survey', {
      mode: 'create',
      initialData: {}
    });
    
    if (result.status === 'completed') {
      console.log('Form data:', result.data);
      // Handle successful submission
    }
  } catch (error) {
    console.error('Form error:', error);
  }
}
```

### Mock API for Development

During development, a mock API provides realistic behavior without needing the mobile app:

```javascript
// src/utils/mockFormulusApi.js
export class MockFormulusAPI {
  async openForm(formId, options = {}) {
    // Simulate form opening with mock data
    return {
      status: 'completed',
      data: { /* mock form data */ }
    };
  }
}
```

## Build Process

### Package.json Scripts

```json
{
  "scripts": {
    "copy-forms": "node scripts/copy-forms.js",
    "dev": "npm run copy-forms && vite",
    "build": "npm run copy-forms && vite build",
    "zip": "node scripts/build-zip.js",
    "validate:forms": "node scripts/validate-forms.js"
  }
}
```

### Build Scripts

**scripts/copy-forms.js:**
```javascript
import fs from 'fs-extra';
import path from 'path';

const sourceDir = path.join(process.cwd(), '..', 'forms');
const targetDir = path.join(process.cwd(), 'public', 'forms');

fs.copy(sourceDir, targetDir)
  .then(() => console.log('Forms copied successfully'))
  .catch(err => console.error('Error copying forms:', err));
```

**scripts/build-zip.js:**
```javascript
import AdmZip from 'adm-zip';
import path from 'path';

const zip = new AdmZip();
const buildDir = path.join(process.cwd(), '..', 'app-bundles', 'app');
const formsDir = path.join(process.cwd(), '..', 'forms');

zip.addLocalFolder(buildDir, 'app');
zip.addLocalFolder(formsDir, 'forms');

zip.writeZip(path.join(process.cwd(), '..', 'bundle-v1.0.0.zip'));
```

## Form Validation

### Validation Script

**scripts/validate-forms.js:**
```javascript
import Ajv from 'ajv';
import fs from 'fs-extra';

const ajv = new Ajv();

function validateForm(formPath) {
  const schema = fs.readJsonSync(path.join(formPath, 'schema.json'));
  const uiSchema = fs.readJsonSync(path.join(formPath, 'ui.json'));
  
  // Validate JSON Schema
  const validate = ajv.compile(schema);
  
  // Validate UI schema references
  // ... validation logic
  
  return { valid: true, errors: [] };
}
```

## Development Workflow

### Local Development

1. **Setup**: `npm install`
2. **Development**: `npm run dev` (includes form copying)
3. **Validation**: `npm run validate:forms`
4. **Build**: `npm run build && npm run zip`

### Testing Forms

Use the built-in form explorer to test forms locally:

```javascript
// Navigate to http://localhost:5173/#/forms
// Browse and test all forms with mock data
```

## Deployment

### Bundle Creation

1. Build the application: `npm run build`
2. Create deployment bundle: `npm run zip`
3. Upload bundle to Synkronus server
4. Deploy to mobile devices via sync

### Version Management

Update the version in `app.config.json` and `package.json`:

```json
{
  "version": "1.1.0"
}
```

Bundle filename will automatically reflect the version: `bundle-v1.1.0.zip`

## Best Practices

### Form Design
- Use clear, descriptive field titles
- Implement proper validation rules
- Provide helpful error messages
- Consider offline usage scenarios

### Performance
- Optimize bundle size (target < 200KB)
- Use lazy loading for large forms
- Implement efficient data structures
- Test on target devices

### User Experience
- Follow Material Design 3 guidelines
- Implement consistent navigation
- Provide clear feedback for actions
- Handle errors gracefully

### Code Organization
- Separate concerns (UI, logic, data)
- Use TypeScript for type safety
- Implement proper error handling
- Write maintainable, documented code

## Troubleshooting

### Common Issues

**Forms not appearing:**
- Verify forms are copied to `public/forms/`
- Check `forms-manifest.json` format
- Validate form schemas

**Build failures:**
- Ensure all dependencies are installed
- Check form validation errors
- Verify configuration syntax

**Deployment issues:**
- Confirm bundle size limits
- Validate app configuration
- Test bundle extraction

This guide provides the foundation for building robust custom applications that integrate seamlessly with the ODE ecosystem.

