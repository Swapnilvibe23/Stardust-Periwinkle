import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getTimeContext, navigateToTimeFeature } from "@/hooks/useTimeContext";

export function TimeBasedSuggestion() {
  const ctx = getTimeContext();

  return (
    <Pressable
      style={({ pressed }) => [
        s.card,
        {
          backgroundColor: ctx.color + "12",
          borderColor: ctx.color + "35",
          opacity: pressed ? 0.88 : 1,
        },
      ]}
      onPress={navigateToTimeFeature}
    >
      <View style={[s.iconWrap, { backgroundColor: ctx.color + "22" }]}>
        <Feather name={ctx.primaryIcon as any} size={18} color={ctx.color} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[s.eyebrow, { color: ctx.color }]}>Right now for you</Text>
        <Text style={s.suggestion}>{ctx.suggestionText}</Text>
      </View>
      <Feather name="arrow-right" size={16} color={ctx.color} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  suggestion: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#2D1F3A",
    lineHeight: 18,
  },
});
