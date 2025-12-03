---
sidebar_position: 4
---

# Upload Test Data

Upload sample data to your local ODE instance for testing.

## Overview

This guide shows you how to upload test data to your local Synkronus instance.

## Using Synkronus CLI

The easiest way to upload test data is using the Synkronus CLI:

```bash
synkronus-cli data upload --file test-data.json
```

## Manual Upload

You can also upload data manually using the API:

```bash
curl -X POST http://localhost:8080/api/v1/data \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

## Next Steps

- [Create Your First Form](/docs/build/forms/overview)
- [Build a Custom App](/docs/build/custom-applications/overview)

