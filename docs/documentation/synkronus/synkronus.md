---
sidebar_position: 1
---

# synkronus

synkronus is the core backend server for the OpenDataEnsemble (ODE) ecosystem, built in Go. It serves as the central synchronization hub that enables seamless data exchange between your custom applications and Formulus mobile clients. The server provides a comprehensive REST API (documented in `synkronus.yaml`) that handles authentication, data management, and real-time synchronization across multiple devices and platforms.

## Installation & Setup

:::info Development Status
During development, synkronus is provided as a single executable Go binary and requires a separate PostgreSQL instance. We are actively working on a comprehensive Docker image for easier deployment.
:::

### Prerequisites

- **PostgreSQL Database**: A running PostgreSQL instance (version 12 or higher recommended)
- **Go Runtime**: Go 1.19+ if building from source

### Development Setup

1. **Database Setup**: Ensure PostgreSQL is running and accessible
2. **Configuration**: Set up your database connection and server configuration
3. **Run synkronus**: Execute the Go binary with appropriate environment variables

```bash
# Example configuration (adjust for your environment)
export DATABASE_URL="postgres://username:password@localhost:5432/synkronus"
export SERVER_PORT="8080"
./synkronus
```

## API Documentation

The complete synkronus REST API is documented in the `synkronus.yaml` OpenAPI specification. Key endpoints include:

- **Authentication**: User login and session management
- **Data Synchronization**: Bidirectional sync of form data and attachments
- **Application Management**: Deploy and version custom applications
- **Form Management**: Create, update, and manage form specifications

### Basic Usage Example

```bash
# Authenticate with the server
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'

# Sync form data
curl -X GET http://localhost:8080/api/v1/data/forms \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Architecture

synkronus follows a modular architecture designed for scalability and reliability:

- **RESTful API**: Clean, versioned API endpoints for all operations
- **PostgreSQL Integration**: Robust data persistence with ACID compliance
- **Conflict Resolution**: Intelligent handling of offline data synchronization conflicts
- **Versioning System**: Built-in versioning for applications, forms, and render packs
- **Security**: JWT-based authentication with role-based access control
