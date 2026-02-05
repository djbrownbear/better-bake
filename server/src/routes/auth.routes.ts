import type { FastifyInstance } from 'fastify';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  // POST /api/auth/register
  fastify.post('/register', register);

  // POST /api/auth/login
  fastify.post('/login', login);

  // GET /api/auth/me (protected)
  fastify.get('/me', { preHandler: [authenticateToken] }, getMe);
}
