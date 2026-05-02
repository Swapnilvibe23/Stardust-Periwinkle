import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const SETUP_KEY = "@stardust_notifications_setup";

const MORNING_MESSAGES = [
  { title: "Good morning 🌅", body: "Need a 5-minute activity to start the day?" },
  { title: "Morning routine time", body: "Your step-by-step morning checklist is ready." },
  { title: "Start the day calm", body: "Open your morning routine and set the tone for today." },
];

const EVENING_MESSAGES = [
  { title: "Wind-down time 🌙", body: "Try a calm bedtime story tonight." },
  { title: "Bedtime routine", body: "Your bedtime checklist is ready — let's get through it together." },
  { title: "End the day gently 🌿", body: "A calm story or breathing moment might be just what's needed." },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function requestAndScheduleNotifications(): Promise<void> {
  if (Platform.OS === "web") return;

  try {
    const already = await AsyncStorage.getItem(SETUP_KEY);
    if (already) return;

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return;

    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    await Notifications.cancelAllScheduledNotificationsAsync();

    // Morning notification — 8:00 AM daily (max 1)
    const morning = pick(MORNING_MESSAGES);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: morning.title,
        body: morning.body,
        data: { route: "/routine" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 8,
        minute: 0,
      },
    });

    // Evening notification — 7:00 PM daily (max 1)
    const evening = pick(EVENING_MESSAGES);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: evening.title,
        body: evening.body,
        data: { route: "/story" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 19,
        minute: 0,
      },
    });

    await AsyncStorage.setItem(SETUP_KEY, "true");
  } catch {
    // Notifications are optional — fail silently
  }
}

export async function cancelAllNotifications(): Promise<void> {
  if (Platform.OS === "web") return;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem(SETUP_KEY);
  } catch {
    // ignore
  }
}
