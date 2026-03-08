---
sidebar_position: 1
---

# What is ODE?

:::tip Pronunciation
ODE is pronounced like "code", without the "C."
:::

Open Data Ensemble (ODE) is a platform designed to simplify mobile data collection and management. It provides tools and infrastructure for creating forms, collecting data in the field, and synchronizing information across devices and servers.

## Overview

ODE addresses the challenges of data collection in environments where connectivity is unreliable or intermittent. The platform is built with an offline-first architecture, ensuring that data collection continues regardless of network availability.

## Problem Statement

Traditional data collection solutions often require constant internet connectivity, making them unsuitable for field work in remote areas. ODE solves this by:

- Storing data locally on mobile devices
- Synchronizing data when connectivity is available
- Resolving conflicts automatically when multiple devices modify the same data
- Providing a flexible form design system that adapts to various use cases

## Key Features

### Offline-First Design

All data is stored locally on the device using WatermelonDB, a reactive database optimized for React Native. This ensures that data collection continues even when the device is offline.

### Flexible Form System

Forms are defined using JSON schema, following the JSON Forms specification. This allows for complex validation rules, conditional logic, and custom question types.

### Reliable Synchronization

The synchronization protocol handles conflicts, ensures data integrity, and supports incremental updates to minimize bandwidth usage.

### Cross-Platform Support

ODE applications run on Android and iOS devices, with a web-based form player for preview and testing.

### Extensible Architecture

The platform supports custom applications and renderers, allowing organizations to tailor the user experience to their specific needs.

## Use Cases

ODE is suitable for various data collection scenarios:

| Use Case | Description |
|----------|-------------|
| **Health Surveys** | Collect patient data, medical records, and health indicators |
| **Research Studies** | Gather research data in field conditions |
| **Monitoring & Evaluation** | Track program outcomes and indicators |
| **Asset Management** | Inventory and track assets in the field |
| **Quality Assurance** | Conduct inspections and quality checks |

## Architecture Overview

ODE follows a client-server architecture:

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

The mobile application (Formulus) communicates with the server (Synkronus) to synchronize data. Forms are rendered using the Formplayer component, which can be embedded in custom applications.

## Technology Stack

ODE is built using modern, open-source technologies:

- **React Native** for mobile applications
- **React** for web-based form rendering
- **Go** for the backend server
- **PostgreSQL** for data storage
- **WatermelonDB** for local data storage on mobile devices
- **JSON Forms** for form rendering and validation

## Next Steps

- Learn about [Why ODE?](/getting-started/why-ode) to understand the benefits
- Review [Key Concepts](/getting-started/key-concepts) to understand the terminology
- Follow the [Installation guide](/getting-started/installation/prerequisites) to set up your environment

