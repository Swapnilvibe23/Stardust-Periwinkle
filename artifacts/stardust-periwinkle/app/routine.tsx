import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
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

import { useColors } from "@/hooks/useColors";
import { ROUTINES, Routine } from "@/utils/content";
import { SYSTEME_IO_URL } from "@/constants/monetization";

const ICON_COLORS: Record<string, string> = {
  sun: "#F5A623",
  moon: "#6B5B95",
  zap: "#E53935",
};

export default function RoutineScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Routine>(ROUTINES[0]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const s = makeStyles(colors);
  const iconColor = ICON_COLORS[selected.icon] ?? colors.primary;

  function toggleStep(i: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function selectRoutine(r: Routine) {
    setSelected(r);
    setCompletedSteps(new Set());
  }

  const progress = completedSteps.size / selected.steps.length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[s.container, { paddingTop: 16, paddingBottom: insets.bottom + 60 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.tabRow}>
        {ROUTINES.map((r) => (
          <TouchableOpacity
            key={r.name}
            style={[s.tab, selected.name === r.name && s.tabActive]}
            onPress={() => selectRoutine(r)}
            activeOpacity={0.7}
          >
            <Feather
              name={r.icon as any}
              size={14}
              color={selected.name === r.name ? colors.primary : colors.mutedForeground}
            />
            <Text style={[s.tabText, selected.name === r.name && s.tabTextActive]}>
              {r.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[s.headerCard, { backgroundColor: iconColor + "15" }]}>
        <View style={[s.headerIcon, { backgroundColor: iconColor + "25" }]}>
          <Feather name={selected.icon as any} size={26} color={iconColor} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.headerTitle, { color: iconColor }]}>{selected.name}</Text>
          <Text style={s.headerSub}>
            {completedSteps.size}/{selected.steps.length} steps · Tap to check off
          </Text>
        </View>
      </View>

      <View style={s.progressTrack}>
        <View
          style={[s.progressFill, { width: `${progress * 100}%` as any, backgroundColor: iconColor }]}
        />
      </View>

      {selected.steps.map((step, i) => {
        const done = completedSteps.has(i);
        return (
          <TouchableOpacity
            key={i}
            style={[s.stepCard, done && s.stepCardDone]}
            onPress={() => toggleStep(i)}
            activeOpacity={0.75}
          >
            <View style={[s.checkbox, done && { backgroundColor: iconColor, borderColor: iconColor }]}>
              {done && <Feather name="check" size={12} color="#fff" />}
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={[s.stepAction, done && s.stepDoneText]}>
                {i + 1}. {step.action}
              </Text>
              <View style={[s.scriptBubble, { backgroundColor: done ? colors.muted : iconColor + "10" }]}>
                <Text style={[s.scriptText, { color: done ? colors.mutedForeground : colors.foreground }]}>
                  {step.script}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {progress === 1 && (
        <View style={[s.completeBanner, { backgroundColor: iconColor + "15" }]}>
          <Feather name="star" size={20} color={iconColor} />
          <Text style={[s.completeText, { color: iconColor }]}>
            You did it! That's a win.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={s.resetButton}
        onPress={() => setCompletedSteps(new Set())}
      >
        <Feather name="refresh-cw" size={14} color={colors.mutedForeground} />
        <Text style={s.resetText}>Reset Steps</Text>
      </TouchableOpacity>

      {/* Bundle CTA */}
      <Pressable
        style={s.bundleCta}
        onPress={() => WebBrowser.openBrowserAsync(SYSTEME_IO_URL)}
      >
        <View style={s.bundleCtaHeader}>
          <Feather name="package" size={14} color="#B83A6B" />
          <Text style={s.bundleCtaEyebrow}>Monthly Pack</Text>
        </View>
        <Text style={s.bundleCtaTitle}>
          Want 30 days of pre-planned routines, activity ideas, and meal plans — all printable?
        </Text>
        <View style={s.bundleCtaButton}>
          <Text style={s.bundleCtaButtonText}>Get the Monthly Pack</Text>
          <Feather name="external-link" size={12} color="#B83A6B" />
        </View>
      </Pressable>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    tabRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
    tab: {
      flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 5, paddingVertical: 10, borderRadius: 12,
      backgroundColor: colors.muted, borderWidth: 1.5, borderColor: colors.border,
    },
    tabActive: { backgroundColor: colors.secondary, borderColor: colors.primary },
    tabText: { fontSize: 11, color: colors.mutedForeground, fontWeight: "600" as const },
    tabTextActive: { color: colors.primary },
    headerCard: {
      flexDirection: "row", alignItems: "center", gap: 14,
      borderRadius: 16, padding: 16, marginBottom: 12,
    },
    headerIcon: { width: 52, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
    headerTitle: { fontSize: 18, fontWeight: "800" as const },
    headerSub: { fontSize: 12, color: colors.mutedForeground, marginTop: 2 },
    progressTrack: { height: 4, backgroundColor: colors.border, borderRadius: 2, marginBottom: 16, overflow: "hidden" },
    progressFill: { height: 4, borderRadius: 2 },
    stepCard: {
      flexDirection: "row", gap: 12, backgroundColor: colors.card,
      borderRadius: 14, padding: 14, marginBottom: 10, alignItems: "flex-start",
      shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 }, elevation: 1,
    },
    stepCardDone: { opacity: 0.6 },
    checkbox: {
      width: 24, height: 24, borderRadius: 12, borderWidth: 2,
      borderColor: colors.border, alignItems: "center", justifyContent: "center",
      flexShrink: 0, marginTop: 2,
    },
    stepAction: { fontSize: 14, fontWeight: "700" as const, color: colors.foreground },
    stepDoneText: { textDecorationLine: "line-through", color: colors.mutedForeground },
    scriptBubble: { borderRadius: 8, padding: 10, marginTop: 2 },
    scriptText: { fontSize: 13, lineHeight: 19, fontStyle: "italic" },
    completeBanner: {
      flexDirection: "row", alignItems: "center", gap: 10,
      borderRadius: 14, padding: 16, marginBottom: 12, justifyContent: "center",
    },
    completeText: { fontSize: 15, fontWeight: "700" as const },
    resetButton: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 6, padding: 12, marginBottom: 20,
    },
    resetText: { fontSize: 13, color: colors.mutedForeground },
    bundleCta: {
      backgroundColor: "#FFF0F7", borderRadius: 16, padding: 18, gap: 8,
    },
    bundleCtaHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
    bundleCtaEyebrow: {
      fontSize: 11, fontWeight: "700" as const, color: "#B83A6B",
      textTransform: "uppercase", letterSpacing: 0.6,
    },
    bundleCtaTitle: { fontSize: 14, fontWeight: "600" as const, color: "#4A2D5A", lineHeight: 20 },
    bundleCtaButton: {
      flexDirection: "row", alignItems: "center", gap: 6,
      alignSelf: "flex-start", backgroundColor: "rgba(184,58,107,0.12)",
      paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginTop: 4,
    },
    bundleCtaButtonText: { fontSize: 13, fontWeight: "700" as const, color: "#B83A6B" },
  });
}
