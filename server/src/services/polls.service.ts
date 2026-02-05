import { prisma } from '../config/database.js';
import type { CreatePollInput, PollWithVotes } from '../types/index.js';

export async function createPoll(
  authorId: string,
  input: CreatePollInput
): Promise<PollWithVotes> {
  const poll = await prisma.poll.create({
    data: {
      authorId,
      ...input,
    },
    include: {
      votes: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarURL: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return poll as PollWithVotes;
}

export async function getAllPolls(): Promise<PollWithVotes[]> {
  const polls = await prisma.poll.findMany({
    include: {
      votes: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarURL: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return polls as PollWithVotes[];
}

export async function getPollById(pollId: string): Promise<PollWithVotes | null> {
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: {
      votes: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarURL: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return poll as PollWithVotes | null;
}

export async function voteOnPoll(
  pollId: string,
  userId: string,
  option: 'optionOne' | 'optionTwo'
): Promise<PollWithVotes> {
  // Check if user has already voted
  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_pollId: {
        userId,
        pollId,
      },
    },
  });

  if (existingVote) {
    throw new Error('You have already voted on this poll');
  }

  // Create vote
  await prisma.vote.create({
    data: {
      pollId,
      userId,
      option,
    },
  });

  // Return updated poll
  const poll = await getPollById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }

  return poll;
}

export async function getUserAnsweredPolls(userId: string): Promise<PollWithVotes[]> {
  const votes = await prisma.vote.findMany({
    where: { userId },
    include: {
      poll: {
        include: {
          votes: true,
          author: {
            select: {
              id: true,
              email: true,
              name: true,
              avatarURL: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return votes.map((vote: { poll: any }) => vote.poll) as PollWithVotes[];
}

export async function getUserUnansweredPolls(userId: string): Promise<PollWithVotes[]> {
  // Get all poll IDs user has voted on
  const votedPollIds = await prisma.vote.findMany({
    where: { userId },
    select: { pollId: true },
  });

  const votedIds = votedPollIds.map((v: { pollId: string }) => v.pollId);

  // Get polls user hasn't voted on
  const polls = await prisma.poll.findMany({
    where: {
      id: {
        notIn: votedIds,
      },
    },
    include: {
      votes: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarURL: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return polls as PollWithVotes[];
}
