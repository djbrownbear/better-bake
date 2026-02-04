import { Baker } from '../types';

export const RECEIVE_BAKERS = "RECEIVE_BAKERS" as const;

export function receiveBakers(bakers: Record<string, Baker>) {
  return {
    type: RECEIVE_BAKERS,
    bakers,
  };
}