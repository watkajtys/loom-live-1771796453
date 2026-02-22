import type { Subscription } from '../store/subscriptionStore';

export const calculateMonthlyCost = (subscription: Subscription): number => {
  return subscription.frequency === 'yearly' ? subscription.cost / 12 : subscription.cost;
};
