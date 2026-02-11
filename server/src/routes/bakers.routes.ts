import type { FastifyInstance } from 'fastify';
import {
  getBakers,
  getBaker,
  create,
} from '../controllers/bakers.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

export async function bakersRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/bakers - Get all bakers
  fastify.get('/', getBakers);

  // GET /api/bakers/:id - Get single baker
  fastify.get<{ Params: { id: string } }>('/:id', getBaker);

  // POST /api/bakers - Create new baker (protected - admin only in future) - Moderate rate limit
  fastify.post<{ Body: { id: string; name: string; series: string } }>(
    '/',
    { 
      preHandler: [authenticateToken],
      config: {
        rateLimit: {
          max: 30,
          timeWindow: '1 minute',
        },
      },
    },
    create
  );
}
