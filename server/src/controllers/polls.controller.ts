import type { FastifyRequest, FastifyReply } from 'fastify';
import {
  createPoll,
  getAllPolls,
  getPollById,
  voteOnPoll,
  getUserAnsweredPolls,
  getUserUnansweredPolls,
} from '../services/polls.service.js';
import { createPollSchema, voteSchema } from '../schemas/index.js';

interface CreatePollBody {
  Body: {
    optionOneText: string;
    optionOneBaker: string;
    optionOneSeason: string;
    optionOneEpisode: string;
    optionTwoText: string;
    optionTwoBaker: string;
    optionTwoSeason: string;
    optionTwoEpisode: string;
  };
}

interface VoteBody {
  Body: {
    option: 'optionOne' | 'optionTwo';
  };
}

interface PollParams {
  Params: {
    id: string;
  };
}

export async function getPolls(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const polls = await getAllPolls();
    reply.send(polls);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function getPoll(
  request: FastifyRequest<PollParams>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = request.params;
    const poll = await getPollById(id);

    if (!poll) {
      reply.status(404).send({ error: 'Poll not found' });
      return;
    }

    reply.send(poll);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function create(
  request: FastifyRequest<CreatePollBody>,
  reply: FastifyReply
): Promise<void> {
  try {
    // Validate input
    const validatedData = createPollSchema.parse(request.body);

    if (!request.userId) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const poll = await createPoll(request.userId, validatedData);
    reply.status(201).send(poll);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      reply.status(400).send({ error: error.errors });
    } else {
      reply.status(500).send({ error: error.message });
    }
  }
}

export async function vote(
  request: FastifyRequest<PollParams & VoteBody>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = request.params;
    const validatedData = voteSchema.parse(request.body);

    if (!request.userId) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const poll = await voteOnPoll(id, request.userId, validatedData.option);
    reply.send(poll);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      reply.status(400).send({ error: error.errors });
    } else if (error.message.includes('already voted')) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.status(500).send({ error: error.message });
    }
  }
}

export async function getAnsweredPolls(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    if (!request.userId) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const polls = await getUserAnsweredPolls(request.userId);
    reply.send(polls);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}

export async function getUnansweredPolls(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    if (!request.userId) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const polls = await getUserUnansweredPolls(request.userId);
    reply.send(polls);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
}
