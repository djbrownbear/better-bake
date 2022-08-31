export const RECEIVE_BAKERS = "RECEIVE_BAKERS";

export function receiveBakers(bakers) {
  return {
    type: RECEIVE_BAKERS,
    bakers,
  };
}