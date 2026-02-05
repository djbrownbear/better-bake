import type { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser, getUserById } from '../services/auth.service.js';
import { jwtConfig } from '../config/env.js';
import type { LoginInput, RegisterInput, AuthResponse } from '../types/index.js';

interface LoginBody {
  Body: LoginInput;
}

interface RegisterBody {
  Body: RegisterInput;
}

export async function register(
  request: FastifyRequest<RegisterBody>,
  reply: FastifyReply
): Promise<void> {
  try {
    const user = await registerUser(request.body);
    
    const token = request.server.jwt.sign(
      { userId: user.id },
      { expiresIn: jwtConfig.expiresIn }
    );

    const response: AuthResponse = {
      token,
      user,
    };

    reply.status(201).send(response);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}

export async function login(
  request: FastifyRequest<LoginBody>,
  reply: FastifyReply
): Promise<void> {
  try {
    const user = await loginUser(request.body);
    
    const token = request.server.jwt.sign(
      { userId: user.id },
      { expiresIn: jwtConfig.expiresIn }
    );

    const response: AuthResponse = {
      token,
      user,
    };

    reply.send(response);
  } catch (error: any) {
    reply.status(401).send({ error: error.message });
  }
}

export async function getMe(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const userId = request.userId;
    
    if (!userId) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const user = await getUserById(userId);
    
    if (!user) {
      reply.status(404).send({ error: 'User not found' });
      return;
    }

    reply.send(user);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}
