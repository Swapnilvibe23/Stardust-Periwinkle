import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { useStreak } from "@/hooks/useStreak";

const MILESTONE_MSGS: Array<[number, string]> = [
  [30, "30 days. You're incredible."],
  [21, "3 weeks of showing up!"],
  [14, "2 weeks strong!"],
  [7, "One whole week! Amazing."],
  [3, "3 days in a row — keep going!"],
];

function getMilestoneMsg(count: number): string | null {
  for (const [n, msg] of MILESTONE_MSGS) {
    if (count === n) return msg;
  }
  return null;
}

function flameColor(count: number): string {
  if (count >= 14) return "#FF6B00";
  if (count >= 7) return "#F5A623";
  if (count >= 3) return "#E8883A";
  return "#B83A6B";
}

export function StreakBadge() {
  const { count, isNew, loaded } = useStreak();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isNew && loaded) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.18, duration: 180, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
    }
  }, [isNew, loaded]);

  if (!loaded) return null;

  const color = flameColor(count);
  const milestone = getMilestoneMsg(count);
  const label =
    count === 1
      ? "First day — welcome back!"
      : `${count} day streak`;

  return (
    <Animated.View style={[s.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <View style={[s.card, { borderColor: color + "30", backgroundColor: color + "0D" }]}>
        <View style={[s.iconWrap, { backgroundColor: color + "20" }]}>
          <Feather name="zap" size={16} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.label, { color }]}>{label}</Text>
          {milestone ? (
            <Text style={[s.milestone, { color }]}>{milestone}</Text>
          ) : (
            <Text style={s.sub}>
              {count < 3
                ? "Come back tomorrow to build your streak"
                : "You're showing up for your family"}
            </Text>
          )}
        </View>
        <StreakDots count={count} color={color} />
      </View>
    </Animated.View>
  );
}

function StreakDots({ count, color }: { count: number; color: string }) {
  const dots = Math.min(count, 7);
  return (
    <View style={d.row}>
      {Array.from({ length: 7 }).map((_, i) => (
        <View
          key={i}
          style={[
            d.dot,
            i < dots
              ? { backgroundColor: color }
              : { backgroundColor: color + "25" },
          ]}
        />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: "700" as const,
    lineHeight: 19,
  },
  milestone: {
    fontSize: 12,
    fontWeight: "600" as const,
    marginTop: 1,
  },
  sub: {
    fontSize: 11,
    color: "#8A7A9A",
    marginTop: 1,
  },
});

const d = StyleSheet.create({
  row: { flexDirection: "row", gap: 4, alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
