---
sidebar_position: 2
---

# Observations

Manage form submission data (observations) in ODE.

## Overview

An **observation** is a single data record:
- Created when user fills out a form
- Contains answers to form questions
- Includes metadata (who, when, where)
- May have attachments (photos, etc.)

## Observation Structure

When a user submits a form, an observation is created:

```json
{
  "id": "uuid-generated-on-device",
  "formId": "registration",
  "schemaType": "registration",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-05-15",
    "gender": "male",
    "phoneNumber": "0712345678",
    "email": "john.doe@example.com",
    "consent": true
  },
  "metadata": {
    "createdAt": "2025-12-11T10:30:00Z",
    "updatedAt": "2025-12-11T10:35:00Z",
    "createdBy": "fieldworker1",
    "deviceId": "device-uuid",
    "appVersion": "1.0.0",
    "location": {
      "latitude": -1.2921,
      "longitude": 36.8219,
      "accuracy": 10
    }
  },
  "attachments": [
    {
      "id": "attachment-uuid",
      "field": "patientPhoto",
      "filename": "photo_123.jpg",
      "mimeType": "image/jpeg",
      "size": 245678
    }
  ],
  "status": "pending",
  "syncedAt": null
}
```

## Observation Lifecycle

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Draft  │────▶│ Pending │────▶│ Syncing │────▶│ Synced  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │
     │               │               │
     ▼               ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Deleted │     │  Error  │────▶│  Retry  │
└─────────┘     └─────────┘     └─────────┘
```

### States

| State | Description | Actions |
|-------|-------------|---------|
| **Draft** | Incomplete, saved locally | Edit, Delete, Submit |
| **Pending** | Complete, awaiting sync | Edit (maybe), Delete |
| **Syncing** | Currently uploading | Wait |
| **Synced** | Successfully uploaded | View |
| **Error** | Sync failed | Retry, View error |

## Managing Observations

### Viewing Observations

In the Formulus app:

1. **Go to Observations screen**
2. **See list of all saved observations**
3. **Each entry shows:**
   - Form name
   - Date/time created
   - Status (draft, pending, synced)
   - Key data fields

### Filtering and Search

- **Filter by form type** - Dropdown or tabs
- **Filter by status** - Draft, pending, synced
- **Search** - Find by keyword
- **Sort** - By date, form name, status

### Editing Observations

#### Edit Draft

1. **Tap on draft observation**
2. **Form opens with saved data**
3. **Make changes**
4. **Save or Submit**

#### Edit Pending (if allowed)

1. **Tap on pending observation**
2. **May need to "Unlock" for editing**
3. **Make changes**
4. **Re-submit**

### Deleting Observations

1. **Long-press on observation** or tap menu (⋮)
2. **Select "Delete"**
3. **Confirm deletion**

**Note:** Synced observations may not be deletable locally.

## Sync Protocol

### Pull (Server → Device)

```json
// Request
GET /sync/pull?since=1702300000&schemaTypes=registration,visit

// Response
{
  "observations": [...],
  "lastChangeId": 12345,
  "hasMore": false
}
```

### Push (Device → Server)

```json
// Request
POST /sync/push
{
  "clientId": "device-uuid",
  "observations": [
    {
      "id": "local-uuid",
      "schemaType": "registration",
      "data": {...},
      "createdAt": "2025-12-11T10:30:00Z"
    }
  ]
}

// Response
{
  "accepted": ["local-uuid"],
  "rejected": [],
  "warnings": []
}
```

### Attachment Sync

Attachments sync separately:

```
1. Observation syncs first (with attachment references)
2. Attachments queue for upload
3. Each attachment uploads individually
4. Server confirms receipt
```

## Querying Observations

### Via API

```bash
# Get all observations
curl http://localhost/api/v1.0.0/observations \
  -H "Authorization: Bearer $TOKEN"

# Filter by schema type
curl "http://localhost/api/v1.0.0/observations?schemaType=registration" \
  -H "Authorization: Bearer $TOKEN"

# Filter by date range
curl "http://localhost/api/v1.0.0/observations?since=2025-12-01&until=2025-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

### Via CLI

```bash
# Export observations
./bin/synk data export observations.zip

# Export with filters (if supported)
./bin/synk data export --schema-type registration output.zip
```

## Data Export

### Export Format

The export creates a ZIP containing Parquet files:

```
export.zip
├── observations.parquet
├── attachments.parquet
└── metadata.json
```

### Export via CLI

```bash
# Export all observations as Parquet
./bin/synk data export observations.zip

# Export with filters (if supported)
./bin/synk data export --schema-type registration output.zip
```

## Best Practices

### Data Quality

1. **Validate early** - Client-side validation
2. **Require key fields** - Don't allow empty
3. **Use formats** - date, email, etc.
4. **Capture metadata** - Who, when, where
5. **Handle offline** - Graceful sync

### Sync Management

1. **Sync before fieldwork** - Get latest forms
2. **Save frequently** - Avoid data loss
3. **Check pending count** - Before leaving field
4. **Sync immediately** - When back online

## Troubleshooting

### Issue: Observations stuck as "Pending"

**Try:**

1. Check network connection
2. Manual sync from Sync screen
3. Check for sync errors
4. Verify server is running

### Issue: Sync fails with error

**Check logs:**

1. Open app developer menu
2. Check sync error message
3. Review server logs

**Common causes:**

- Network timeout
- Server error
- Authentication expired
- File too large

### Issue: Attachments won't upload

**Check:**

1. File size (may be too large)
2. Network connection
3. Server storage space
4. Retry from Sync screen

## Related Content

- [Forms Overview](/docs/build/forms/overview)
- [Data Export](/docs/build/data-management/export)
- [Synchronization](/docs/build/synchronization/overview)
- [Database Schema](/docs/technical-overview/database/schema)
