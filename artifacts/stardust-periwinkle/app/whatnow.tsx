import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useChild } from "@/contexts/ChildContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useRecentActivities } from "@/hooks/useRecentActivities";
import { useColors } from "@/hooks/useColors";
import { ActivityResult, getActivity } from "@/utils/content";

const TIMES = ["10 min", "20 min", "30 min", "1 hour"];
const ENERGIES = ["Low", "Medium", "High"];
const CONTEXTS = ["Indoors", "Outdoors", "Quiet space"];

export default function WhatNowScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { addFavorite, isFavorited } = useFavorites();
  const { activeChild } = useChild();
  const { recentIds, markUsed } = useRecentActivities();

  const [time, setTime] = useState("20 min");
  const [energy, setEnergy] = useState("Medium");
  const [context, setContext] = useState("Indoors");
  const [result, setResult] = useState<ActivityResult | null>(null);

  const s = makeStyles(colors);

  function generate() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const activity = getActivity(energy, context, time, recentIds, activeChild?.ageRange);
    setResult(activity);
    markUsed(activity.id);
  }

  function save() {
    if (!result) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addFavorite({
      type: "activity",
      title: result.title,
      content: {
        materials: result.materials.join(", "),
        steps: result.steps.join("\n"),
        whyItWorks: result.whyItWorks,
      },
    });
  }

  const alreadySaved = result ? isFavorited(result.title) : false;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[s.container, { paddingTop: 16, paddingBottom: insets.bottom + 40 }]}
      showsVerticalScrollIndicator={false}
    >
      {activeChild && (
        <View style={s.contextNote}>
          <Feather name="user" size={12} color={colors.accent} />
          <Text style={s.contextNoteText}>
            Filtered for {activeChild.name} · Ages {activeChild.ageRange}
          </Text>
        </View>
      )}

      <OptionRow
        label="Time Available"
        options={TIMES}
        selected={time}
        onSelect={(v) => { setTime(v); setResult(null); }}
        colors={colors}
      />
      <OptionRow
        label="Energy Level"
        options={ENERGIES}
        selected={energy}
        onSelect={(v) => { setEnergy(v); setResult(null); }}
        colors={colors}
      />
      <OptionRow
        label="Where Are You?"
        options={CONTEXTS}
        selected={context}
        onSelect={(v) => { setContext(v); setResult(null); }}
        colors={colors}
      />

      {recentIds.length > 0 && !result && (
        <View style={s.recentNote}>
          <Feather name="rotate-cw" size={11} color={colors.mutedForeground} />
          <Text style={s.recentNoteText}>
            Last {Math.min(recentIds.length, 5)} {recentIds.length === 1 ? "activity" : "activities"} won't repeat
          </Text>
        </View>
      )}

      <TouchableOpacity style={s.generateButton} onPress={generate} activeOpacity={0.8}>
        <Text style={s.generateButtonText}>Find an Activity</Text>
      </TouchableOpacity>

      {result && (
        <View style={s.result}>
          <View style={s.resultHeader}>
            <View style={[s.resultIcon, { backgroundColor: colors.accent + "20" }]}>
              <Feather name="zap" size={22} color={colors.accent} />
            </View>
            <Text style={s.resultTitle}>{result.title}</Text>
          </View>

          <Section label="What You'll Need" colors={colors}>
            {result.materials.map((m, i) => (
              <View key={i} style={s.listItem}>
                <View style={s.dot} />
                <Text style={s.listText}>{m}</Text>
              </View>
            ))}
          </Section>

          <Section label="Steps" colors={colors}>
            {result.steps.map((step, i) => (
              <View key={i} style={s.stepItem}>
                <View style={[s.stepNum, { backgroundColor: colors.primary }]}>
                  <Text style={s.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={s.listText}>{step}</Text>
              </View>
            ))}
          </Section>

          <View style={[s.whyCard, { backgroundColor: colors.secondary }]}>
            <Text style={[s.sectionLabel, { color: colors.primary }]}>Why This Works</Text>
            <Text style={s.whyText}>{result.whyItWorks}</Text>
          </View>

          <View style={s.actionRow}>
            <Pressable
              style={[s.saveButton, alreadySaved && { borderColor: colors.border }, { flex: 1 }]}
              onPress={save}
              disabled={alreadySaved}
            >
              <Feather
                name={alreadySaved ? "check" : "heart"}
                size={16}
                color={alreadySaved ? colors.mutedForeground : colors.accent}
              />
              <Text style={[s.saveText, alreadySaved && { color: colors.mutedForeground }]}>
                {alreadySaved ? "Saved" : "Save"}
              </Text>
            </Pressable>

            <Pressable style={[s.tryAnotherButton, { flex: 1 }]} onPress={generate}>
              <Feather name="refresh-cw" size={16} color={colors.mutedForeground} />
              <Text style={s.tryAnotherText}>Try Another</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function OptionRow({
  label,
  options,
  selected,
  onSelect,
  colors,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={{ marginBottom: 4 }}>
      <Text style={[or.label, { color: colors.mutedForeground }]}>{label}</Text>
      <View style={or.row}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              or.chip,
              { backgroundColor: colors.muted, borderColor: colors.border },
              selected === opt && { backgroundColor: colors.secondary, borderColor: colors.accent },
            ]}
            onPress={() => onSelect(opt)}
          >
            <Text
              style={[
                or.chipText,
                { color: colors.mutedForeground },
                selected === opt && { color: colors.accent, fontWeight: "700" as const },
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function Section({
  label,
  colors,
  children,
}: {
  label: string;
  colors: ReturnType<typeof useColors>;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700" as const,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          marginBottom: 8,
          color: colors.mutedForeground,
        }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}

const or = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginTop: 16,
    marginBottom: 8,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  chipText: { fontSize: 13, fontWeight: "500" as const },
});

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    contextNote: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: colors.secondary,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
      alignSelf: "flex-start",
      marginBottom: 4,
    },
    contextNoteText: { fontSize: 12, color: colors.accent, fontWeight: "500" as const },
    recentNote: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 10,
      marginBottom: 2,
    },
    recentNoteText: { fontSize: 12, color: colors.mutedForeground },
    sectionLabel: {
      fontSize: 11,
      fontWeight: "700" as const,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    generateButton: {
      backgroundColor: colors.accent,
      borderRadius: 14,
      padding: 16,
      alignItems: "center",
      marginTop: 20,
    },
    generateButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" as const },
    result: {
      marginTop: 24,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 18,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    resultHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
    },
    resultIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    resultTitle: { fontSize: 18, fontWeight: "800" as const, color: colors.foreground, flex: 1 },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary,
      marginTop: 7,
      flexShrink: 0,
    },
    listItem: { flexDirection: "row", gap: 10, marginBottom: 6, alignItems: "flex-start" },
    listText: { fontSize: 14, color: colors.foreground, lineHeight: 21, flex: 1 },
    stepItem: { flexDirection: "row", gap: 10, marginBottom: 10, alignItems: "flex-start" },
    stepNum: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 1,
    },
    stepNumText: { color: "#fff", fontSize: 11, fontWeight: "800" as const },
    whyCard: { borderRadius: 12, padding: 14, marginBottom: 16 },
    whyText: { fontSize: 14, color: colors.foreground, lineHeight: 21 },
    actionRow: { flexDirection: "row", gap: 10 },
    saveButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 2,
      borderColor: colors.accent,
      borderRadius: 12,
      padding: 12,
    },
    saveText: { fontSize: 14, fontWeight: "600" as const, color: colors.accent },
    tryAnotherButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 12,
    },
    tryAnotherText: { fontSize: 14, fontWeight: "600" as const, color: colors.mutedForeground },
  });
}
