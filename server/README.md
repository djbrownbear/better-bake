# Better Bake API Server

Backend API for the Better Bake polling application built with Fastify, Prisma, and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify (high-performance web framework)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (@fastify/jwt) + bcrypt
- **Development**: tsx (TypeScript execution)

## Project Structure

\\\
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Prisma client setup
│   │   └── env.ts       # Environment variables
│   ├── controllers/     # Route controllers
│   │   └── auth.controller.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/          # API routes
│   │   └── auth.routes.ts
│   ├── services/        # Business logic
│   │   └── auth.service.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   └── index.ts         # Server entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment template
└── package.json
\\\

## Getting Started

### 1. Install Dependencies

\\\ash
npm install
\\\

### 2. Set Up Environment Variables

Copy \.env.example\ to \.env\ and update with your values:

\\\ash
cp .env.example .env
\\\

### 3. Start Database

#### Option A: Local PostgreSQL
Make sure PostgreSQL is installed and running locally.

#### Option B: Prisma Dev Database
\\\ash
npx prisma dev
\\\

### 4. Run Database Migrations

\\\ash
npm run prisma:migrate
\\\

### 5. Generate Prisma Client

\\\ash
npm run prisma:generate
\\\

### 6. Start Development Server

\\\ash
npm run dev
\\\

Server will start on \http://localhost:3001\

## Available Scripts

- \
pm run dev\ - Start development server with hot reload
- \
pm run build\ - Compile TypeScript to JavaScript
- \
pm start\ - Start production server
- \
pm run prisma:generate\ - Generate Prisma Client
- \
pm run prisma:migrate\ - Run database migrations
- \
pm run prisma:studio\ - Open Prisma Studio (database GUI)

## API Endpoints

### Authentication

- \POST /api/auth/register\ - Register new user
  - Body: \{ email, password, name, avatarURL? }\
  - Returns: \{ token, user }\

- \POST /api/auth/login\ - Login user
  - Body: \{ email, password }\
  - Returns: \{ token, user }\

- \GET /api/auth/me\ - Get current user (protected)
  - Headers: \Authorization: Bearer <token>\
  - Returns: \{ user }\

### Health Check

- \GET /health\ - Server health check
  - Returns: \{ status, timestamp }\

## Database Schema

### Models

- **User**: User accounts with authentication
- **Poll**: Voting polls with two options
- **Vote**: User votes on polls
- **Baker**: Great British Bake Off contestants

See \prisma/schema.prisma\ for complete schema definition.

## Development Workflow

1. Make changes to TypeScript files in \src/\
2. \	sx watch\ automatically reloads on file changes
3. Test endpoints using curl, Postman, or Thunder Client
4. Update Prisma schema in \prisma/schema.prisma\
5. Run \
pm run prisma:migrate\ to apply schema changes

## Deployment

### Railway

1. Create new project on Railway
2. Add PostgreSQL database
3. Set environment variables (JWT_SECRET, FRONTEND_URL, etc.)
4. Connect GitHub repository
5. Railway will automatically deploy on push to main

### Environment Variables for Production

- \DATABASE_URL\: Automatically set by Railway
- \JWT_SECRET\: Generate secure random string
- \NODE_ENV\: Set to \production\
- \FRONTEND_URL\: Your production frontend URL
- \PORT\: Automatically set by Railway

## TODO

- [ ] Implement polls service and routes
- [ ] Implement users service and routes
- [ ] Implement bakers service and routes
- [ ] Add input validation (Zod)
- [ ] Add API rate limiting
- [ ] Add request logging
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add API documentation (Swagger/OpenAPI)

## Security Considerations

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days (configurable)
- CORS configured for specific origins
- SQL injection prevented by Prisma's parameterized queries
- Input sanitization needed (TODO: add Zod validation)

## Troubleshooting

### Database Connection Errors

- Verify DATABASE_URL in .env is correct
- Ensure PostgreSQL is running
- Check database permissions

### JWT Errors

- Verify JWT_SECRET is set in .env
- Check token expiration
- Ensure Authorization header format: \Bearer <token>\

### TypeScript Errors

- Run \
pm run prisma:generate\ to regenerate types
- Delete \dist/\ and \
ode_modules/\, then reinstall

