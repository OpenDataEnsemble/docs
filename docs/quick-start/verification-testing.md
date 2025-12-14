---
sidebar_position: 5
---

# Verification & Testing

Verify that your ODE setup is working correctly by testing all components.

## Prerequisites

Before verification, ensure:

- [ ] Server is running (see [Synkronus Server Setup](/docs/quick-start/synkronus-server))
- [ ] Formulus app is installed on device (see [Formulus App Setup](/docs/quick-start/formulus-app))
- [ ] Device and server are on the same network

## Step 1: Verify Server Health

### Check Server Status

```bash
curl http://localhost/health
```

**Expected output:**

```
OK
```

### Check Server Version

```bash
curl http://localhost/api/v1.0.0/version
```

**Expected output:**

```json
{
  "version": "dev",
  "database": "postgresql ...",
  "system": "linux/amd64",
  "goVersion": "go1.24.2"
}
```

### Check Docker Services

```bash
cd synkronus
docker compose ps
```

All services should show `Up (healthy)`:

```
NAME                    STATUS
synkronus-nginx-1        Up (healthy)
synkronus-postgres-1    Up (healthy)
synkronus-synkronus-1   Up (healthy)
```

## Step 2: Verify Database Connection

### Check Database is Accessible

```bash
docker compose exec postgres psql -U synkronus_user -d synkronus -c "SELECT version();"
```

**Expected output:**

```
PostgreSQL 17.x ...
```

### Check Tables Exist

```bash
docker compose exec postgres psql -U synkronus_user -d synkronus -c "\dt"
```

You should see tables like `users`, `observations`, `app_bundles`, etc.

## Step 3: Verify API Endpoints

### Test Authentication

```bash
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Password"}'
```

**Expected output:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": 1765557228
}
```

### Test Protected Endpoint

```bash
TOKEN="YOUR_TOKEN_FROM_ABOVE"
curl http://localhost/api/v1.0.0/users \
  -H "Authorization: Bearer $TOKEN"
```

**Expected output:**

```json
[
  {
    "id": "...",
    "username": "admin",
    "role": "admin"
  }
]
```

## Step 4: Verify Mobile App Connection

### Check App is Installed

```bash
adb shell pm list packages | grep formulus
```

**Expected output:**

```
package:com.opendataensemble.formulus
```

### Check App Can Reach Server

1. **Open Formulus app** on device
2. **Go to Settings**
3. **Enter server URL**: `http://YOUR_IP_ADDRESS`
4. **Tap "Test Connection"**

**Expected:** "Connection successful" message

### Verify Login

1. **Enter credentials** in app
2. **Tap "Login"**
3. **Should see** main dashboard/home screen

## Step 5: Test Full Workflow

### Upload App Bundle (via CLI)

```bash
cd synkronus-cli
./bin/synk login -u admin
./bin/synk app-bundle upload /path/to/bundle.zip --activate
```

### Sync from Mobile App

1. **Open Formulus app**
2. **Go to Sync screen**
3. **Tap "Sync Now"**
4. **Wait for download** - Forms should appear

### Fill Out a Form

1. **Go to Forms screen**
2. **Select a form**
3. **Fill in required fields**
4. **Submit form**

### Verify Data Sync

1. **Check observation was created** (should show in Observations screen)
2. **Verify sync status** (should show "Pending" then "Synced")
3. **Check server** - Data should be in database

## Troubleshooting

### Server Health Check Fails

**Check:**

1. Services are running: `docker compose ps`
2. Nginx is healthy: `docker compose logs nginx`
3. Synkronus is healthy: `docker compose logs synkronus`

### Database Connection Fails

**Check:**

1. PostgreSQL is running: `docker compose ps postgres`
2. Credentials are correct: Check `docker-compose.yml`
3. Database exists: `docker compose exec postgres psql -U postgres -l`

### Mobile App Can't Connect

**Check:**

1. Server IP is correct (not localhost)
2. Device and server on same network
3. Firewall allows port 80
4. Server is accessible: `curl http://YOUR_IP/health`

### Forms Don't Appear

**Check:**

1. App bundle was uploaded successfully
2. Bundle is activated: `./bin/synk app-bundle versions`
3. Sync completed: Check sync screen in app
4. App bundle version matches

## Verification Checklist

- [ ] Server health endpoint returns OK
- [ ] All Docker services are healthy
- [ ] Database is accessible
- [ ] API authentication works
- [ ] Mobile app can connect to server
- [ ] Login works in mobile app
- [ ] App bundle syncs successfully
- [ ] Forms appear in mobile app
- [ ] Can fill out and submit forms
- [ ] Data syncs to server

## Next Steps

Once everything is verified:

1. **Start collecting data** with your forms
2. **Explore** [Formulus Features](/docs/components/formulus/features)
3. **Learn** about [Forms and Observations](/docs/build/forms/overview)
4. **Deploy** your own [Custom Applications](/docs/build/custom-applications/overview)

