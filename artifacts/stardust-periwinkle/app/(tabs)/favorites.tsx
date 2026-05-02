import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FavoriteItem, useFavorites } from "@/contexts/FavoritesContext";
import { useColors } from "@/hooks/useColors";
import { getTimeContext } from "@/hooks/useTimeContext";
import { SYSTEME_IO_URL } from "@/constants/monetization";
import * as WebBrowser from "expo-web-browser";

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

const TYPE_ROUTES: Record<FavoriteItem["type"], string> = {
  calm: "/calm",
  activity: "/whatnow",
  story: "/story",
  routine: "/routine",
  breathe: "/breathe",
};

export default function FavoritesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites, removeFavorite } = useFavorites();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<FavoriteItem["type"] | "all">("all");

  const s = makeStyles(colors);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const timeCtx = getTimeContext();

  // Suggest going to the time-relevant feature if they have saves of that type
  const timeSuggestion = (() => {
    const typeMap: Record<string, FavoriteItem["type"]> = {
      "/calm": "calm",
      "/whatnow": "activity",
      "/story": "story",
      "/routine": "routine",
      "/breathe": "breathe",
    };
    const relevantType = typeMap[timeCtx.primaryRoute];
    const relevantSaves = favorites.filter((f) => f.type === relevantType);
    if (relevantSaves.length > 0) return { type: relevantType, count: relevantSaves.length };
    return null;
  })();

  const filtered = filter === "all" ? favorites : favorites.filter((f) => f.type === filter);
  const typesPresent = Array.from(new Set(favorites.map((f) => f.type)));

  if (favorites.length === 0) {
    return (
      <View style={[s.empty, { paddingTop: topPad + 20 }]}>
        <Feather name="heart" size={48} color={colors.border} />
        <Text style={s.emptyTitle}>No favorites yet</Text>
        <Text style={s.emptyText}>
          Save moments, activities, and stories{"\n"}from any feature to find them here.
        </Text>
        <Pressable
          style={[s.emptyButton, { backgroundColor: colors.secondary }]}
          onPress={() => router.push("/" as any)}
        >
          <Text style={[s.emptyButtonText, { color: colors.primary }]}>Go to Home</Text>
        </Pressable>
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

      {/* Time-based suggestion: try a saved item right now */}
      {timeSuggestion && (
        <Pressable
          style={[
            s.timeSuggestion,
            {
              backgroundColor: timeCtx.color + "10",
              borderColor: timeCtx.color + "30",
            },
          ]}
          onPress={() => router.push(timeCtx.primaryRoute as any)}
        >
          <View style={[s.timeSuggestionIcon, { backgroundColor: timeCtx.color + "20" }]}>
            <Feather name={timeCtx.primaryIcon as any} size={14} color={timeCtx.color} />
          </View>
          <Text style={[s.timeSuggestionText, { color: timeCtx.color }]}>
            You have {timeSuggestion.count} saved {TYPE_LABELS[timeSuggestion.type].toLowerCase()}
            {timeSuggestion.count !== 1 ? "s" : ""} — perfect for right now →
          </Text>
        </Pressable>
      )}

      {/* Type filter pills */}
      {typesPresent.length > 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterScroll}>
          <View style={s.filterRow}>
            <TouchableOpacity
              style={[s.filterChip, filter === "all" && s.filterChipActive]}
              onPress={() => setFilter("all")}
            >
              <Text style={[s.filterText, filter === "all" && s.filterTextActive]}>All</Text>
            </TouchableOpacity>
            {typesPresent.map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  s.filterChip,
                  filter === t && { backgroundColor: TYPE_COLORS[t] + "20", borderColor: TYPE_COLORS[t] },
                ]}
                onPress={() => setFilter(t)}
              >
                <Feather name={TYPE_ICONS[t] as any} size={11} color={filter === t ? TYPE_COLORS[t] : colors.mutedForeground} />
                <Text
                  style={[
                    s.filterText,
                    filter === t && { color: TYPE_COLORS[t], fontWeight: "700" as const },
                  ]}
                >
                  {TYPE_LABELS[t]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {filtered.map((item, idx) => {
        const isOpen = expanded === item.id;
        const color = TYPE_COLORS[item.type];
        const icon = TYPE_ICONS[item.type];
        const isRecent = idx < 3;

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
                <View style={s.labelRow}>
                  <Text style={s.cardLabel}>{TYPE_LABELS[item.type]}</Text>
                  {isRecent && (
                    <View style={[s.recentBadge, { backgroundColor: color + "15" }]}>
                      <Feather name="clock" size={8} color={color} />
                      <Text style={[s.recentBadgeText, { color }]}>used before</Text>
                    </View>
                  )}
                </View>
                <Text style={s.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.childName ? <Text style={s.cardChild}>For {item.childName}</Text> : null}
              </View>

              <TouchableOpacity
                onPress={() => router.push(TYPE_ROUTES[item.type] as any)}
                hitSlop={8}
                style={s.useAgainBtn}
              >
                <Feather name="refresh-cw" size={13} color={color} />
              </TouchableOpacity>
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

                {/* "Use this again" prompt */}
                <Pressable
                  style={[s.useAgainFull, { backgroundColor: color + "12", borderColor: color + "30" }]}
                  onPress={() => router.push(TYPE_ROUTES[item.type] as any)}
                >
                  <Feather name="refresh-cw" size={13} color={color} />
                  <Text style={[s.useAgainText, { color }]}>Generate a new one like this</Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      })}

      {/* Bundle upsell at the bottom of a non-empty list */}
      <Pressable
        style={s.bundleCta}
        onPress={() => WebBrowser.openBrowserAsync(SYSTEME_IO_URL)}
      >
        <Feather name="package" size={14} color="#B83A6B" />
        <Text style={s.bundleCtaText}>
          Want 30 days of pre-planned content like this? Get the Monthly Pack →
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function formatKey(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    empty: {
      flex: 1, backgroundColor: colors.background,
      alignItems: "center", justifyContent: "center", paddingHorizontal: 40, gap: 12,
    },
    emptyTitle: { fontSize: 18, fontWeight: "700" as const, color: colors.foreground },
    emptyText: { fontSize: 14, color: colors.mutedForeground, textAlign: "center", lineHeight: 20 },
    emptyButton: { borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10, marginTop: 4 },
    emptyButtonText: { fontSize: 14, fontWeight: "600" as const },
    heading: { fontSize: 24, fontWeight: "800" as const, color: colors.foreground, marginBottom: 4 },
    subheading: { fontSize: 13, color: colors.mutedForeground, marginBottom: 16 },
    timeSuggestion: {
      flexDirection: "row", alignItems: "center", gap: 10,
      borderWidth: 1.5, borderRadius: 12, padding: 12, marginBottom: 14,
    },
    timeSuggestionIcon: {
      width: 30, height: 30, borderRadius: 8,
      alignItems: "center", justifyContent: "center", flexShrink: 0,
    },
    timeSuggestionText: { fontSize: 12, fontWeight: "600" as const, flex: 1, lineHeight: 17 },
    filterScroll: { marginBottom: 14 },
    filterRow: { flexDirection: "row", gap: 8, paddingRight: 20 },
    filterChip: {
      flexDirection: "row", alignItems: "center", gap: 5,
      paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
      backgroundColor: colors.muted, borderWidth: 1.5, borderColor: colors.border,
    },
    filterChipActive: { backgroundColor: colors.secondary, borderColor: colors.primary },
    filterText: { fontSize: 12, color: colors.mutedForeground, fontWeight: "500" as const },
    filterTextActive: { color: colors.primary, fontWeight: "700" as const },
    card: {
      backgroundColor: colors.card, borderRadius: 16, marginBottom: 10, overflow: "hidden",
      shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 }, elevation: 1,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", padding: 14, gap: 10 },
    iconBadge: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    labelRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 1 },
    cardLabel: { fontSize: 11, color: colors.mutedForeground, fontWeight: "600" as const, textTransform: "uppercase", letterSpacing: 0.5 },
    recentBadge: {
      flexDirection: "row", alignItems: "center", gap: 3,
      paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10,
    },
    recentBadgeText: { fontSize: 9, fontWeight: "700" as const, textTransform: "uppercase", letterSpacing: 0.3 },
    cardTitle: { fontSize: 14, fontWeight: "700" as const, color: colors.foreground },
    cardChild: { fontSize: 11, color: colors.mutedForeground, marginTop: 1 },
    useAgainBtn: { padding: 4 },
    cardBody: { borderTopWidth: 1, borderTopColor: colors.border, padding: 14, gap: 12 },
    contentRow: { gap: 4 },
    contentKey: { fontSize: 11, fontWeight: "700" as const, textTransform: "uppercase", letterSpacing: 0.5 },
    contentValue: { fontSize: 14, color: colors.foreground, lineHeight: 20 },
    useAgainFull: {
      flexDirection: "row", alignItems: "center", gap: 8,
      borderWidth: 1.5, borderRadius: 10, padding: 10, marginTop: 4,
    },
    useAgainText: { fontSize: 13, fontWeight: "600" as const },
    bundleCta: {
      flexDirection: "row", alignItems: "flex-start", gap: 8,
      backgroundColor: "#FFF0F7", borderRadius: 12,
      padding: 14, marginTop: 8,
    },
    bundleCtaText: { fontSize: 13, color: "#B83A6B", fontWeight: "500" as const, flex: 1, lineHeight: 19 },
  });
}
