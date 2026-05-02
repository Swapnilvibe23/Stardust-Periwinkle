import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const KEY = "@stardust_recent_activities";
const MAX_RECENT = 5;

export function useRecentActivities() {
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((str) => {
      if (str) setRecentIds(JSON.parse(str));
      setLoaded(true);
    });
  }, []);

  const markUsed = useCallback(
    async (id: string) => {
      const next = [id, ...recentIds.filter((r) => r !== id)].slice(0, MAX_RECENT);
      setRecentIds(next);
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
    },
    [recentIds]
  );

  return { recentIds, markUsed, loaded };
}
