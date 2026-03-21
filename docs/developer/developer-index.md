---
sidebar_position: 4
title: ⚙️ For Developers
---

# Development & Engineering

Welcome to the **Developer** section! Whether you're contributing to ODE, building custom extensions, or deploying the platform, this guide covers development, architecture, and contribution workflows.

## Who This Guide Is For

This section is designed for:

- Software engineers contributing to ODE
- Developers building custom applications with ODE
- System administrators deploying ODE
- Architects evaluating ODE architecture
- Contributors wanting to improve the codebase

:::info Not developing?
If you're collecting data, see the [Data Collector Guide](/docs/collector).  
If you're designing forms, see the [Implementer Guide](/docs/implementer).
:::

## Quick Start

Set up your development environment in 20 minutes:

1. **[Getting Started](/docs/developer/getting-started)** - Choose your path
2. **[Architecture Overview](/docs/developer/architecture)** - Understand the system
3. **[Set Up Environment](/docs/developer/setup-environment)** - Install dependencies
4. **[Run Tests](/docs/developer/building-and-testing)** - Verify your setup

## What You'll Learn

<div className="row">
  <div className="col col--6 col--12-mobile margin-bottom--md">
    <div className="card card--compact">
      <div className="card__header">
        <h4>🚀 Getting Started</h4>
      </div>
      <div className="card__body">
        <p>Choose your development path and get started.</p>
        <a className="button button--primary button--sm button--block" href="/docs/developer/getting-started">Start →</a>
      </div>
    </div>
  </div>

  <div className="col col--6 col--12-mobile margin-bottom--md">
    <div className="card card--compact">
      <div className="card__header">
        <h4>🏗️ Architecture</h4>
      </div>
      <div className="card__body">
        <p>Deep dive into ODE system design and components.</p>
        <a className="button button--primary button--sm button--block" href="/docs/developer/architecture">Learn More →</a>
      </div>
    </div>
  </div>

  <div className="col col--6 col--12-mobile margin-bottom--md">
    <div className="card card--compact">
      <div className="card__header">
        <h4>🔧 Setup Environment</h4>
      </div>
      <div className="card__body">
        <p>Configure your dev machine and install dependencies.</p>
        <a className="button button--primary button--sm button--block" href="/docs/developer/setup-environment">Setup →</a>
      </div>
    </div>
  </div>

  <div className="col col--6 col--12-mobile margin-bottom--md">
    <div className="card card--compact">
      <div className="card__header">
        <h4>🏗️ Build & Test</h4>
      </div>
      <div className="card__body">
        <p>Build projects and run test suites.</p>
        <a className="button button--primary button--sm button--block" href="/docs/developer/building-and-testing">Learn More →</a>
      </div>
    </div>
  </div>

  <div className="col col--6 col--12-mobile margin-bottom--md">
    <div className="card card--compact">
      <div className="card__header">
        <h4>🤝 Contributing</h4>
      </div>
      <div className="card__body">
        <p>How to contribute to ODE development.</p>
        <a className="button button--primary button--sm button--block" href="/docs/developer/contributing-guide">Contribute →</a>
      </div>
    </div>
  </div>

  <div className="col col--6 col--12-mobile margin-bottom--md">
    <div className="card card--compact">
      <div className="card__header">
        <h4>⚡ Extending ODE</h4>
      </div>
      <div className="card__body">
        <p>Build custom extensions and integrations.</p>
        <a className="button button--primary button--sm button--block" href="/docs/developer/extending-ode">Learn More →</a>
      </div>
    </div>
  </div>
</div>

## Documentation Roadmap

