# Vercel Deployment Guide

This guide explains how to deploy the Shift Manager App to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Your code should be in a Git repository
3. **Neon Database**: Ensure your Neon PostgreSQL database is running

## Environment Variables Setup

### 1. Create Environment Variables in Vercel

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_nPmqbF1z3YXd@ep-cold-bird-ado4sqar-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
CORS_ORIGIN=*
NODE_ENV=production
```

### 2. Local Development

Create a `.env` file in your project root:

```bash
# Database Configuration
DATABASE_URL=postgresql://neondb_owner:npg_nPmqbF1z3YXd@ep-cold-bird-ado4sqar-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration (for production)
CORS_ORIGIN=*
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name
   - Confirm deployment

### Option 2: Deploy via GitHub Integration

1. **Connect your GitHub repository** to Vercel
2. **Vercel will automatically detect** the Node.js project
3. **Set environment variables** in the Vercel dashboard
4. **Deploy** - Vercel will build and deploy automatically

## Project Structure for Vercel

```
shift-manager-app/
├── api/                 # Backend API folder
│   ├── server.js        # Main server file
│   ├── database.js      # Database service
│   └── api-service.js   # Frontend API service
├── index.html           # Frontend application
├── package.json         # Dependencies
├── package-lock.json    # Lock file
├── vercel.json          # Vercel configuration
├── .env                 # Environment variables (create this)
├── .gitignore           # Git ignore file
└── README files
```

## Important Notes

### 1. Database Connection
- The app uses Neon serverless PostgreSQL
- Connection string is stored in environment variables
- SSL is required for Neon connections

### 2. CORS Configuration
- CORS is configured to allow all origins in production
- You can restrict this by setting `CORS_ORIGIN` to specific domains

### 3. Function Timeout
- Vercel functions have a 30-second timeout
- Database operations should complete within this limit

### 4. Cold Starts
- Serverless functions may experience cold starts
- First request might be slower

### 5. Project Structure
- Backend files are organized in the `/api` folder
- Frontend files remain in the root directory
- Vercel automatically routes API requests to the correct backend

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `DATABASE_URL` environment variable
   - Verify Neon database is running
   - Check SSL configuration

2. **Build Errors**
   - Ensure all dependencies are in `package.json`
   - Check Node.js version compatibility
   - Verify `api/server.js` exists and is properly configured

3. **API Endpoints Not Working**
   - Verify `vercel.json` routing configuration
   - Check environment variables are set
   - Ensure backend files are in the `api/` folder

### Debugging

1. **Check Vercel Logs**:
   - Go to your project dashboard
   - Click on a deployment
   - View function logs

2. **Test Locally**:
   ```bash
   npm install
   npm run dev
   ```

3. **Verify Environment Variables**:
   ```bash
   vercel env ls
   ```

4. **Check Project Structure**:
   - Ensure `api/server.js` exists
   - Verify `vercel.json` points to correct paths
   - Check that all backend files are in `api/` folder

## Post-Deployment

1. **Test all functionality** on the deployed URL
2. **Monitor database connections** and performance
3. **Set up custom domain** if needed
4. **Configure monitoring** and alerts

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database Access**: Use connection pooling and SSL
3. **CORS**: Restrict origins in production if possible
4. **Rate Limiting**: Consider adding rate limiting for API endpoints

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review Neon database logs
3. Check application logs in Vercel dashboard
4. Verify all environment variables are set correctly
5. Confirm project structure matches the expected layout
