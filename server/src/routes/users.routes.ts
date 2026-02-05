import type { FastifyInstance } from 'fastify';
import {
  getUsers,
  getUser,
  getLeaderboardData,
} from '../controllers/users.controller.js';

export async function usersRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /api/users - Get all users
  fastify.get('/', getUsers);

  // GET /api/users/leaderboard - Get leaderboard
  fastify.get('/leaderboard', getLeaderboardData);

  // GET /api/users/:id - Get single user
  fastify.get('/:id', getUser);
}
