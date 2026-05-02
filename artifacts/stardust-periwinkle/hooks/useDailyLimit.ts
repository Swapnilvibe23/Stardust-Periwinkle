import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

interface DailyRecord {
  date: string;
  count: number;
}

function todayKey(): string {
  return new Date().toDateString();
}

export function useDailyLimit(featureKey: string, limit: number) {
  const storageKey = `@stardust_daily_${featureKey}`;
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((str) => {
      if (str) {
        const record: DailyRecord = JSON.parse(str);
        if (record.date === todayKey()) {
          setCount(record.count);
        } else {
          setCount(0);
          AsyncStorage.removeItem(storageKey);
        }
      }
      setLoaded(true);
    });
  }, [storageKey]);

  const increment = useCallback(async () => {
    const next = count + 1;
    setCount(next);
    const record: DailyRecord = { date: todayKey(), count: next };
    await AsyncStorage.setItem(storageKey, JSON.stringify(record));
    return next;
  }, [count, storageKey]);

  const remaining = Math.max(0, limit - count);
  const isAtLimit = count >= limit;
  const usedToday = count;

  return { usedToday, remaining, isAtLimit, increment, loaded };
}
