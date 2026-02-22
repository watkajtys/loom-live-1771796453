import React, { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';

interface TotalCounterProps {
  monthlyTotal: number;
}

const TotalCounter: React.FC<TotalCounterProps> = ({ monthlyTotal }) => {
    const yearlyTotal = monthlyTotal * 12;
    const springValue = useSpring(yearlyTotal, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = useState(yearlyTotal);

    useEffect(() => {
        springValue.set(yearlyTotal);
    }, [yearlyTotal, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(latest);
        });
    }, [springValue]);

  return (
    <div className="flex flex-col items-center p-8 bg-stone-900/50 rounded-2xl border border-stone-800 shadow-xl backdrop-blur-sm w-full max-w-sm">
      <div className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-4">Total Yearly Expenditure</div>
      <div className="relative">
          <span className="text-4xl md:text-6xl font-bold text-amber-500 font-mono tracking-tighter">
            ${displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
      </div>
       <div className="text-stone-500 text-sm mt-3 font-medium flex items-center gap-2">
         <span className="bg-stone-800 px-2 py-1 rounded text-stone-400">${monthlyTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month</span>
      </div>
    </div>
  );
};

export default TotalCounter;
