---
sidebar_position: 2
---

# Components Reference

Complete reference documentation for all ODE components.

## Formulus

Formulus is the mobile application component of ODE, available for Android and iOS devices.

### Overview

Formulus is a React Native application that provides offline-first data collection capabilities. It integrates with the Synkronus server for data synchronization and supports custom applications through WebView integration.

### Key Features

- **Offline-first architecture**: Data is stored locally using WatermelonDB
- **Automatic synchronization**: Syncs with server when connectivity is available
- **Custom application support**: Runs custom web applications in WebViews
- **JSON Forms integration**: Renders forms using JSON Forms specification
- **Multimedia capture**: Supports photos, audio, video, GPS, and signatures
- **Conflict resolution**: Automatically resolves sync conflicts

### Installation

- **End Users**: See [Installing Formulus](/getting-started/installing-formulus)
- **Developers**: See [Installing Formulus for Development](/development/installing-formulus-dev)

### Configuration

Configure the app through Settings:

- **Server URL**: Your Synkronus server address
- **Authentication**: Username and password
- **Sync settings**: Auto-sync, sync interval, sync triggers

### JavaScript Interface

Formulus exposes a JavaScript interface for custom applications:

```javascript
// Get the Formulus API
const api = await getFormulus();

// Create observation
await api.addObservation(formType, initializationData);

// Edit observation
await api.editObservation(formType, observationId);

// Delete observation
await api.deleteObservation(formType, observationId);
```

### Documentation

- **User Guide**: [Formulus Features](/using/formulus-features)
- **Component Reference**: [Formulus Reference](/reference/formulus)
- **Development**: [Formulus Development](/development/formulus-development)

## Synkronus

Synkronus is the server component of ODE, built in Go, that handles data synchronization, storage, and API services.

### Overview

Synkronus provides a RESTful API for data synchronization, app bundle management, attachment handling, and user management. It uses PostgreSQL for data storage and JWT for authentication.

### Key Features

- **RESTful API**: Comprehensive API for all operations
- **PostgreSQL integration**: Robust data storage
- **Conflict resolution**: Version-based conflict detection and resolution
- **Versioning system**: Supports schema and app bundle versioning
- **Security**: JWT-based authentication with role-based access control
- **Attachment management**: Separate handling of binary files
- **API versioning**: Supports multiple API versions

### Installation

See the [Installation guide](/getting-started/installation) for detailed installation instructions.

### Configuration

Configure using environment variables:

- `DB_CONNECTION`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token signing
- `PORT`: HTTP server port (default: 8080)
- `LOG_LEVEL`: Logging level (default: info)

See the [Configuration guide](/guides/configuration) for complete configuration options.

### API

See the [API Reference](/reference/api) for complete API documentation.

## Synkronus CLI

Synkronus CLI is a command-line utility for interacting with the Synkronus server.

### Overview

The CLI provides convenient access to server operations including authentication, app bundle management, data synchronization, and data export.

### Installation

```bash
go install github.com/OpenDataEnsemble/ode/synkronus-cli/cmd/synkronus@latest
```

Or build from source:

```bash
git clone https://github.com/OpenDataEnsemble/ode.git
cd ode/synkronus-cli
go build -o bin/synk ./cmd/synkronus
```

### Key Features

- **Authentication**: Login, logout, token management
- **App bundle management**: Upload, download, version management
- **Data synchronization**: Push and pull operations
- **Data export**: Export observations as Parquet ZIP archives
- **Configuration management**: Multiple endpoint support

### Documentation

- **Complete Reference**: [Synkronus CLI Reference](/reference/synkronus-cli)
- **Common Commands**: See CLI reference for all commands

## Formplayer

Formplayer is the web-based form rendering component of ODE.

### Overview

Formplayer is a React application that renders JSON Forms and communicates with the Formulus mobile app. It provides the dynamic form interface that powers data collection workflows.

### Key Features

- **JSON Forms rendering**: Renders forms based on JSON schema
- **Question type support**: Supports various input types including text, numbers, dates, multimedia, GPS, signatures
- **Validation**: Client-side and schema-based validation
- **Custom renderers**: Support for custom question type renderers
- **Integration**: Seamlessly integrates with Formulus mobile app

### Documentation

- **Complete Reference**: [Formplayer Reference](/reference/formplayer)
- **Development**: [Formplayer Development](/development/formplayer-development)

## Component Integration

All components work together to provide a complete data collection solution:

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Formulus  │◄───────►│  Synkronus   │◄───────►│   Formulus  │
│  (Mobile)   │  Sync   │   (Server)   │  Sync   │  (Mobile)   │
└─────────────┘         └──────────────┘         └─────────────┘
      │                        │                        │
      │                        │                        │
      ▼                        ▼                        ▼
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Formplayer │         │   Database    │         │  Formplayer │
│   (WebView) │         │  (PostgreSQL) │         │   (WebView) │
└─────────────┘         └──────────────┘         └─────────────┘
```

## Related Documentation

- [Installation Guide](/getting-started/installation)
- [API Reference](/reference/api)
- [Form Design Guide](/guides/form-design)
- [Custom Applications Guide](/guides/custom-applications)
