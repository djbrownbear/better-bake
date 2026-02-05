import type { FastifyInstance } from 'fastify';
import {
  getPolls,
  getPoll,
  create,
  vote,
  getAnsweredPolls,
  getUnansweredPolls,
} from '../controllers/polls.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

export async function pollsRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/polls - Get all polls
  fastify.get('/', getPolls);

  // GET /api/polls/:id - Get single poll
  fastify.get('/:id', getPoll);

  // POST /api/polls - Create new poll (protected)
  fastify.post('/', { preHandler: [authenticateToken] }, create);

  // POST /api/polls/:id/vote - Vote on poll (protected)
  fastify.post('/:id/vote', { preHandler: [authenticateToken] }, vote);

  // GET /api/polls/answered - Get user's answered polls (protected)
  fastify.get('/answered', { preHandler: [authenticateToken] }, getAnsweredPolls);

  // GET /api/polls/unanswered - Get user's unanswered polls (protected)
  fastify.get('/unanswered', { preHandler: [authenticateToken] }, getUnansweredPolls);
}
