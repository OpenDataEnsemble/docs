---
sidebar_position: 4
---

# Formplayer Development

Complete guide for developing the Formplayer form rendering component.

## Overview

Formplayer is a React web application that renders JSON Forms. It runs within WebViews in the Formulus mobile app.

## Prerequisites

- **Node.js** 18+ and npm
- **React** development experience

## Local Development

### Setup

```bash
cd formulus-formplayer
npm install
```

### Development Server

```bash
npm start
```

Opens at http://localhost:3000

### Development Features

- **Hot Reload**: Changes reflect immediately
- **Source Maps**: Debug in browser DevTools
- **Error Overlay**: Errors shown in browser

## Building

### Build for React Native

Build and copy to Formulus app:

```bash
npm run build:rn
```

This:
1. Builds the React app
2. Copies build to Formulus app directory
3. Updates WebView assets

### Build for Web

Standard web build:

```bash
npm run build
```

Output in `build/` directory.

## Project Structure

- `src/`: React source code
- `public/`: Static assets
- `build/`: Production build output

## Adding Question Types

1. **Create Renderer Component:**
   ```typescript
   // src/NewQuestionRenderer.tsx
   export function NewQuestionRenderer(props) {
     return <input {...props} />
   }
   ```

2. **Register in Formplayer:**
   Add to Formplayer configuration when initialized by Formulus.

## Testing

```bash
npm test
```

## Related Documentation

- [Formplayer Reference](/reference/formplayer) - Component reference
- [Form Design Guide](/guides/form-design) - Creating forms

