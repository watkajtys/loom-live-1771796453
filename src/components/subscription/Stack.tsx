import React from 'react';
import { AnimatePresence, type PanInfo } from 'framer-motion';
import { type Subscription } from '../../store/subscriptionStore';
import SubscriptionBlock from './SubscriptionBlock';

interface StackProps {
  activeSubscriptions: Subscription[];
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, subscription: Subscription) => void;
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const Stack: React.FC<StackProps> = ({ activeSubscriptions, onDragEnd, onDrag }) => {
  return (
    <div className="flex flex-col-reverse w-full max-w-sm h-[60vh] bg-stone-900 rounded-lg overflow-hidden border border-stone-800 shadow-2xl relative">
      <AnimatePresence initial={false}>
        {activeSubscriptions.map((sub) => (
          <SubscriptionBlock
            key={sub.id}
            subscription={sub}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
          />
        ))}
      </AnimatePresence>
      {activeSubscriptions.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-stone-600">
            No active subscriptions
        </div>
      )}
    </div>
  );
};

export default Stack;
