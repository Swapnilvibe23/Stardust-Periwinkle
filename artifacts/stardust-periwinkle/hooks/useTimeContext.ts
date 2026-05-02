import { router } from "expo-router";
import * as Haptics from "expo-haptics";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface TimeContext {
  timeOfDay: TimeOfDay;
  greeting: string;
  primaryFeature: string;
  primaryRoute: string;
  primaryIcon: string;
  suggestionText: string;
  color: string;
}

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function getTimeContext(): TimeContext {
  const timeOfDay = getTimeOfDay();

  switch (timeOfDay) {
    case "morning":
      return {
        timeOfDay,
        greeting: "Good morning",
        primaryFeature: "Morning Routine",
        primaryRoute: "/routine",
        primaryIcon: "sun",
        suggestionText: "Start the day with your morning checklist",
        color: "#F5A623",
      };
    case "afternoon":
      return {
        timeOfDay,
        greeting: "Good afternoon",
        primaryFeature: "What Now?",
        primaryRoute: "/whatnow",
        primaryIcon: "zap",
        suggestionText: "Need a quick activity for this afternoon?",
        color: "#7B8ECC",
      };
    case "evening":
      return {
        timeOfDay,
        greeting: "Good evening",
        primaryFeature: "Calm This Moment",
        primaryRoute: "/calm",
        primaryIcon: "heart",
        suggestionText: "Evenings are hard — let's get through it together",
        color: "#B83A6B",
      };
    case "night":
      return {
        timeOfDay,
        greeting: "Good night",
        primaryFeature: "Last Story Tonight",
        primaryRoute: "/story",
        primaryIcon: "moon",
        suggestionText: "Time for a calm bedtime story",
        color: "#6B5B95",
      };
  }
}

export function navigateToTimeFeature() {
  const ctx = getTimeContext();
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  router.push(ctx.primaryRoute as any);
}
