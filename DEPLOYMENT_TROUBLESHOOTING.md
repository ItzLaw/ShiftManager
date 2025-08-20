# Deployment Troubleshooting Guide

## Issues Fixed

### 1. 404 Error for api-service.js
**Problem**: The `api-service.js` file was being loaded from `/api/api-service.js` but the server wasn't serving static files from the `/api` directory.

**Solution**: Moved `api-service.js` to the root directory and updated the HTML to reference it from there.

### 2. MIME Type Error
**Problem**: The server was returning HTML (404 page) instead of JavaScript, causing MIME type errors.

**Solution**: Updated `vercel.json` to properly handle static files and ensure JavaScript files are served with correct MIME types.

### 3. apiService is not defined
**Problem**: The script was failing to load, so the global `apiService` variable was never created.

**Solution**: Added a fallback mechanism that creates a mock `apiService` if the real one fails to load.

## Current Configuration

### File Structure
```
/
├── index.html              # Main application
├── api-service.js          # API service (moved from /api/)
├── api/
│   ├── server.js           # Express server
│   └── database.js         # Database service
└── vercel.json             # Vercel configuration
```

### Vercel Configuration
The `vercel.json` now properly handles:
- Static files (JS, CSS, images) are served directly
- API routes (`/api/*`) are routed to the server
- All other routes fall back to the server

### API Service
The `api-service.js` now includes:
- Better error handling and debugging
- Automatic URL detection for production/development
- Fallback mechanism if the service fails to load

## Environment Variables Required

Make sure these are set in your Vercel environment:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: Should be set to "production"

## Testing the Deployment

1. **Check API Health**: Visit `/api/health` to verify the server is running
2. **Test API Connection**: Visit `/api/test` to test basic API functionality
3. **Check Console**: Open browser console to see API connection logs
4. **Database Connection**: Verify database connection in server logs

## Common Issues and Solutions

### Database Connection Fails
- Check `DATABASE_URL` environment variable
- Ensure database is accessible from Vercel's servers
- Check SSL configuration for PostgreSQL

### Static Files Not Loading
- Verify file paths in HTML
- Check `vercel.json` routing configuration
- Ensure files are in the correct directories

### API Routes Return 404
- Check server.js route definitions
- Verify `vercel.json` API routing
- Check server logs for errors

## Debugging Steps

1. **Check Browser Console**: Look for JavaScript errors
2. **Check Network Tab**: Verify API calls and responses
3. **Check Server Logs**: Look for server-side errors
4. **Test Individual Endpoints**: Use tools like Postman to test API routes

## Deployment Checklist

- [ ] All files are in the correct directories
- [ ] Environment variables are set in Vercel
- [ ] Database is accessible from Vercel
- [ ] Static files are being served correctly
- [ ] API routes are responding properly
- [ ] Error handling is working as expected
