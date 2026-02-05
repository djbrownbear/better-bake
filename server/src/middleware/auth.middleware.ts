import type { FastifyRequest, FastifyReply } from 'fastify';
import type { FastifyInstance } from 'fastify';
import { jwtConfig } from '../config/env.js';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify();
    request.userId = (request.user as any).userId;
  } catch (error) {
    reply.status(401).send({ error: 'Invalid or expired token' });
  }
}

export function registerAuthPlugin(fastify: FastifyInstance) {
  fastify.register(import('@fastify/jwt'), {
    secret: jwtConfig.secret,
  });
}
