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

import { UpgradeBanner } from "@/components/UpgradeBanner";
import { UsageIndicator } from "@/components/UsageIndicator";
import { useChild } from "@/contexts/ChildContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useColors } from "@/hooks/useColors";
import { useDailyLimit } from "@/hooks/useDailyLimit";
import { DAILY_LIMITS } from "@/constants/monetization";
import { CALM_SCENARIOS, CalmResult, getCalmResult } from "@/utils/content";

const TIME_OPTIONS = ["2 min", "5 min", "10 min"];

export default function CalmScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { activeChild } = useChild();
  const { addFavorite, isFavorited } = useFavorites();
  const { usedToday, remaining, isAtLimit, increment, loaded } = useDailyLimit(
    "calm",
    DAILY_LIMITS.calm
  );

  const [scenario, setScenario] = useState<string>(CALM_SCENARIOS[0]);
  const [time, setTime] = useState("5 min");
  const [result, setResult] = useState<CalmResult | null>(null);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(false);

  const s = makeStyles(colors);

  async function generate() {
    if (!activeChild) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const res = getCalmResult(scenario as any, activeChild.ageRange);
    setResult(res);
    const newCount = await increment();
    // Show upgrade banner once they hit the limit
    if (newCount >= DAILY_LIMITS.calm) {
      setShowUpgradeBanner(true);
    }
  }

  function save() {
    if (!result) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addFavorite({
      type: "calm",
      title: `${scenario} (Ages ${activeChild?.ageRange})`,
      childName: activeChild?.name,
      content: {
        whatToSay: result.whatToSay,
        whatToDo: result.whatToDo,
        whatToTry: result.whatToTry,
        activity: result.activity,
        calmingAction: result.calmingAction,
      },
    });
  }

  const savedTitle = `${scenario} (Ages ${activeChild?.ageRange})`;
  const alreadySaved = isFavorited(savedTitle);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[
        s.container,
        { paddingTop: 16, paddingBottom: insets.bottom + 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {!activeChild && (
        <View style={s.warningBanner}>
          <Feather name="alert-circle" size={14} color="#B83A6B" />
          <Text style={s.warningText}>
            Add a child profile in the Profile tab for age-appropriate guidance.
          </Text>
        </View>
      )}

      <Text style={s.sectionLabel}>What's happening?</Text>
      <View style={s.chipRow}>
        {CALM_SCENARIOS.map((sc) => (
          <TouchableOpacity
            key={sc}
            style={[s.chip, scenario === sc && s.chipActive]}
            onPress={() => {
              setScenario(sc);
              setResult(null);
            }}
          >
            <Text style={[s.chipText, scenario === sc && s.chipTextActive]}>{sc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionLabel}>How much time do you have?</Text>
      <View style={s.timeRow}>
        {TIME_OPTIONS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[s.timeChip, time === t && s.timeChipActive]}
            onPress={() => setTime(t)}
          >
            <Text style={[s.timeText, time === t && s.timeTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeChild && (
        <View style={s.ageNote}>
          <Feather name="user" size={12} color={colors.primary} />
          <Text style={s.ageNoteText}>
            Guidance for {activeChild.name} · Ages {activeChild.ageRange}
          </Text>
        </View>
      )}

      {loaded && (
        <UsageIndicator
          remaining={remaining}
          limit={DAILY_LIMITS.calm}
          featureName="Calm This Moment"
        />
      )}

      <TouchableOpacity
        style={[s.generateButton, isAtLimit && s.generateButtonAtLimit]}
        onPress={generate}
        activeOpacity={0.8}
      >
        <Text style={s.generateButtonText}>
          {isAtLimit ? "Show Me What to Do" : "Show Me What to Do"}
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={s.resultContainer}>
          <ResultStep
            step="1"
            label="What to Say"
            content={result.whatToSay}
            color="#B83A6B"
            colors={colors}
          />
          <ResultStep
            step="2"
            label="What to Do"
            content={result.whatToDo}
            color="#7B8ECC"
            colors={colors}
          />
          <ResultStep
            step="3"
            label="What to Try"
            content={result.whatToTry}
            color="#6B5B95"
            colors={colors}
          />

          <View style={s.extraCard}>
            <View style={s.extraHeader}>
              <Feather name="star" size={14} color="#F5A623" />
              <Text style={s.extraLabel}>Try This Activity</Text>
            </View>
            <Text style={s.extraContent}>{result.activity}</Text>
          </View>

          <View style={[s.extraCard, { backgroundColor: "#F0F7FF" }]}>
            <View style={s.extraHeader}>
              <Feather name="wind" size={14} color="#7B8ECC" />
              <Text style={[s.extraLabel, { color: "#7B8ECC" }]}>Calming Action for You</Text>
            </View>
            <Text style={s.extraContent}>{result.calmingAction}</Text>
          </View>

          <Pressable
            style={[s.saveButton, alreadySaved && s.saveButtonSaved]}
            onPress={save}
            disabled={alreadySaved}
          >
            <Feather
              name={alreadySaved ? "check" : "heart"}
              size={16}
              color={alreadySaved ? colors.mutedForeground : "#B83A6B"}
            />
            <Text style={[s.saveButtonText, alreadySaved && { color: colors.mutedForeground }]}>
              {alreadySaved ? "Saved to Favorites" : "Save to Favorites"}
            </Text>
          </Pressable>

          {showUpgradeBanner && (
            <UpgradeBanner
              variant="limit"
              onDismiss={() => setShowUpgradeBanner(false)}
            />
          )}
        </View>
      )}

      {/* Show soft CTA after a few uses even without hitting limit */}
      {!result && usedToday >= 3 && !isAtLimit && (
        <UpgradeBanner variant="soft" />
      )}
    </ScrollView>
  );
}

function ResultStep({
  step,
  label,
  content,
  color,
  colors,
}: {
  step: string;
  label: string;
  content: string;
  color: string;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={[rstyles.card, { backgroundColor: colors.card }]}>
      <View style={[rstyles.badge, { backgroundColor: color }]}>
        <Text style={rstyles.badgeText}>{step}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[rstyles.label, { color }]}>{label}</Text>
        <Text style={[rstyles.content, { color: colors.foreground }]}>{content}</Text>
      </View>
    </View>
  );
}

const rstyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    flexShrink: 0,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "800" as const },
  label: {
    fontSize: 11,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  content: { fontSize: 14, lineHeight: 21 },
});

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    warningBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#FFF0F4",
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
    },
    warningText: { flex: 1, fontSize: 13, color: "#B83A6B", lineHeight: 18 },
    sectionLabel: {
      fontSize: 12,
      fontWeight: "700" as const,
      color: colors.mutedForeground,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 10,
      marginTop: 16,
    },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 4 },
    chip: {
      paddingHorizontal: 13,
      paddingVertical: 7,
      borderRadius: 20,
      backgroundColor: colors.muted,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    chipActive: { backgroundColor: colors.secondary, borderColor: colors.primary },
    chipText: { fontSize: 13, color: colors.mutedForeground, fontWeight: "500" as const },
    chipTextActive: { color: colors.primary, fontWeight: "600" as const },
    timeRow: { flexDirection: "row", gap: 10 },
    timeChip: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: colors.muted,
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    timeChipActive: { backgroundColor: colors.secondary, borderColor: colors.primary },
    timeText: { fontSize: 14, color: colors.mutedForeground, fontWeight: "500" as const },
    timeTextActive: { color: colors.primary, fontWeight: "700" as const },
    ageNote: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 12,
      marginBottom: 2,
    },
    ageNoteText: { fontSize: 12, color: colors.primary, fontWeight: "500" as const },
    generateButton: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      alignItems: "center",
      marginTop: 12,
    },
    generateButtonAtLimit: {
      backgroundColor: "#C98DAA",
    },
    generateButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" as const },
    resultContainer: { marginTop: 20 },
    extraCard: {
      backgroundColor: "#FFF5E6",
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
    },
    extraHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
    extraLabel: {
      fontSize: 11,
      fontWeight: "700" as const,
      color: "#F5A623",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    extraContent: { fontSize: 14, color: colors.foreground, lineHeight: 21 },
    saveButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 2,
      borderColor: "#B83A6B",
      borderRadius: 12,
      padding: 14,
      marginTop: 8,
    },
    saveButtonSaved: { borderColor: colors.border },
    saveButtonText: { fontSize: 14, fontWeight: "600" as const, color: "#B83A6B" },
  });
}
