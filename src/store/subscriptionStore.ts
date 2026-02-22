import { create } from 'zustand';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  frequency: 'monthly' | 'yearly';
  isActive: boolean;
}

interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'isActive'>) => void;
  removeSubscription: (id: string) => void;
  toggleActive: (id: string) => void;
  setSubscriptions: (subscriptions: Subscription[]) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscriptions: [
    { id: '1', name: 'Netflix', cost: 15.99, frequency: 'monthly', isActive: true },
    { id: '2', name: 'Spotify', cost: 9.99, frequency: 'monthly', isActive: true },
    { id: '3', name: 'Adobe Creative Cloud', cost: 54.99, frequency: 'monthly', isActive: true },
    { id: '4', name: 'Amazon Prime', cost: 14.99, frequency: 'monthly', isActive: true },
    { id: '5', name: 'Gym Membership', cost: 40.00, frequency: 'monthly', isActive: true },
  ],
  addSubscription: (sub) =>
    set((state) => ({
      subscriptions: [
        ...state.subscriptions,
        { ...sub, id: crypto.randomUUID(), isActive: true },
      ],
    })),
  removeSubscription: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, isActive: false } : sub
      ),
    })),
  toggleActive: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
      ),
    })),
  setSubscriptions: (subscriptions) => set({ subscriptions }),
}));
