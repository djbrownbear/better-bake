import type { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllUsers,
  getUserByIdService,
  getLeaderboard,
} from '../services/users.service.js';

interface UserParams {
  Params: {
    id: string;
  };
}

export async function getUsers(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const users = await getAllUsers();
    reply.send(users);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function getUser(
  request: FastifyRequest<UserParams>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = request.params;
    const user = await getUserByIdService(id);

    if (!user) {
      reply.status(404).send({ error: 'User not found' });
      return;
    }

    reply.send(user);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function getLeaderboardData(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const leaderboard = await getLeaderboard();
    reply.send(leaderboard);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}
