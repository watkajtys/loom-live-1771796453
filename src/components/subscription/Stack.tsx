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
    <div className="relative w-full max-w-sm h-[60vh]">
        {/* Background layer for visual container style */}
        <div className="absolute inset-0 bg-stone-900 rounded-lg border border-stone-800 shadow-2xl pointer-events-none" />

        {/* Content layer - No overflow hidden to allow dragging outside */}
        <div className="relative w-full h-full flex flex-col-reverse">
            <AnimatePresence initial={false}>
                {activeSubscriptions.map((sub, index) => {
                    const isBottom = index === 0;
                    const isTop = index === activeSubscriptions.length - 1;
                    
                    return (
                        <SubscriptionBlock
                            key={sub.id}
                            subscription={sub}
                            onDragEnd={onDragEnd}
                            onDrag={onDrag}
                            isTop={isTop}
                            isBottom={isBottom}
                        />
                    );
                })}
            </AnimatePresence>
            {activeSubscriptions.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-stone-600 pointer-events-none">
                    No active subscriptions
                </div>
            )}
        </div>
    </div>
  );
};

export default Stack;
