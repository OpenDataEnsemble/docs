---
sidebar_position: 5
---

# Formulus Troubleshooting

Common issues and solutions for the Formulus mobile application.

## Quick Reference

| Issue | Solution | Section |
|-------|----------|---------|
| App won't connect to server | Check server URL, network | [Connection Issues](#connection-issues) |
| Forms don't appear | Sync app bundle | [Sync Issues](#sync-issues) |
| Can't submit form | Check validation errors | [Form Issues](#form-issues) |
| Observations stuck pending | Check sync status | [Sync Issues](#sync-issues) |
| App crashes | Check logs, reinstall | [App Issues](#app-issues) |
| GPS not working | Check permissions, signal | [Permission Issues](#permission-issues) |

## Connection Issues

### Issue: "Connection failed"

**Check:**

1. Server URL is correct (use IP, not localhost)
2. Device has network access
3. Server is running
4. Same network as server

**Solutions:**

```bash
# Test server from device network
curl http://YOUR_SERVER_IP/health

# Check server is running
cd synkronus
docker compose ps

# Verify nginx is healthy
docker compose logs nginx
```

### Issue: "Unable to reach server"

**Check:**

1. Firewall allows port 80
2. Server IP hasn't changed
3. Device and server on same network

**Solution:**

```bash
# Find your server IP
hostname -I | awk '{print $1}'  # Linux
ifconfig | grep "inet " | grep -v 127.0.0.1  # macOS

# Update server URL in app settings
```

### Issue: "Authentication failed"

**Check:**

1. Username and password are correct
2. User exists on server
3. Server authentication is working

**Solution:**

```bash
# Test login via API
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Password"}'

# If fails, check server logs
docker compose logs synkronus
```

## Sync Issues

### Issue: Forms don't appear

**Try:**

1. Go to Sync screen
2. Tap "Sync Now"
3. Wait for app bundle download
4. Check Forms screen again

**If still not working:**

```bash
# Check app bundle is uploaded
cd synkronus-cli
./bin/synk app-bundle versions

# Check bundle is activated
./bin/synk app-bundle manifest

# Re-upload if needed
./bin/synk app-bundle upload bundle.zip --activate
```

### Issue: Observations stuck as "Pending"

**Try:**

1. Check network connection
2. Manual sync from Sync screen
3. Check for sync errors
4. Verify server is running

**Check sync status:**

```bash
# Check server is accessible
curl http://localhost/health

# Check server logs
docker compose logs synkronus | grep -i sync
```

### Issue: Photo won't upload

**Check:**

1. File size (may be too large)
2. Network connection
3. Server storage space
4. Retry from Sync screen

**Solution:**

```bash
# Check server storage
docker compose exec synkronus df -h

# Check attachment size limits in server config
```

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

**Solution:**

```bash
# Check server logs
docker compose logs synkronus --tail 50

# Restart sync from app
# Or restart server
docker compose restart synkronus
```

## Form Issues

### Issue: Can't submit form

**Check:**

1. All required fields filled
2. Validation errors shown
3. Form is not read-only

**Validation errors:**

- Red highlight on invalid fields
- Error messages below fields
- Cannot submit until resolved

### Issue: Form shows blank screen

**Check:**

1. App bundle synced successfully
2. Form schema is valid
3. Check app logs

**Solution:**

```bash
# Check app logs
adb logcat | grep -i "formulus\|form"

# Re-sync app bundle
# Go to Sync screen → Sync Now
```

### Issue: Field not showing

**Check:**

1. Conditional logic - field may be hidden
2. Form schema - field may not be defined
3. UI schema - field may not be included

**Solution:**

- Check form schema and UI schema
- Verify conditional rules
- Test form in formplayer web app

## App Issues

### Issue: App crashes on startup

**Try:**

1. Force close and reopen
2. Clear app cache (Settings)
3. Reinstall app (last resort)
4. Check device storage space

**Check logs:**

```bash
# Android logs
adb logcat | grep -i "formulus\|crash"

# Check for errors
adb logcat *:E | grep formulus
```

### Issue: App won't install

**Check:**

1. Device has enough storage
2. Unknown sources enabled (for APK)
3. Android version compatible

**Solution:**

```bash
# Check device storage
adb shell df -h

# Check Android version
adb shell getprop ro.build.version.release

# Rebuild and install
cd formulus
npm run android
```

### Issue: "Unable to resolve module"

**Solution:**

```bash
cd formulus
rm -rf node_modules
npm install
npm start -- --reset-cache
```

## Permission Issues

### Issue: GPS not working

**Check:**

1. Location permission granted
2. GPS enabled on device
3. Good GPS signal (outdoors)
4. Wait for accuracy to improve

**Solution:**

1. Go to device Settings → Apps → Formulus → Permissions
2. Enable Location permission
3. Try again outdoors for better signal

### Issue: Camera not working

**Check:**

1. Camera permission granted
2. Camera hardware available
3. No other app using camera

**Solution:**

1. Go to device Settings → Apps → Formulus → Permissions
2. Enable Camera permission
3. Close other camera apps
4. Restart Formulus app

### Issue: Microphone not working

**Check:**

1. Microphone permission granted
2. Microphone hardware available
3. No other app using microphone

**Solution:**

1. Go to device Settings → Apps → Formulus → Permissions
2. Enable Microphone permission
3. Test with device voice recorder first

## Configuration Issues

### Issue: QR code won't scan

**Possible causes:**

- Image too small
- Poor lighting
- Damaged/blurry print

**Solutions:**

- Display larger on screen
- Improve lighting
- Reprint at higher quality
- Use manual configuration instead

### Issue: Settings won't save

**Check:**

1. All fields filled correctly
2. Connection test successful
3. App has storage permission

**Solution:**

1. Test connection first
2. Save settings
3. Restart app
4. Verify settings persisted

## Performance Issues

### Issue: App is slow

**Check:**

1. Device storage space
2. Number of observations
3. App cache size

**Solution:**

1. Clear app cache (Settings)
2. Sync and remove old observations
3. Restart device
4. Reinstall app if needed

### Issue: Forms load slowly

**Check:**

1. App bundle size
2. Number of forms
3. Device performance

**Solution:**

- Optimize app bundle size
- Reduce number of forms
- Use simpler form schemas

## Getting Help

If you're still experiencing issues:

1. **Check logs:**
   ```bash
   adb logcat | grep formulus
   ```

2. **Review documentation:**
   - [Formulus Configuration](/docs/components/formulus/configuration)
   - [Formulus Features](/docs/components/formulus/features)
   - [Synchronization Troubleshooting](/docs/build/synchronization/troubleshooting)

3. **Report issues:**
   - Include error messages
   - Device information
   - Steps to reproduce
   - Relevant logs

## Related Content

- [Formulus Configuration](/docs/components/formulus/configuration)
- [Formulus Features](/docs/components/formulus/features)
- [Synchronization Troubleshooting](/docs/build/synchronization/troubleshooting)
