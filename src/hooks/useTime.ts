import { useEffect, useState } from 'react';

export const useTime = (interval: number) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timeoutId = setTimeout(() => setTime(Date.now()), interval);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);
  return time;
};
