---
sidebar_position: 3
---

# Deploy Local Instance

Set up a local ODE environment for development and testing.

## Overview

This guide will help you deploy a local Synkronus server instance for development and testing.

## Prerequisites

- Docker and Docker Compose installed
- Basic familiarity with command line tools

## Quick Start

1. Clone the Synkronus repository
2. Configure environment variables
3. Start the Docker containers
4. Access the server at `http://localhost:8080`

## Detailed Instructions

### Step 1: Clone Repository

```bash
git clone https://github.com/OpenDataEnsemble/ode.git
cd ode/synkronus
```

### Step 2: Configure Environment

Create a `.env` file with your database configuration:

```env
DATABASE_URL=postgres://user:password@localhost:5432/synkronus
SERVER_PORT=8080
```

### Step 3: Start Services

```bash
docker-compose up -d
```

### Step 4: Verify Installation

Check that services are running:

```bash
docker-compose ps
```

## Next Steps

- [Upload Test Data](/docs/quick-start/upload-test-data)
- [Connect Formulus](/docs/components/formulus/configuration)

