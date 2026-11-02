import React, { useEffect, useState } from 'react';

export function PuneClock() {
  const [timeStr, setTimeStr] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      // Calculate IST (UTC + 5:30)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 5.5 * 3600000);

      const hours = istDate.getHours();
      const minutes = String(istDate.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;

      setTimeStr(`${displayHours}:${minutes} ${ampm} IST`);

      // Studio open Mon-Fri, 10:00 to 19:00 IST
      const day = istDate.getDay();
      const isWeekday = day >= 1 && day <= 5;
      const open = isWeekday && hours >= 10 && hours < 19;
      setIsOpen(open);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.16em]">
      <span className="relative flex h-2 w-2">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isOpen ? 'bg-emerald-500' : 'bg-gold/60'
          }`}
        />
      </span>
      <span className="tabular-nums">{timeStr || '14:30 IST'}</span>
      <span className="opacity-50">·</span>
      <span className="text-[10px] tracking-wider opacity-60">
        {isOpen ? 'Studio Open' : 'Studio Closed'}
      </span>
    </div>
  );
}

