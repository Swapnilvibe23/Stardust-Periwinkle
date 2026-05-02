import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FavoriteItem, useFavorites } from "@/contexts/FavoritesContext";
import { useColors } from "@/hooks/useColors";

const TYPE_LABELS: Record<FavoriteItem["type"], string> = {
  calm: "Calm This Moment",
  activity: "Activity",
  story: "Bedtime Story",
  routine: "Routine",
  breathe: "Take a Breath",
};

const TYPE_ICONS: Record<FavoriteItem["type"], string> = {
  calm: "heart",
  activity: "zap",
  story: "moon",
  routine: "list",
  breathe: "wind",
};

const TYPE_COLORS: Record<FavoriteItem["type"], string> = {
  calm: "#B83A6B",
  activity: "#7B8ECC",
  story: "#6B5B95",
  routine: "#4CAF50",
  breathe: "#FF9800",
};

export default function FavoritesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites, removeFavorite } = useFavorites();
  const [expanded, setExpanded] = useState<string | null>(null);

  const s = makeStyles(colors);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (favorites.length === 0) {
    return (
      <View style={[s.empty, { paddingTop: topPad + 20 }]}>
        <Feather name="heart" size={48} color={colors.border} />
        <Text style={s.emptyTitle}>No favorites yet</Text>
        <Text style={s.emptyText}>
          Save moments, activities, and stories{"\n"}from any feature to find them here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[
        s.container,
        { paddingTop: topPad + 16, paddingBottom: bottomPad + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={s.heading}>Saved Moments</Text>
      <Text style={s.subheading}>{favorites.length} saved</Text>

      {favorites.map((item) => {
        const isOpen = expanded === item.id;
        const color = TYPE_COLORS[item.type];
        const icon = TYPE_ICONS[item.type];

        return (
          <View key={item.id} style={s.card}>
            <TouchableOpacity
              style={s.cardHeader}
              onPress={() => setExpanded(isOpen ? null : item.id)}
              activeOpacity={0.7}
            >
              <View style={[s.iconBadge, { backgroundColor: color + "18" }]}>
                <Feather name={icon as any} size={16} color={color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.cardLabel}>{TYPE_LABELS[item.type]}</Text>
                <Text style={s.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.childName ? <Text style={s.cardChild}>For {item.childName}</Text> : null}
              </View>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  removeFavorite(item.id);
                }}
                hitSlop={12}
              >
                <Feather name="trash-2" size={16} color={colors.mutedForeground} />
              </TouchableOpacity>
              <Feather
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={16}
                color={colors.mutedForeground}
              />
            </TouchableOpacity>

            {isOpen && (
              <View style={s.cardBody}>
                {Object.entries(item.content).map(([key, value]) => (
                  <View key={key} style={s.contentRow}>
                    <Text style={[s.contentKey, { color }]}>{formatKey(key)}</Text>
                    <Text style={s.contentValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    empty: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 40,
      gap: 12,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700" as const,
      color: colors.foreground,
    },
    emptyText: {
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: "center",
      lineHeight: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: "800" as const,
      color: colors.foreground,
      marginBottom: 4,
    },
    subheading: {
      fontSize: 13,
      color: colors.mutedForeground,
      marginBottom: 20,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 10,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      gap: 10,
    },
    iconBadge: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    cardLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      fontWeight: "600" as const,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700" as const,
      color: colors.foreground,
    },
    cardChild: {
      fontSize: 11,
      color: colors.mutedForeground,
      marginTop: 1,
    },
    cardBody: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      padding: 14,
      gap: 12,
    },
    contentRow: {
      gap: 4,
    },
    contentKey: {
      fontSize: 11,
      fontWeight: "700" as const,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    contentValue: {
      fontSize: 14,
      color: colors.foreground,
      lineHeight: 20,
    },
  });
}
