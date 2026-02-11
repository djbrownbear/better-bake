import { register, login, getMe } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
export async function authRoutes(fastify) {
    // POST /api/auth/register - Strict rate limit (brute force protection)
    fastify.post('/register', {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: '15 minutes',
            },
        },
    }, register);
    // POST /api/auth/login - Strict rate limit (brute force protection)
    fastify.post('/login', {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: '15 minutes',
            },
        },
    }, login);
    // GET /api/auth/me (protected)
    fastify.get('/me', { preHandler: [authenticateToken] }, getMe);
}
//# sourceMappingURL=auth.routes.js.map