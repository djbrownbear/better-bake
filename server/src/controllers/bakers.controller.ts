import type { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllBakers,
  getBakerById,
  createBaker,
} from '../services/bakers.service.js';
import { createBakerSchema } from '../schemas/index.js';

interface BakerParams {
  Params: {
    id: string;
  };
}

interface CreateBakerBody {
  Body: {
    id: string;
    name: string;
    series: string;
  };
}

export async function getBakers(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const bakers = await getAllBakers();
    reply.send(bakers);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function getBaker(
  request: FastifyRequest<BakerParams>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = request.params;
    const baker = await getBakerById(id);

    if (!baker) {
      reply.status(404).send({ error: 'Baker not found' });
      return;
    }

    reply.send(baker);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function create(
  request: FastifyRequest<CreateBakerBody>,
  reply: FastifyReply
): Promise<void> {
  try {
    const validatedData = createBakerSchema.parse(request.body);
    const baker = await createBaker(validatedData);
    reply.status(201).send(baker);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      reply.status(400).send({ error: error.errors });
    } else {
      reply.status(500).send({ error: error.message });
    }
  }
}
