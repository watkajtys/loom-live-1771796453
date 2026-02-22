import { forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface InactiveZoneProps {
    isOver?: boolean;
}

const InactiveZone = forwardRef<HTMLDivElement, InactiveZoneProps>(({ isOver }, ref) => {
  return (
    <motion.div
      ref={ref}
      animate={{ 
        backgroundColor: isOver ? "rgba(220, 38, 38, 0.2)" : "rgba(28, 25, 23, 0.3)",
        borderColor: isOver ? "rgba(220, 38, 38, 0.5)" : "rgba(68, 64, 60, 0.3)",
        scale: isOver ? 1.05 : 1
      }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "w-full h-32 md:h-full border-2 border-dashed rounded-lg flex items-center justify-center transition-all",
        "relative overflow-hidden"
      )}
    >
      <div className={clsx(
        "font-bold uppercase tracking-widest text-sm pointer-events-none select-none text-center",
        isOver ? "text-red-400" : "text-stone-500"
      )}>
        {isOver ? "Release to Remove" : "Drag Here to Deactivate"}
      </div>
      {isOver && (
          <motion.div 
            className="absolute inset-0 bg-red-500/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
      )}
    </motion.div>
  );
});

export default InactiveZone;
