import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const LAST_OPEN_KEY = "@stardust_streak_last";
const COUNT_KEY = "@stardust_streak_count";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export interface StreakState {
  count: number;
  isNew: boolean; // true if the streak just grew today
  loaded: boolean;
}

export function useStreak(): StreakState {
  const [state, setState] = useState<StreakState>({ count: 0, isNew: false, loaded: false });

  useEffect(() => {
    (async () => {
      const today = todayStr();
      const yesterday = yesterdayStr();

      const [lastOpen, rawCount] = await Promise.all([
        AsyncStorage.getItem(LAST_OPEN_KEY),
        AsyncStorage.getItem(COUNT_KEY),
      ]);

      const current = parseInt(rawCount ?? "0", 10) || 0;

      if (lastOpen === today) {
        // Already opened today — keep streak as-is
        setState({ count: current, isNew: false, loaded: true });
        return;
      }

      if (lastOpen === yesterday) {
        // Opened yesterday → extend streak
        const next = current + 1;
        await Promise.all([
          AsyncStorage.setItem(LAST_OPEN_KEY, today),
          AsyncStorage.setItem(COUNT_KEY, String(next)),
        ]);
        setState({ count: next, isNew: true, loaded: true });
        return;
      }

      // Gap of more than one day → reset
      const next = 1;
      await Promise.all([
        AsyncStorage.setItem(LAST_OPEN_KEY, today),
        AsyncStorage.setItem(COUNT_KEY, String(next)),
      ]);
      setState({ count: next, isNew: false, loaded: true });
    })();
  }, []);

  return state;
}
