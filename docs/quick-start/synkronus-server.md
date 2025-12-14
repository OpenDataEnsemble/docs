---
sidebar_position: 3
---

# Synkronus Server Setup

Set up the Synkronus server using Docker Compose, including PostgreSQL database and Nginx reverse proxy.

## Overview

The server setup uses Docker Compose to run three services:

1. **PostgreSQL** - Database server
2. **Synkronus** - Go API server
3. **Nginx** - Reverse proxy (all traffic routes through nginx)

All services communicate through Docker's internal network, with only Nginx exposed to the host.

## Architecture

```
┌─────────────────────────────────────────┐
│         Docker Network                  │
│                                         │
│  ┌──────────┐      ┌──────────────┐   │
│  │  Nginx   │──────▶│  Synkronus  │   │
│  │  :80     │      │   :8080      │   │
│  └────┬─────┘      └──────┬──────┘   │
│       │                    │           │
│       │                    │           │
│       │            ┌────────▼──────┐   │
│       │            │  PostgreSQL  │   │
│       │            │    :5432      │   │
│       │            └──────────────┘   │
│       │                                 │
└───────┼─────────────────────────────────┘
        │
        │ Port 80 (exposed)
        │
   ┌────▼────┐
   │  Host   │
   │ Machine │
   └─────────┘
```

## Step 1: Navigate to Synkronus Directory

```bash
cd synkronus
```

## Step 2: Create Docker Compose Configuration

Copy the example configuration:

```bash
cp docker-compose.example.yml docker-compose.yml
```

## Step 3: Configure Docker Compose

Edit `docker-compose.yml` and update the following values:

### Required Configuration

1. **PostgreSQL Password** (line 78):
   ```yaml
   POSTGRES_PASSWORD: "YourSecurePassword"
   ```

2. **Database Connection** (line 48):
   ```yaml
   DB_CONNECTION: "postgres://synkronus_user:YourPassword@postgres:5432/synkronus?sslmode=disable"
   ```
   Replace `YourPassword` with the same password you'll use for the database user.

3. **JWT Secret** (line 51):
   ```yaml
   JWT_SECRET: "YourRandom32CharacterString"
   ```
   Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

4. **Admin Password** (line 53):
   ```yaml
   ADMIN_PASSWORD: "YourAdminPassword"
   ```

### Example Configuration

```yaml
services:
  postgres:
    environment:
      POSTGRES_PASSWORD: "Password"
  
  synkronus:
    environment:
      DB_CONNECTION: "postgres://synkronus_user:Password@postgres:5432/synkronus?sslmode=disable"
      JWT_SECRET: "YourGeneratedSecretHere"
      ADMIN_PASSWORD: "Password"
```

## Step 4: Start PostgreSQL

Start the PostgreSQL container first:

```bash
docker compose up -d postgres
```

Wait a few seconds for PostgreSQL to initialize:

```bash
sleep 5
```

## Step 5: Create Database and User

Create the database user and database:

```bash
# Create user (ignore error if already exists)
docker compose exec -T postgres psql -U postgres -c "CREATE ROLE synkronus_user LOGIN PASSWORD 'Password';" 2>&1 || echo "User may already exist"

# Create database (ignore error if already exists)
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE synkronus OWNER synkronus_user;" 2>&1 || echo "Database may already exist"
```

**Note:** Replace `Password` with the password you configured in `docker-compose.yml`.

## Step 6: Start All Services

Start all services (PostgreSQL, Synkronus, and Nginx):

```bash
docker compose up -d
```

## Step 7: Verify Services

Check that all services are running:

```bash
docker compose ps
```

**Expected output:**

```
NAME                    STATUS
synkronus-nginx-1        Up (healthy)
synkronus-postgres-1    Up (healthy)
synkronus-synkronus-1   Up (healthy)
```

## Step 8: Test Server Health

Test the health endpoint through nginx:

```bash
curl http://localhost/health
```

**Expected output:**

```
OK
```

## Service Management

### View All Services

```bash
docker compose ps
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f synkronus
docker compose logs -f nginx
docker compose logs -f postgres
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart synkronus
```

### Stop Services

```bash
docker compose stop
```

### Start Services

```bash
docker compose start
```

### Stop and Remove (Keep Data)

```bash
docker compose down
```

### Stop and Remove Everything (Including Data)

```bash
docker compose down -v
```

**⚠️ Warning:** The `-v` flag removes volumes, including your database data!

## Network Configuration

### Finding Your Local IP Address

For connecting from mobile devices, you'll need your machine's IP address:

```bash
# Linux
hostname -I | awk '{print $1}'

# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1
```

**Example output:**

```
192.168.100.7
```

### Accessing from Mobile Device

The server will be accessible at:

```
http://YOUR_IP_ADDRESS
```

For example:

```
http://192.168.100.7
```

## Troubleshooting

### Issue: Port 80 already in use

**Solution:** Stop the service using port 80:

```bash
sudo lsof -i :80
sudo kill -9 <PID>
```

Or change nginx port in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Issue: Database connection fails

**Check:**

1. PostgreSQL is running: `docker compose ps postgres`
2. Database exists: `docker compose exec postgres psql -U postgres -l`
3. Connection string matches: Check `DB_CONNECTION` in `docker-compose.yml`

### Issue: Synkronus won't start

**Check logs:**

```bash
docker compose logs synkronus
```

**Common causes:**

- Database not ready (wait a few seconds)
- Wrong database credentials
- Missing JWT_SECRET

### Issue: Nginx returns 502 Bad Gateway

**Check:**

1. Synkronus is running: `docker compose ps synkronus`
2. Synkronus is healthy: `docker compose logs synkronus | tail -20`
3. Network connectivity: Services are on the same Docker network

## Verification Checklist

- [ ] All three services are running (`docker compose ps`)
- [ ] Health endpoint returns OK (`curl http://localhost/health`)
- [ ] No errors in logs (`docker compose logs`)
- [ ] Can access from localhost
- [ ] Know your local IP address for mobile access

## Next Steps

Now that your server is running:

1. **Proceed to** [Formulus App Setup](/docs/quick-start/formulus-app) to configure and run the Android app
2. **Or** continue with [Synkronus CLI Setup](/docs/components/synkronus-cli/installation) for server management
