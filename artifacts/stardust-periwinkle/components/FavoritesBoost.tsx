import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FavoriteItem, useFavorites } from "@/contexts/FavoritesContext";
import { useColors } from "@/hooks/useColors";

const TYPE_COLORS: Record<FavoriteItem["type"], string> = {
  calm: "#B83A6B",
  activity: "#7B8ECC",
  story: "#6B5B95",
  routine: "#4CAF50",
  breathe: "#FF9800",
};

const TYPE_ICONS: Record<FavoriteItem["type"], string> = {
  calm: "heart",
  activity: "zap",
  story: "moon",
  routine: "list",
  breathe: "wind",
};

interface Props {
  type: FavoriteItem["type"];
  limit?: number;
}

export function FavoritesBoost({ type, limit = 2 }: Props) {
  const colors = useColors();
  const { favorites } = useFavorites();
  const [expanded, setExpanded] = useState<string | null>(null);

  const relevant = favorites.filter((f) => f.type === type).slice(0, limit);

  if (relevant.length === 0) return null;

  const color = TYPE_COLORS[type];
  const icon = TYPE_ICONS[type];

  return (
    <View style={[s.container, { borderColor: color + "25", backgroundColor: color + "06" }]}>
      <View style={s.header}>
        <View style={[s.headerIcon, { backgroundColor: color + "18" }]}>
          <Feather name={icon as any} size={12} color={color} />
        </View>
        <Text style={[s.headerLabel, { color }]}>From your saves</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/favorites" as any)} hitSlop={8}>
          <Text style={[s.seeAll, { color: colors.mutedForeground }]}>See all →</Text>
        </TouchableOpacity>
      </View>

      {relevant.map((item) => {
        const isOpen = expanded === item.id;
        return (
          <View key={item.id}>
            <Pressable
              style={[s.item, isOpen && s.itemOpen]}
              onPress={() => setExpanded(isOpen ? null : item.id)}
            >
              <View style={[s.usedBadge, { backgroundColor: color + "18" }]}>
                <Feather name="clock" size={9} color={color} />
                <Text style={[s.usedText, { color }]}>saved</Text>
              </View>
              <Text style={[s.itemTitle, { color: colors.foreground }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Feather
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={14}
                color={colors.mutedForeground}
              />
            </Pressable>

            {isOpen && (
              <View style={[s.itemBody, { borderTopColor: color + "20" }]}>
                {Object.entries(item.content)
                  .slice(0, 2)
                  .map(([key, val]) => (
                    <View key={key} style={{ gap: 2, marginBottom: 8 }}>
                      <Text style={[s.contentKey, { color }]}>
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Text>
                      <Text style={[s.contentVal, { color: colors.foreground }]}>{val}</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 14,
    marginBottom: 14,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 12,
    paddingBottom: 8,
  },
  headerIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    flex: 1,
  },
  seeAll: {
    fontSize: 11,
    fontWeight: "600" as const,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  itemOpen: {
    paddingBottom: 6,
  },
  usedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    flexShrink: 0,
  },
  usedText: {
    fontSize: 9,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "600" as const,
    flex: 1,
  },
  itemBody: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
  },
  contentKey: {
    fontSize: 10,
    fontWeight: "700" as const,
    textTransform: "capitalize",
    letterSpacing: 0.3,
  },
  contentVal: {
    fontSize: 13,
    lineHeight: 19,
  },
});
