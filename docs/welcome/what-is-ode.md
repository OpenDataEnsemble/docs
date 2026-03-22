---
title: What is ODE?
---

# What is Open Data Ensemble?

Open Data Ensemble (ODE) is a comprehensive, open-source platform for mobile data collection and synchronization. Built for researchers, health professionals, implementers, and developers, ODE provides a robust solution for designing forms, collecting data securely, and synchronizing seamlessly across devices—even in offline conditions.

:::tip Pronunciation
ODE is pronounced like "code", without the "C."
:::

## The Problem ODE Solves

Traditional data collection tools often have limitations:

- **No offline support** - Without internet, collection stops
- **Complexity** - Building forms requires technical expertise  
- **Inflexibility** - Customization is difficult and expensive
- **Lock-in** - Data is trapped in proprietary systems
- **Cost** - Enterprise solutions are prohibitively expensive

## How ODE Works

ODE provides an integrated system for the complete data lifecycle:

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Collect    │  ──► │    Sync      │  ──► │   Analyze    │
│   Data       │      │   Offline    │      │   & Export   │
└──────────────┘      └──────────────┘      └──────────────┘
    Formulus         WatermelonDB +         Parquet Export
    (App)           Synkronus (Server)      (Your Tools)
```

### Key Features

- **📱 Mobile-First Design** - Optimized for Android and iOS
- **🔌 Works Offline** - Full functionality without internet; automatic sync when online
- **🎨 Easy Form Creation** - JSON-based form design, no coding required
- **🔐 Secure & Encrypted** - Data is encrypted at rest and in transit
- **♻️ Open Source** - Fully transparent, auditable, and extensible
- **📊 Flexible Data Export** - Export to Parquet, JSON, or custom formats
- **⚡ Performant** - Minimal battery and data consumption

## The ODE Ensemble

ODE consists of four main components that work together:

| Component | Role | Technology |
|-----------|------|-----------|
| **Formulus** | Mobile app for data collection | React Native (Android/iOS) |
| **Synkronus** | Server managing sync & storage | Go + PostgreSQL |
| **Formplayer** | Form rendering engine | React |
| **Synkronus CLI** | Server administration tool | Go CLI |

## Who Uses ODE?

### 👩‍💻 **Data Collectors**
Field workers, researchers, and community health workers collecting data on mobile devices.

→ **[Start here if you're collecting data](/docs/collector)**

### 📋 **Implementers**
Form designers, project managers, and NGO leaders designing and deploying forms.

→ **[Start here if you're designing forms](/docs/implementer)**

### ⚙️ **Developers**
Engineers building, extending, or contributing to ODE.

→ **[Start here if you're developing](/docs/developer)**

## Why Choose ODE?

### For Organizations
- **Cost-Effective** - No licensing fees; run on your own infrastructure
- **Customizable** - Adapt forms and workflows to your needs
- **Reliable** - Designed for challenging environments (poor connectivity, limited power)
- **Transparent** - Audit the code, understand what's happening with your data
- **Sustainable** - Community-driven development, long-term support

### For Developers
- **Modern Stack** - React Native, React, Go—industry-standard technologies
- **Well-Documented** - Clear guides and API documentation
- **Extensible** - Build custom integrations and applications
- **Community** - Active development team and growing contributor community
- **Educational** - Learn mobile development, synchronization patterns, offline-first architecture

### For Data
- **Open Format** - Data isn't locked in proprietary systems
- **Export Options** - Multiple formats (Parquet, JSON, CSV via export tools)
- **Compliance** - Built with privacy and security in mind
- **Ownership** - You control your data, your server, your infrastructure

## Quick Links

- **First time here?** → Start with [Getting Started](/docs/welcome)
- **Using Formulus?** → Go to [Data Collector Guide](/docs/collector)
- **Designing forms?** → Go to [Implementer Guide](/docs/implementer)
- **Contributing to ODE?** → Go to [Developer Guide](/docs/developer)
- **Need help?** → See [Community & Support](/docs/community/getting-help)

## Architecture Overview

At a high level, ODE uses a **client-server architecture** optimized for offline-first data collection:

```
                    Internet Connection
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌─────────┐         ┌─────────┐      ┌──────────┐
    │ Formulus│         │Formulus │      │Synkronus │
    │ (Device 1)        │(Device 2)      │(Server)  │
    └─────────┘         └─────────┘      └──────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
            Sync Protocol (offline-capable)
            
    Local Storage: WatermelonDB (offline-first)
    Server Storage: PostgreSQL
    Rendering Engine: Formplayer (React WebView)
```

- **Each device** stores data locally and works offline
- **Automatic sync** when connection is available
- **Conflict resolution** ensures data consistency
- **Server** provides single source of truth for data

## Ready to Get Started?

Choose your path based on your role:

### 👩‍💻 I'm collecting data with Formulus
→ [Collector Quick Start](/docs/collector/getting-started)

### 📋 I'm designing forms and managing projects
→ [Implementer Quick Start](/docs/implementer/overview)

### ⚙️ I'm developing or contributing to ODE
→ [Developer Quick Start](/docs/developer/getting-started)

### ❓ I just want to learn more
→ Continue reading [Why ODE?](/docs/welcome/why-ode) or [Key Concepts](/docs/welcome/key-concepts)

---

**Questions?** [Get help from the community](/docs/community/getting-help)
