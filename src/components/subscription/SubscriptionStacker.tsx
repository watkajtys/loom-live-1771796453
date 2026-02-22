import React, { useRef, useState } from 'react';
import { useSubscriptionStore, type Subscription } from '../../store/subscriptionStore';
import Stack from './Stack';
import InactiveZone from './InactiveZone';
import InputArea from './InputArea';
import TotalCounter from './TotalCounter';
import { type PanInfo } from 'framer-motion';

const SubscriptionStacker: React.FC = () => {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const removeSubscription = useSubscriptionStore((state) => state.removeSubscription);
  
  const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
  
  // Calculate total monthly cost
  const totalMonthlyCost = activeSubscriptions.reduce((acc, sub) => {
    const monthlyCost = sub.frequency === 'yearly' ? sub.cost / 12 : sub.cost;
    return acc + monthlyCost;
  }, 0);

  const inactiveZoneRef = useRef<HTMLDivElement>(null);
  const [isOverInactive, setIsOverInactive] = useState(false);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (inactiveZoneRef.current) {
        const zoneRect = inactiveZoneRef.current.getBoundingClientRect();
        const point = info.point;
        
        const isOver = 
            point.x >= zoneRect.left && 
            point.x <= zoneRect.right && 
            point.y >= zoneRect.top && 
            point.y <= zoneRect.bottom;
            
        if (isOver !== isOverInactive) {
            setIsOverInactive(isOver);
        }
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, subscription: Subscription) => {
    if (inactiveZoneRef.current) {
        const zoneRect = inactiveZoneRef.current.getBoundingClientRect();
        const point = info.point;
        
        const isOver = 
            point.x >= zoneRect.left && 
            point.x <= zoneRect.right && 
            point.y >= zoneRect.top && 
            point.y <= zoneRect.bottom;
            
        if (isOver) {
            removeSubscription(subscription.id);
        }
    }
    setIsOverInactive(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 flex flex-col md:flex-row overflow-hidden relative font-sans selection:bg-amber-500/30">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.1),transparent_70%)]" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 gap-8 relative z-10 w-full overflow-y-auto">
             <header className="w-full max-w-5xl flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-stone-100 flex items-center gap-2">
                    <span className="text-amber-500">Subscription</span> Weight Stacker
                </h1>
                <div className="text-stone-500 text-sm">Drag & Drop Analyzer</div>
            </header>

            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 h-full items-start">
                
                {/* Left Column: Stack & Counter */}
                <div className="flex-1 flex flex-col gap-8 items-center justify-center w-full">
                    <TotalCounter monthlyTotal={totalMonthlyCost} />
                    
                    {/* The Stack Container */}
                    <div className="w-full flex justify-center items-end flex-1 min-h-[500px]">
                        <Stack 
                            activeSubscriptions={activeSubscriptions} 
                            totalCost={totalMonthlyCost} 
                            onDragEnd={handleDragEnd}
                            onDrag={handleDrag}
                        />
                    </div>
                </div>

                {/* Right Column: Input & Inactive Zone */}
                <div className="w-full md:w-80 flex flex-col gap-6 shrink-0 md:h-[calc(100vh-100px)] md:sticky md:top-8">
                    <InputArea />
                    
                    <div className="flex-1 min-h-[200px] flex flex-col">
                        <InactiveZone ref={inactiveZoneRef} isOver={isOverInactive} />
                    </div>

                    <div className="text-stone-600 text-xs text-center leading-relaxed max-w-xs mx-auto">
                        Drag blocks from the stack to the drop zone to remove them. 
                        The stack adjusts automatically based on monthly cost.
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubscriptionStacker;
