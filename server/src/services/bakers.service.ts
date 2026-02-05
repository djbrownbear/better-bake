import { prisma } from '../config/database.js';
import type { Baker, CreateBakerInput } from '../types/index.js';

export async function getAllBakers(): Promise<Baker[]> {
  const bakers = await prisma.baker.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return bakers;
}

export async function getBakerById(bakerId: string): Promise<Baker | null> {
  const baker = await prisma.baker.findUnique({
    where: { id: bakerId },
  });

  return baker;
}

export async function createBaker(input: CreateBakerInput): Promise<Baker> {
  const baker = await prisma.baker.create({
    data: input,
  });

  return baker;
}
