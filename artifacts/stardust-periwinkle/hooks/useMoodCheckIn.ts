import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const MOOD_KEY = "@stardust_mood_checkin";

export type Mood = "calm" | "stressed" | "exhausted";

interface StoredMood {
  mood: Mood;
  date: string;
}

interface MoodState {
  todaysMood: Mood | null;
  loaded: boolean;
  saveMood: (mood: Mood) => Promise<void>;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useMoodCheckIn(): MoodState {
  const [todaysMood, setTodaysMood] = useState<Mood | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(MOOD_KEY);
      if (raw) {
        const stored: StoredMood = JSON.parse(raw);
        if (stored.date === todayStr()) {
          setTodaysMood(stored.mood);
        }
      }
      setLoaded(true);
    })();
  }, []);

  async function saveMood(mood: Mood) {
    const stored: StoredMood = { mood, date: todayStr() };
    await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(stored));
    setTodaysMood(mood);
  }

  return { todaysMood, loaded, saveMood };
}

export interface MoodConfig {
  emoji: string;
  label: string;
  color: string;
  ack: string;
  sub: string;
  cta: string;
  route: string;
  icon: string;
}

export const MOOD_CONFIGS: Record<Mood, MoodConfig> = {
  calm: {
    emoji: "🌿",
    label: "Calm",
    color: "#4CAF50",
    ack: "Love that energy.",
    sub: "Make the most of this moment with a fun activity.",
    cta: "Find an Activity",
    route: "/whatnow",
    icon: "zap",
  },
  stressed: {
    emoji: "😤",
    label: "Stressed",
    color: "#B83A6B",
    ack: "You've got this.",
    sub: "Let's tackle this moment together, one step at a time.",
    cta: "Calm This Moment",
    route: "/calm",
    icon: "heart",
  },
  exhausted: {
    emoji: "😴",
    label: "Exhausted",
    color: "#7B8ECC",
    ack: "That's okay — you're still here.",
    sub: "Something simple and gentle might be just right.",
    cta: "Take a Breath",
    route: "/breathe",
    icon: "wind",
  },
};
