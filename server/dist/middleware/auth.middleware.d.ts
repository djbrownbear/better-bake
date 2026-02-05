import type { FastifyRequest, FastifyReply } from 'fastify';
import type { FastifyInstance } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        userId?: string;
    }
}
export declare function authenticateToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function registerAuthPlugin(fastify: FastifyInstance): void;
//# sourceMappingURL=auth.middleware.d.ts.map