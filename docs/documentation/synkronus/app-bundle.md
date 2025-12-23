# App Bundle API Documentation

## Overview

The App Bundle API provides endpoints for managing custom application bundles, including form specifications and custom renderers. This documentation explains the core concepts and available endpoints.

## Core Concepts

### App Bundle Structure

An app bundle is a ZIP file containing:

1. **Form Specifications** (required):
   - Located in `/forms/{form_name}/`
   - Each form requires two files:
     - `schema.json`: The JSON Schema definition for the form
     - `ui.json`: The UI configuration for the form

2. **Custom Renderers** (optional):
   - Located in `/renderers/`
   - Custom question types referenced by UI schemas

### Core Fields

Forms may include special fields that are considered part of the core entity:

- Fields prefixed with `core_` (e.g., `core_id`, `core_name`)
- Fields marked with `"x-core": true` in the schema

**Important Rules for Core Fields:**

- Core fields are immutable once created
- They form the unique identity of each form entry
- To modify core fields, you must create a new form and migrate data
- Non-core fields can be freely added, modified, or removed in new versions

## API Endpoints

### 1. Get Changes Between Versions

`GET /app-bundle/changes`

Compare two versions of an app bundle to see what has changed.

**Query Parameters:**

- `current`: (optional) The current version (defaults to latest)
- `target`: (optional) The target version to compare against (defaults to previous version)

**Response:**

- `200`: Returns a `ChangeLog` object with detailed changes
- `400`: Invalid version format or parameters
- `404`: One or both versions not found

### 2. Get Current Manifest

`GET /app-bundle/manifest`

Retrieve the current app bundle's file list and metadata.

**Response Headers:**

- `ETag`: Hash of the manifest for caching

**Response:**

- `200`: Returns an `AppBundleManifest` object

### 3. Download File

`GET /app-bundle/download/{path}`

Download a specific file from the app bundle.

**Path Parameters:**

- `path`: Path to the file within the bundle

**Query Parameters:**

- `preview`: (boolean, default: false) If true, gets the file from the latest version including unreleased changes

**Headers:**

- `If-None-Match`: Optional ETag for conditional requests

**Responses:**

- `200`: File content
- `304`: Not Modified

### 4. List Available Versions

`GET /app-bundle/versions`

Get a list of all available app bundle versions.

**Response:**

- `200`: Returns an `AppBundleVersions` object with version list

### 5. Upload New Bundle (Admin Only)

`POST /app-bundle/push`

Upload a new version of the app bundle.

**Request Body:**

- `bundle`: (multipart/form-data) ZIP file containing the new app bundle

**Responses:**

- `200`: Bundle successfully uploaded
- `400`: Bad request
- `401`: Unauthorized
- `403`: Admin role required
- `413`: File too large

### 6. Switch Version (Admin Only)

`POST /app-bundle/switch/{version}`

Switch the active app bundle to a specific version.

**Path Parameters:**

- `version`: The version identifier to switch to

**Responses:**

- `200`: Successfully switched versions
- `400`: Bad request
- `401`: Unauthorized
- `403`: Admin role required
- `404`: Version not found

## Versioning

### API Versioning

- All endpoints support an optional `X-API-Version` header
- Format: `MAJOR.MINOR.PATCH` (e.g., `1.0.0`)
- Follows semantic versioning principles

### App Bundle Versioning

- Each upload creates a new version
- Versions are immutable once created
- The system maintains a history of all versions
- Only one version can be active at a time

## Best Practices

1. **Form Design**:
   - Carefully plan your core fields as they cannot be changed
   - Use descriptive names for all fields
   - Document your form structure and field purposes

2. **Version Management**:
   - Test new versions thoroughly before switching
   - Version numbers will be assigned by synkronus (0001, 0002, etc. ...)
   - Maintain backward compatibility when possible

## Error Handling

All error responses follow a consistent format:

```json
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string"
}
```

Common error statuses include:

- `400`: Bad request (invalid input)
- `401`: Unauthorized
- `403`: Forbidden (missing permissions)
- `404`: Resource not found
- `413`: Payload too large
- `500`: Internal server error

## Using the CLI to handle app-bundle

The `synkronus-cli` provides a powerful command-line interface for managing app bundles, making it easy to interact with the App Bundle API. Key features include:

- **Uploading** new app bundle versions with a single command
- **Downloading** specific versions or the latest bundle
- **Switching** between different versions of your app bundle
- **Viewing** the current active version and available versions
- **Comparing** changes between different versions
- **Managing** form specifications and custom renderers through simple commands

The CLI handles authentication, version tracking, and file operations, providing a streamlined workflow for development and deployment. All operations can be performed with simple, intuitive commands, and support both interactive and scripted usage patterns.

### CLI Examples

#### Upload a new app bundle version

```bash
# Upload a new version from a ZIP file
synkronus-cli app-bundle upload ./my-app-bundle.zip

# Upload with a specific version number
synkronus-cli app-bundle upload ./my-app-bundle.zip --version 1.2.3
```

#### List and manage versions

```bash
# List all available versions
synkronus-cli app-bundle versions

# Show current active version
synkronus-cli app-bundle current

# Switch to a specific version
synkronus-cli app-bundle switch 1.2.3
```

#### Download and inspect bundles

```bash
# Download the latest version
synkronus-cli app-bundle download --output ./latest-bundle

# Download a specific version
synkronus-cli app-bundle download --version 1.2.3 --output ./v1.2.3-bundle

# Compare changes between versions
synkronus-cli app-bundle diff 1.2.2 1.2.3
```

#### Form management

```bash
# List all forms in the current bundle
synkronus-cli app-bundle forms list

# Get details for a specific form
synkronus-cli app-bundle forms show my-form

# Validate a form schema
synkronus-cli app-bundle forms validate ./my-form/schema.json
```

These examples demonstrate common workflows. Use `synkronus-cli app-bundle --help` for a complete list of available commands and options.
