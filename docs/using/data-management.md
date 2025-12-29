---
sidebar_position: 4
---

# Data Management

This guide covers viewing, editing, and managing observations in ODE.

## Viewing Observations

Observations can be viewed in the Formulus app:

1. Navigate to the observations list
2. Filter observations by form type, date, or sync status
3. Select an observation to view details
4. Review the form data and metadata

## Editing Observations

To edit an observation:

1. Open the observation from the list
2. Select the edit option
3. Modify the form fields as needed
4. Save your changes

Edited observations are marked for synchronization and will be updated on the server during the next sync operation.

## Deleting Observations

Observations can be deleted:

1. Open the observation
2. Select the delete option
3. Confirm the deletion

Deleted observations are marked as deleted locally and synchronized to the server. The server maintains a record of deleted observations for audit purposes.

## Filtering and Searching

The observations list supports filtering by:

- Form type
- Date range
- Sync status (synced, pending, error)
- Custom criteria based on form data

## Exporting Data

Data can be exported from the server using multiple methods:

<Tabs>
  <TabItem value="cli" label="CLI">

Export all observations as a Parquet ZIP archive:

```bash
synk data export exports.zip
```

Export to different formats:

```bash
# Parquet (default)
synk data export observations.zip

# JSON
synk data export observations.json --format json

# CSV
synk data export observations.csv --format csv
```

  </TabItem>
  <TabItem value="curl" label="curl">

```bash
curl -X GET http://your-server:8080/api/dataexport/parquet \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o observations.zip
```

  </TabItem>
  <TabItem value="portal" label="Portal">

1. Navigate to the Portal
2. Go to the "Data Export" section
3. Select export format (Parquet, JSON, CSV)
4. Click "Export" to download

  </TabItem>
</Tabs>

The export includes all observations in the selected format, organized by schema type. See the [API Reference](/reference/api) for details.

## Data Synchronization

Observations are synchronized between devices and the server automatically. See [Synchronization](/using/synchronization) for details on how synchronization works.

## Next Steps

- Learn about [synchronization](/using/synchronization) in detail
- Review the [API Reference](/reference/api/endpoints) for programmatic access
- Explore [data export options](/reference/api/endpoints) for analysis

