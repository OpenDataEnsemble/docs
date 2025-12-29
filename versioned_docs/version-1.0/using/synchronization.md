---
sidebar_position: 5
---

# Synchronization

Synchronization is the process of exchanging data between mobile devices and the Synkronus server.

## How Synchronization Works

ODE uses a bidirectional synchronization protocol:

1. **Push**: Local observations are sent to the server
2. **Pull**: New or updated observations are retrieved from the server
3. **Conflict Resolution**: Conflicts are resolved automatically using version numbers

## Synchronization Process

### Automatic Synchronization

Synchronization occurs automatically when:

- The app is opened and network connectivity is available
- A new observation is created or modified
- A manual sync is triggered by the user
- A scheduled sync interval elapses

### Manual Synchronization

Users can trigger manual synchronization:

1. Open the app settings
2. Navigate to synchronization options
3. Select "Sync Now"
4. Wait for the sync to complete

## Conflict Resolution

When the same observation is modified on multiple devices, ODE resolves conflicts automatically:

- Each observation has a version number
- The version number is incremented on each modification
- During sync, the observation with the highest version number is kept
- If versions are equal, the most recent modification timestamp is used

## Sync Status

Observations have a sync status that indicates their synchronization state:

| Status | Description |
|--------|-------------|
| **Pending** | Observation is waiting to be synchronized |
| **Syncing** | Synchronization is in progress |
| **Synced** | Observation has been successfully synchronized |
| **Error** | Synchronization failed (will be retried) |

## Attachment Synchronization

Attachments (photos, audio, files) are synchronized separately from observation metadata:

1. Observation metadata is synchronized first
2. Attachments are uploaded or downloaded in a separate phase
3. Attachment sync status is tracked independently

See the [Technical Details](/development/technical/sync-protocol) section for more information on the sync protocol.

## Troubleshooting Sync Issues

If synchronization is not working:

1. Check network connectivity
2. Verify server accessibility
3. Review authentication credentials
4. Check server logs for errors
5. Review the [Troubleshooting guide](/using/troubleshooting)

## Next Steps

- Learn about [working offline](/using/working-offline)
- Review [technical sync details](/development/technical/sync-protocol)
- Explore [API endpoints](/reference/api/endpoints) for sync operations

