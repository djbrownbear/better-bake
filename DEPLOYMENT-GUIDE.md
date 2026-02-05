# Production Deployment Guide

## Prerequisites

1. **Railway Account**: Sign up at https://railway.app
2. **Vercel Account**: Sign up at https://vercel.com
3. **GitHub Repository**: Already connected (djbrownbear/better-bake)

---

## Part 1: Backend Deployment (Railway)

### Step 1: Create Railway Project

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select **djbrownbear/better-bake**
4. Railway will detect the monorepo

### Step 2: Configure Backend Service

1. In Railway dashboard, click **"New"** → **"Empty Service"**
2. Click **"Settings"** tab:
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### Step 3: Add PostgreSQL Database

1. Click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically sets `DATABASE_URL` environment variable
3. The backend service will automatically connect to it

### Step 4: Set Environment Variables

In the backend service **"Variables"** tab, add:

```
NODE_ENV=production
JWT_SECRET=<GENERATE_SECURE_32_CHAR_STRING>
CORS_ORIGIN=https://better-bake.vercel.app
PORT=3001
```

**Generate JWT_SECRET**:
```bash
# Run this in PowerShell to generate a secure secret:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Step 5: Deploy Backend

1. Click **"Deploy"** in Railway dashboard
2. Monitor deployment logs
3. Once deployed, note your **Railway URL**: `https://your-app.railway.app`

### Step 6: Run Database Migrations

Railway automatically runs migrations on deploy via `postinstall` hook.

To verify database:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link project
railway login
railway link

# Open Prisma Studio (connected to production DB)
railway run npm run prisma:studio
```

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Connect to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Project"**
3. Select **djbrownbear/better-bake** from GitHub
4. Vercel auto-detects Vite

### Step 2: Configure Build Settings

Vercel should auto-fill these (verify):
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

In **"Environment Variables"** section, add:

```
VITE_USE_REAL_API=true
VITE_API_URL=https://your-railway-backend-url.railway.app/api
```

**Important**: Replace `your-railway-backend-url.railway.app` with your actual Railway backend URL from Step 5 above.

### Step 4: Deploy Frontend

1. Click **"Deploy"**
2. Vercel will build and deploy
3. Your app will be live at: `https://better-bake.vercel.app` (or custom domain)

### Step 5: Update CORS Origin

1. Go back to **Railway dashboard**
2. Update `CORS_ORIGIN` environment variable to match your Vercel URL:
   ```
   CORS_ORIGIN=https://better-bake.vercel.app
   ```
3. Redeploy backend service

---

## Part 3: Post-Deployment Verification

### Backend Health Check

Test your Railway API:
```bash
# Check health endpoint
curl https://your-railway-url.railway.app/health

# Test registration
curl -X POST https://your-railway-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!","name":"Test User"}'
```

### Frontend Testing Checklist

Visit your Vercel URL and test:
- [ ] Landing page loads
- [ ] Registration works
- [ ] Login with new account
- [ ] Dashboard displays polls
- [ ] Vote on a poll
- [ ] Create new poll
- [ ] Leaderboard updates
- [ ] Logout clears token
- [ ] Refresh preserves login (token persistence)

---

## Part 4: Custom Domain Setup (Optional)

### Backend (Railway)

1. Go to **Railway Settings** → **Networking**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `api.betterbake.com`)
4. Add CNAME record to your DNS:
   ```
   CNAME api -> your-app.railway.app
   ```
5. Railway automatically provisions SSL certificate

### Frontend (Vercel)

1. Go to **Vercel Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `betterbake.com`)
4. Add DNS records as instructed by Vercel
5. Vercel automatically provisions SSL certificate

**After adding custom domains**, update:
- `CORS_ORIGIN` in Railway to your custom frontend domain
- `VITE_API_URL` in Vercel to your custom backend domain

---

## Troubleshooting

### Backend Issues

**Deployment fails**:
- Check Railway logs: `railway logs`
- Verify DATABASE_URL is set (auto-provided by PostgreSQL addon)
- Ensure `npm run build` succeeds locally

**Database connection errors**:
- Verify PostgreSQL addon is added
- Check DATABASE_URL format in Railway variables
- Run migrations: `railway run npm run prisma:migrate:deploy`

**CORS errors**:
- Verify `CORS_ORIGIN` matches your Vercel URL exactly (no trailing slash)
- Check backend logs for CORS-related errors
- Ensure frontend uses correct API URL

### Frontend Issues

**Build fails on Vercel**:
- Check Vercel build logs
- Verify all dependencies in package.json
- Test build locally: `npm run build`

**API calls fail**:
- Open browser DevTools → Network tab
- Check if `VITE_API_URL` is correct
- Verify Railway backend is running
- Check CORS configuration

**Environment variables not working**:
- Vercel requires `VITE_` prefix for client-side env vars
- Redeploy after changing environment variables
- Clear browser cache

---

## Monitoring & Maintenance

### Railway Monitoring

- **Logs**: View in Railway dashboard or via `railway logs`
- **Metrics**: CPU, memory, network usage in Railway dashboard
- **Database Backups**: Automatic daily backups (paid plan)

### Vercel Monitoring

- **Analytics**: Built-in Web Vitals tracking
- **Logs**: Function logs and build logs in dashboard
- **Deployments**: Automatic preview deployments for all branches

### Database Maintenance

```bash
# Backup database (via Railway CLI)
railway run pg_dump $DATABASE_URL > backup.sql

# View production data (read-only recommended)
railway run npm run prisma:studio
```

---

## Cost Estimates

### Railway
- **Free Tier**: $5/month credits (enough for hobby projects)
- **Paid Plan**: ~$10-20/month for API + PostgreSQL

### Vercel
- **Free Tier**: Generous limits (100GB bandwidth, unlimited sites)
- **Pro Plan**: $20/month (if you exceed free tier)

**Total estimated cost**: $0-20/month depending on usage

---

## Rollback Strategy

### Backend Rollback

Railway keeps deployment history:
1. Go to **Deployments** tab
2. Click previous successful deployment
3. Click **"Redeploy"**

### Frontend Rollback

Vercel keeps deployment history:
1. Go to **Deployments** page
2. Find previous deployment
3. Click **"Promote to Production"**

### Database Rollback

```bash
# Restore from backup
railway run psql $DATABASE_URL < backup.sql

# Rollback specific migration
railway run npm run prisma:migrate reset
```

---

## Next Steps After Deployment

1. **Set up monitoring**: Add error tracking (e.g., Sentry)
2. **Configure CI/CD**: Auto-deploy on push to main
3. **Add rate limiting**: Protect API from abuse
4. **Enable caching**: Add Redis for session management
5. **Set up backups**: Automate database backups

---

## Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment

