import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { registerAuthPlugin } from './middleware/auth.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { serverConfig, corsOrigins } from './config/env.js';
const fastify = Fastify({
    logger: {
        level: serverConfig.nodeEnv === 'development' ? 'info' : 'error',
    },
});
// Register CORS
await fastify.register(cors, {
    origin: corsOrigins,
    credentials: true,
});
// Register JWT plugin
registerAuthPlugin(fastify);
// Register error handler
fastify.setErrorHandler(errorHandler);
// Health check
fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});
// Register routes
fastify.register(authRoutes, { prefix: '/api/auth' });
// TODO: Add more routes here:
// fastify.register(pollsRoutes, { prefix: '/api/polls' });
// fastify.register(usersRoutes, { prefix: '/api/users' });
// fastify.register(bakersRoutes, { prefix: '/api/bakers' });
// Start server
const start = async () => {
    try {
        // Connect to database
        await connectDatabase();
        // Start server
        await fastify.listen({
            port: serverConfig.port,
            host: '0.0.0.0'
        });
        console.log(`🚀 Server is running on http://localhost:${serverConfig.port}`);
        console.log(`📝 Environment: ${serverConfig.nodeEnv}`);
    }
    catch (err) {
        fastify.log.error(err);
        await disconnectDatabase();
        process.exit(1);
    }
};
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⚠️  Shutting down gracefully...');
    await fastify.close();
    await disconnectDatabase();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n⚠️  Shutting down gracefully...');
    await fastify.close();
    await disconnectDatabase();
    process.exit(0);
});
start();
//# sourceMappingURL=index.js.map