---
sidebar_position: 1
---

# Development Setup

Complete guide to setting up a development environment for ODE.

## Prerequisites

Before setting up the development environment, ensure you have:

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Go** 1.22 or higher (for server and CLI development)
- **PostgreSQL** 13.0 or higher (for server development)
- **Git** for version control
- **Docker** and **Docker Compose** (optional, for containerized development)

## Repository Structure

ODE is a monorepo containing multiple components:

```
ode/
├── formulus/              # React Native mobile app
├── formulus-formplayer/   # React web form renderer
├── synkronus/            # Go backend server
├── synkronus-cli/        # Go command-line utility
├── synkronus-portal/     # React web portal
└── packages/
    └── tokens/           # Design tokens package
```

## Clone the Repository

```bash
git clone https://github.com/OpenDataEnsemble/ode.git
cd ode
```

## Formulus Development

### Setup

```bash
cd formulus
npm install
```

### Running

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Code Quality

ODE enforces consistent formatting and linting:

```bash
# Run linting
npm run lint

# Run linting with auto-fix
npm run lint:fix

# Format code
npm run format

# Check formatting (no writes)
npm run format:check
```

### Generating Files

```bash
# Generate WebView injection script
npm run generate

# Generate API client from OpenAPI spec
npm run generate:api
```

## Formplayer Development

### Setup

```bash
cd formulus-formplayer
npm install
```

### Running

```bash
# Development server
npm start

# Build for React Native
npm run build:rn
```

### Code Quality

```bash
# Run linting
npm run lint

# Run linting with auto-fix
npm run lint:fix

# Format code
npm run format

# Check formatting (no writes)
npm run format:check
```

## Synkronus Development

### Setup

```bash
cd synkronus
go mod download
```

### Configuration

Create a `.env` file:

```bash
PORT=8080
DB_CONNECTION=postgres://synkronus:password@localhost:5432/synkronus?sslmode=disable
JWT_SECRET=your-secret-key-for-development
LOG_LEVEL=debug
APP_BUNDLE_PATH=./data/app-bundles
```

### Running

```bash
# Build
go build -o bin/synkronus cmd/synkronus/main.go

# Run
./bin/synkronus

# Or run directly
go run cmd/synkronus/main.go
```

### Database Setup

Ensure PostgreSQL is running and create a database:

```sql
CREATE DATABASE synkronus;
```

The schema will be created automatically on first run.

## Synkronus CLI Development

### Setup

```bash
cd synkronus-cli
go mod download
```

### Building

```bash
# Build
go build -o bin/synk ./cmd/synkronus

# Run
./bin/synk
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Make your code changes following the coding standards.

### 3. Test Locally

```bash
# Run tests
npm test  # For frontend projects
go test ./...  # For Go projects

# Check code quality
npm run lint
npm run format:check
```

### 4. Commit Changes

```bash
git add .
git commit -m "Description of changes"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Create a pull request on GitHub.

## Code Quality Standards

### Frontend (React/React Native)

- **Linting**: ESLint with project-specific rules
- **Formatting**: Prettier with consistent configuration
- **TypeScript**: Strict type checking enabled
- **Testing**: Jest for unit tests

### Backend (Go)

- **Formatting**: `gofmt` or `goimports`
- **Linting**: `golangci-lint` (if configured)
- **Testing**: Standard Go testing package
- **Documentation**: Godoc comments for exported functions

### CI/CD

The CI pipeline automatically:

- Runs linting and formatting checks
- Runs tests
- Builds components
- Publishes Docker images (for synkronus)

## Development Tools

### Recommended IDE Setup

- **VS Code**: With extensions for TypeScript, Go, and React
- **IntelliJ IDEA**: With Go and JavaScript plugins
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)

### Useful Commands

```bash
# Check all components
cd formulus && npm run lint && cd ..
cd formulus-formplayer && npm run lint && cd ..
cd synkronus && go test ./... && cd ..

# Format all code
cd formulus && npm run format && cd ..
cd formulus-formplayer && npm run format && cd ..
cd synkronus && go fmt ./... && cd ..
```

## Troubleshooting

### Node Modules Issues

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Go Module Issues

```bash
# Clean module cache
go clean -modcache
go mod download
```

### Database Connection Issues

- Verify PostgreSQL is running
- Check connection string format
- Ensure database exists
- Verify user permissions

## Related Documentation

- [Architecture Overview](/development/architecture)
- [Contributing Guide](/development/contributing)
- [Building & Testing](/development/building-testing)