### 🚀 Get Started
- [Development Paths](/docs/developer/getting-started#paths)
- [Prerequisites & Requirements](/docs/developer/getting-started#prerequisites)
- [Quick Start Guide](/docs/developer/getting-started#quick-start)

### 🏗️ Understand Architecture
- [System Overview](/docs/developer/architecture)
- [Component Architecture](/docs/developer/architecture#components)
- [Data Flow & Sync Protocol](/docs/developer/architecture#data-flow)
- [Authentication & Security](/docs/developer/architecture#security)

### 🔧 Set Up Environment
- [macOS Setup](/docs/developer/setup-environment#macos)
- [Linux Setup](/docs/developer/setup-environment#linux)
- [Windows Setup](/docs/developer/setup-environment#windows)
- [Docker Setup](/docs/developer/setup-environment#docker)

### 📚 Component Development
- [Formulus (React Native)](/docs/developer/components/formulus)
- [Synkronus Server (Go)](/docs/developer/components/synkronus)
- [Formplayer (React)](/docs/developer/components/formplayer)
- [Synkronus CLI (Go)](/docs/developer/components/synkronus-cli)

### 🏗️ Building & Testing
- [Building Projects](/docs/developer/building-and-testing#building)
- [Running Tests](/docs/developer/building-and-testing#testing)
- [Code Quality & Linting](/docs/developer/building-and-testing#quality)
- [CI/CD Pipeline](/docs/developer/building-and-testing#ci-cd)

### 🤝 Contributing
- [Contributing Workflow](/docs/developer/contributing-guide#workflow)
- [Code Standards](/docs/developer/contributing-guide#standards)
- [Commit Messages](/docs/developer/contributing-guide#commits)
- [Pull Request Process](/docs/developer/contributing-guide#pull-requests)
- [Code of Conduct](/docs/community/code-of-conduct)

### ⚡ Extending ODE
- [Custom Applications](/docs/developer/extending-ode#custom-apps)
- [Custom Form Controls](/docs/developer/extending-ode#form-controls)
- [Server Plugins](/docs/developer/extending-ode#plugins)
- [Integration Patterns](/docs/developer/extending-ode#integrations)

### 📖 API Reference
- [REST API Overview](/docs/api/rest-api/overview)
- [Authentication](/docs/api/rest-api/authentication)
- [Sync Protocol](/docs/api/rest-api/sync)
- [App Bundle API](/docs/api/rest-api/app-bundle)
- [Attachments](/docs/api/rest-api/attachments)

## Development Paths

### Path 1: Contributing to ODE Core

You want to help improve Formulus, Synkronus, or Formplayer.

1. [Clone the monorepo](https://github.com/OpenDataEnsemble/ode)
2. [Set up environment](/docs/developer/setup-environment)
3. [Choose a component](/docs/developer/components)
4. [Follow contributing guide](/docs/developer/contributing-guide)

→ **Best for:** Passionate developers improving the platform

### Path 2: Building Custom Applications

You want to build custom data collection applications on ODE.

1. [Understand architecture](/docs/developer/architecture)
2. [Learn the REST API](/docs/api/rest-api/overview)
3. [Set up development environment](/docs/developer/setup-environment)
4. [Follow extending guide](/docs/developer/extending-ode)

→ **Best for:** Building organization-specific solutions

### Path 3: System Administration & Deployment

You want to deploy and manage ODE in your infrastructure.

1. [Understand system architecture](/docs/developer/architecture)
2. [Read deployment guide](/docs/implementer/deployment-guide)
3. [Learn configuration options](/docs/api/configuration/server)
4. [Set up monitoring](/docs/developer/setup-environment#monitoring)

→ **Best for:** SysAdmins and DevOps engineers

### Path 4: Integration & APIs

You want to integrate ODE with external systems.

1. [Learn REST API](/docs/api/rest-api/overview)
2. [Understand app bundle format](/docs/api/app-bundle-format)
3. [Review sync protocol](/docs/api/rest-api/sync)
4. [Build custom integrations](/docs/developer/extending-ode#integrations)

→ **Best for:** Backend developers and integrations engineers

## Tech Stack Overview

### Formulus (Mobile App)
- **Language:** TypeScript/JavaScript
- **Framework:** React Native
- **Database:** WatermelonDB
- **Platforms:** Android, iOS

### Synkronus (Server)
- **Language:** Go 1.22+
- **Database:** PostgreSQL
- **API:** REST + OpenAPI
- **Deployment:** Docker, Kubernetes

### Formplayer (Form Renderer)
- **Language:** TypeScript/JavaScript
- **Framework:** React
- **Rendering:** JSON Forms
- **Execution:** WebView (Formulus) or Browser

### Synkronus CLI
- **Language:** Go
- **Distribution:** Prebuilt binaries
- **Package Manager:** Homebrew, curl

## Key Architecture Concepts

### Offline-First Design
```
Device                          Server
├─ Local DB                      ├─ PostgreSQL
│  (WatermelonDB)                │
├─ Forms Cache                   ├─ REST API
└─ Sync Queue                    ├─ Sync Engine
   (offline buffer)              └─ Authentication
```

### Client-Server Sync
```
1. Pull: Client requests new forms from server
2. Push: Client sends completed submissions
3. Merge: Server resolves conflicts
4. Acknowledge: Client marks submissions as synced
```

### Authentication & Security
- JWT-based authentication
- Role-based access control (RBAC)
- End-to-end encryption options
- Secure offline token storage

## Getting Help

- **Architecture questions?** → [Read Architecture Guide](/docs/developer/architecture)
- **Setup issues?** → [Setup Environment](/docs/developer/setup-environment)
- **Contributing questions?** → [Contributing Guide](/docs/developer/contributing-guide)
- **API documentation?** → [REST API](/docs/api/rest-api/overview)
- **Need community help?** → [Community Support](/docs/community/getting-help)

## Contribution Ideas

Here are some ways to contribute:

| Contribution | Difficulty | Impact |
|--------------|------------|--------|
| Fix typos in docs | Easy | High |
| Report bugs | Easy | High |
| Fix UI bugs | Medium | High |
| Add tests | Medium | High |
| Implement features | Medium-Hard | High |
| Add new form control | Hard | High |
| Database optimization | Hard | Medium |
| Mobile performance | Hard | High |

## Code Quality Standards

ODE maintains high code quality:

- ✅ ESLint + Prettier for JavaScript/TypeScript
- ✅ Go fmt for Go code
- ✅ Comprehensive test coverage
- ✅ Pre-commit hooks
- ✅ CI/CD validation on all PRs

## Next Steps

Ready to contribute or develop?

→ **[Getting Started](/docs/developer/getting-started)**

Or dive into a specific area:

→ **[Architecture Deep Dive](/docs/developer/architecture)**  
→ **[Set Up Environment](/docs/developer/setup-environment)**  
→ **[Contributing Guide](/docs/developer/contributing-guide)**

---

:::tip Welcome to ODE!
We're excited to have you contribute to ODE. Whether it's code, documentation, bug reports, or ideas—all contributions are valued!
:::
