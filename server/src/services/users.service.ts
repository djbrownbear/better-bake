import { prisma } from '../config/database.js';
import type { UserResponse, LeaderboardEntry } from '../types/index.js';

export async function getAllUsers(): Promise<UserResponse[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      avatarURL: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
}

export async function getUserByIdService(userId: string): Promise<UserResponse | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatarURL: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const users = await prisma.user.findMany({
    include: {
      polls: true,
      votes: true,
    },
  });

  const leaderboard = users.map((user: any) => ({
    userId: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    pollsCreated: user.polls.length,
    pollsAnswered: user.votes.length,
    score: user.polls.length + user.votes.length,
  }));

  // Sort by score descending
  leaderboard.sort((a: any, b: any) => b.score - a.score);

  return leaderboard;
}
