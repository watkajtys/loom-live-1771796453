import React, { useState } from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';

const InputArea: React.FC = () => {
  const addSubscription = useSubscriptionStore((state) => state.addSubscription);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cost) return;
    const costNum = parseFloat(cost);
    if (isNaN(costNum) || costNum <= 0) return;

    addSubscription({
      name,
      cost: costNum,
      frequency,
    });
    setName('');
    setCost('');
    setFrequency('monthly');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-stone-900/50 rounded-lg border border-stone-800 shadow-lg w-full max-w-sm">
        <h3 className="text-stone-400 text-sm font-bold uppercase tracking-wider">Add Subscription</h3>
      <input
        type="text"
        placeholder="Name (e.g. Netflix)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-stone-800 text-stone-100 p-3 rounded border border-stone-700 focus:outline-none focus:border-amber-500 transition-colors"
      />
      <div className="flex gap-2">
        <div className="relative flex-1">
             <span className="absolute left-3 top-3 text-stone-500">$</span>
            <input
                type="number"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="bg-stone-800 text-stone-100 p-3 pl-6 rounded border border-stone-700 focus:outline-none focus:border-amber-500 w-full transition-colors"
                step="0.01"
            />
        </div>
        <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'monthly' | 'yearly')}
            className="bg-stone-800 text-stone-100 p-3 rounded border border-stone-700 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
        >
            <option value="monthly">/ Mo</option>
            <option value="yearly">/ Yr</option>
        </select>
      </div>
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 px-4 rounded transition-colors shadow-md active:scale-95 transform">
            Add to Stack
        </button>
    </form>
  );
};

export default InputArea;
