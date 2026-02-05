# Better Bake API - Railway Deployment

## Environment Variables Required

Set these in Railway dashboard:

```
NODE_ENV=production
DATABASE_URL=<Railway will auto-provide from PostgreSQL plugin>
JWT_SECRET=<generate-secure-random-string>
CORS_ORIGIN=https://your-frontend-url.vercel.app
PORT=3001
```

## Deployment Steps

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Link project: `railway link`
4. Add PostgreSQL: `railway add postgresql`
5. Deploy: `railway up`

## After Deployment

Railway will automatically:
- Install dependencies
- Generate Prisma client
- Build TypeScript
- Run database migrations
- Start the server

## Database Migrations

Migrations run automatically on deploy. To run manually:
```
railway run npm run prisma:migrate
```

## View Logs
```
railway logs
```
