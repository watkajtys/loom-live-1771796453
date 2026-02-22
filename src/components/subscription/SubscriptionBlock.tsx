import React from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { type Subscription } from '../../store/subscriptionStore';
import clsx from 'clsx';

interface SubscriptionBlockProps {
  subscription: Subscription;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, subscription: Subscription) => void;
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const SubscriptionBlock: React.FC<SubscriptionBlockProps> = ({ subscription, onDragEnd, onDrag }) => {
  // Calculate monthly cost for flex-grow
  const monthlyCost = subscription.frequency === 'yearly' ? subscription.cost / 12 : subscription.cost;
  
  const style = {
    flexGrow: monthlyCost,
    flexShrink: 1,
    flexBasis: '0%',
    minHeight: '40px' 
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      key={subscription.id}
      drag
      dragSnapToOrigin
      whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0px 10px 20px rgba(0,0,0,0.5)" }}
      onDragEnd={(event, info) => onDragEnd(event, info, subscription)}
      onDrag={onDrag}
      className={clsx(
        "w-full bg-amber-500 border-b border-stone-800 flex flex-col justify-center items-center p-2 cursor-grab active:cursor-grabbing",
        "hover:brightness-110 transition-colors"
      )}
      style={style}
    >
      <div className="font-bold text-stone-900 truncate w-full text-center text-sm md:text-base">
        {subscription.name}
      </div>
      <div className="text-stone-800 text-xs font-mono">
        ${subscription.cost.toFixed(2)}/{subscription.frequency === 'monthly' ? 'mo' : 'yr'}
      </div>
    </motion.div>
  );
};

export default SubscriptionBlock;
