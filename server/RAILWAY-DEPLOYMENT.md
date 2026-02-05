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
5. Configure Pre-Deploy Command (see section below)
6. Deploy: `railway up`

## Pre-Deploy Command Configuration

Railway's pre-deploy commands execute between building and deploying your application, ideal for database migrations.

### Setup in Railway Dashboard

1. Go to your service settings
2. Find the "Pre-Deploy Command" field
3. Enter: `npm run prisma:migrate:deploy`

**For initial deployment with seed data:**
```bash
npm run prisma:migrate:deploy && npm run prisma:seed
```

### How It Works

```
Build → Pre-Deploy Command → Deploy
```

1. Railway builds your Docker image (includes `npm ci`, `npm run build`)
2. Pre-deploy command runs in temporary container with:
   - Private network access
   - All environment variables
   - Database connectivity
3. If command succeeds (exit code 0), deployment proceeds
4. If command fails (non-zero exit), deployment is aborted

### Key Benefits

- **Fail-safe**: Migrations must succeed before app starts
- **No downtime**: Database is ready before new version goes live
- **Private network**: Migration runs with database access
- **Clean separation**: Build → Migrate → Deploy phases are isolated

### Important Notes

- Pre-deploy commands run in a **separate container** from your application
- Filesystem changes are **not persisted** (volumes not mounted)
- Keep commands fast - they occupy a slot in your build queue
- The Dockerfile CMD should only run `npm start` (migrations handled by pre-deploy)

## After Deployment

Railway will automatically:
- Install dependencies (`npm ci`)
- Generate Prisma client (via `postinstall` script)
- Build TypeScript (`npm run build`)
- Run pre-deploy command (database migrations)
- Start the server (`npm start`)

## Manual Operations

### Run Migrations Manually
```bash
railway run npm run prisma:migrate:deploy
```

### Seed Database
```bash
railway run npm run prisma:seed
```

### Access Prisma Studio
```bash
railway run npm run prisma:studio
```

## View Logs
```
railway logs
```
