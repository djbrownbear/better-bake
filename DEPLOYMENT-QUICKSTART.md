# Production Deployment - Quick Start

## 🚀 TL;DR

1. **Railway** (5 min):
   - Deploy from GitHub → Select `server` directory
   - Add PostgreSQL addon
   - Set env vars: `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV=production`
   - Get your API URL: `https://xxx.railway.app`

2. **Vercel** (3 min):
   - Import from GitHub
   - Set env vars: `VITE_USE_REAL_API=true`, `VITE_API_URL=https://xxx.railway.app/api`
   - Deploy
   - Get your URL: `https://better-bake.vercel.app`

3. **Update CORS** (1 min):
   - Go back to Railway
   - Update `CORS_ORIGIN=https://better-bake.vercel.app`
   - Redeploy

**Total time**: ~10 minutes 🎉

See DEPLOYMENT-GUIDE.md for detailed instructions.

## 📋 Pre-Deployment Checklist

- [ ] Railway account created
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] JWT_SECRET generated (see command below)
- [ ] Local build succeeds: `npm run build`
- [ ] Backend builds: `cd server && npm run build`

## 🔐 Generate JWT Secret

Run this in PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copy the output and use it as `JWT_SECRET` in Railway.

## 📝 Environment Variables

### Railway (Backend)
```
NODE_ENV=production
JWT_SECRET=<YOUR_GENERATED_SECRET>
CORS_ORIGIN=https://better-bake.vercel.app
PORT=3001
DATABASE_URL=<auto-provided-by-railway>
```

### Vercel (Frontend)
```
VITE_USE_REAL_API=true
VITE_API_URL=https://your-backend.railway.app/api
```

## ✅ Post-Deployment Testing

1. Visit your Vercel URL
2. Test registration: Create new account
3. Test login: Login with new account
4. Test voting: Vote on a poll
5. Test dashboard: See polls update
6. Test leaderboard: See stats update
7. Test logout: Clear session
8. Refresh page: Should stay logged in (JWT persistence)

## 🐛 Common Issues

**CORS Error**: Update `CORS_ORIGIN` in Railway to match your Vercel URL exactly  
**500 Error**: Check Railway logs for database connection issues  
**Build Fails**: Ensure all dependencies are in package.json  
**Env vars not working**: Redeploy after changing environment variables

## 📞 Need Help?

See full guide: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
