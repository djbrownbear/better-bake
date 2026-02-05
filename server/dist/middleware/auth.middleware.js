import { jwtConfig } from '../config/env.js';
export async function authenticateToken(request, reply) {
    try {
        await request.jwtVerify();
        request.userId = request.user.userId;
    }
    catch (error) {
        reply.status(401).send({ error: 'Invalid or expired token' });
    }
}
export function registerAuthPlugin(fastify) {
    fastify.register(import('@fastify/jwt'), {
        secret: jwtConfig.secret,
    });
}
//# sourceMappingURL=auth.middleware.js.map