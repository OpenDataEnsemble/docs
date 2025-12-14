---
sidebar_position: 1
---

# Prerequisites

Tools and skills needed for developing ODE applications.

## What is ODE?

**Open Data Ensemble (ODE)** is a comprehensive platform for mobile data collection and synchronization. It consists of:

- **Formulus** - React Native mobile app for Android/iOS
- **Formulus Formplayer** - React web application for form rendering
- **Synkronus** - Go-based backend API server
- **Synkronus CLI** - Command-line tool for server management

## Architecture Overview

```
┌─────────────────┐
│   Formulus      │  React Native Mobile App
│  (Android/iOS)  │
└────────┬────────┘
         │
         │ HTTP/HTTPS
         │
┌────────▼────────┐
│     Nginx       │  Reverse Proxy (Port 80)
│  (Port 80/443)  │
└────────┬────────┘
         │
         │ Proxy
         │
┌────────▼────────┐
│   Synkronus     │  Go API Server (Port 8080)
│   (Port 8080)   │
└────────┬────────┘
         │
         │ PostgreSQL
         │
┌────────▼────────┐
│   PostgreSQL    │  Database (Port 5432)
│  (Port 5432)    │
└─────────────────┘
```

## Required Software

Before proceeding, verify you have the following installed:

### Essential Tools

- [ ] **Git** (v2.30+)
  ```bash
  git --version
  ```

- [ ] **Node.js** (v16.0.0 or higher)
  ```bash
  node --version
  npm --version
  ```

- [ ] **Go** (v1.22 or higher)
  ```bash
  go version
  ```

- [ ] **Docker** (v20.10+)
  ```bash
  docker --version
  docker compose version
  ```

- [ ] **Android SDK** and **ADB** (for mobile development)
  ```bash
  adb version
  ```

### Optional but Recommended

- [ ] **Android Studio** - For Android development
- [ ] **VS Code** or your preferred IDE
- [ ] **Physical Android Device** - For testing (recommended)

## System Requirements

### Minimum Requirements

- **OS**: Linux, macOS, or Windows (WSL2)
- **RAM**: 8GB (16GB recommended)
- **Storage**: 10GB free space
- **CPU**: Multi-core processor

### Network Requirements

- Internet connection for downloading dependencies
- Local network access (for device connection)
- Port 80 available (for nginx)

## Build Tools

The build tools for ODE applications include:

- **Synkronus CLI**: Command-line interface for managing and deploying applications
- **Node.js**: For building custom applications
- **Docker**: For running local Synkronus instances

## Required Skills

Building an ODE application requires a technical skillset.

### To Build an App

- Use of command line tools to compile and deploy configuration code
- JSON Schema for building forms
- JSON Forms UI Schema for form layouts
- JavaScript/TypeScript for custom applications
- React for custom application development

### To Deploy an App

- System administration
- Database administration for PostgreSQL
- Familiarity with Docker
- Service monitoring
- Use of command line tools

## Configuration Skills

ODE applications consist of JSON files, form schemas, custom applications, and translations. The following technical skills are necessary:

### JSON Schema

Forms in ODE are defined using JSON Schema. Understanding JSON Schema is essential for building forms.

### JSON Forms

Form layouts are defined using JSON Forms UI Schema. Familiarity with JSON Forms is important for creating user interfaces.

### JavaScript/TypeScript

Custom applications are built using JavaScript or TypeScript. A good understanding of these languages is required for building custom applications.

### PostgreSQL

ODE uses PostgreSQL for data storage. Familiarity with SQL and PostgreSQL is useful for data management and analytics.

