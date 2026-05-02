import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ChildSelector from "@/components/ChildSelector";
import { StreakBadge } from "@/components/StreakBadge";
import { TimeBasedSuggestion } from "@/components/TimeBasedSuggestion";
import { useChild } from "@/contexts/ChildContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useColors } from "@/hooks/useColors";
import { SYSTEME_IO_URL } from "@/constants/monetization";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { children } = useChild();
  const { favorites } = useFavorites();
  const s = makeStyles(colors);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  function nav(route: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  }

  function openUpgrade() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    WebBrowser.openBrowserAsync(SYSTEME_IO_URL);
  }

  const hasSaves = favorites.length > 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[
        s.container,
        { paddingTop: topPad + 16, paddingBottom: bottomPad + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={s.logo}
          contentFit="contain"
        />
        <Text style={s.title}>Stardust & Periwinkle</Text>
        <Text style={s.subtitle}>Making mom-life a little easier</Text>

        <View style={s.selectorRow}>
          {children.length > 0 ? (
            <ChildSelector />
          ) : (
            <Pressable style={s.addChildPrompt} onPress={() => router.push("/profile" as any)}>
              <Feather name="plus-circle" size={14} color={colors.primary} />
              <Text style={s.addChildText}>Add your first child</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Daily streak */}
      <StreakBadge />

      {/* Time-based contextual suggestion */}
      <TimeBasedSuggestion />

      <View style={s.section}>
        <PrimaryButton
          label="Calm This Moment"
          icon="heart"
          description="Right now, in the thick of it"
          color={colors.primary}
          onPress={() => nav("/calm")}
        />
        <PrimaryButton
          label="What Now?"
          icon="zap"
          description="Find the perfect activity"
          color={colors.accent}
          onPress={() => nav("/whatnow")}
        />
        <PrimaryButton
          label="Last Story Tonight"
          icon="moon"
          description="A calm bedtime story"
          color="#6B5B95"
          onPress={() => nav("/story")}
        />
      </View>

      <View style={s.section}>
        <Text style={s.sectionLabel}>Quick Tools</Text>
        <View style={s.secondaryRow}>
          <SecondaryButton
            label="Let's Get Through This"
            icon="list"
            onPress={() => nav("/routine")}
            colors={colors}
          />
          <SecondaryButton
            label="Take a Breath"
            icon="wind"
            onPress={() => nav("/breathe")}
            colors={colors}
          />
        </View>
      </View>

      {/* Saved items shortcut */}
      {hasSaves && (
        <Pressable
          style={({ pressed }) => [s.savesRow, { opacity: pressed ? 0.85 : 1 }]}
          onPress={() => nav("/(tabs)/favorites")}
        >
          <Feather name="heart" size={14} color={colors.primary} />
          <Text style={s.savesText}>
            {favorites.length} saved moment{favorites.length !== 1 ? "s" : ""} — tap to revisit
          </Text>
          <Feather name="chevron-right" size={14} color={colors.mutedForeground} />
        </Pressable>
      )}

      {/* Monetization CTA banner */}
      <Pressable onPress={openUpgrade} style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}>
        <LinearGradient
          colors={["#F7E8F0", "#EDE0F5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.ctaBanner}
        >
          <View style={s.ctaIconRow}>
            <View style={s.ctaIconWrap}>
              <Feather name="package" size={16} color="#B83A6B" />
            </View>
            <Text style={s.ctaEyebrow}>Monthly Pack</Text>
          </View>
          <Text style={s.ctaTitle}>
            Want a full month of ready-to-use routines, activities, and meal plans?
          </Text>
          <Text style={s.ctaSub}>
            30+ done-for-you days — no guessing, no planning, just show up.
          </Text>
          <View style={s.ctaButton}>
            <Text style={s.ctaButtonText}>Learn More</Text>
            <Feather name="external-link" size={13} color="#B83A6B" />
          </View>
          <Text style={s.privacyNote}>
            🔒 Your data is private and used only to improve your experience.
          </Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}

function PrimaryButton({
  label, icon, description, color, onPress,
}: {
  label: string; icon: string; description: string; color: string; onPress: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable
      style={({ pressed }) => [pbs.card, { backgroundColor: colors.card, opacity: pressed ? 0.85 : 1 }]}
      onPress={onPress}
    >
      <View style={[pbs.iconWrap, { backgroundColor: color + "18" }]}>
        <Feather name={icon as any} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[pbs.label, { color: colors.foreground }]}>{label}</Text>
        <Text style={[pbs.desc, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

function SecondaryButton({
  label, icon, onPress, colors,
}: {
  label: string; icon: string; onPress: () => void; colors: ReturnType<typeof useColors>;
}) {
  return (
    <Pressable
      style={({ pressed }) => [sbs.card, { backgroundColor: colors.card, opacity: pressed ? 0.8 : 1 }]}
      onPress={onPress}
    >
      <Feather name={icon as any} size={20} color={colors.primary} />
      <Text style={[sbs.label, { color: colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

const pbs = StyleSheet.create({
  card: {
    flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 16,
    gap: 14, marginBottom: 10,
    shadowColor: "#B83A6B", shadowOpacity: 0.07, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  iconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 16, fontWeight: "700" as const },
  desc: { fontSize: 12, marginTop: 2 },
});

const sbs = StyleSheet.create({
  card: {
    flex: 1, alignItems: "center", justifyContent: "center", padding: 16,
    borderRadius: 16, gap: 8,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 1, minHeight: 90,
  },
  label: { fontSize: 13, fontWeight: "600" as const, textAlign: "center" },
});

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    header: { alignItems: "center", marginBottom: 20 },
    logo: { width: 100, height: 100, marginBottom: 8 },
    title: { fontSize: 22, fontWeight: "800" as const, color: colors.foreground, textAlign: "center", letterSpacing: -0.5 },
    subtitle: { fontSize: 13, color: colors.mutedForeground, textAlign: "center", marginTop: 4, marginBottom: 12 },
    selectorRow: { marginTop: 4 },
    addChildPrompt: {
      flexDirection: "row", alignItems: "center", gap: 6,
      backgroundColor: colors.secondary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    },
    addChildText: { fontSize: 13, color: colors.primary, fontWeight: "600" as const },
    section: { marginBottom: 20 },
    sectionLabel: {
      fontSize: 12, fontWeight: "700" as const, color: colors.mutedForeground,
      textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10,
    },
    secondaryRow: { flexDirection: "row", gap: 10 },
    savesRow: {
      flexDirection: "row", alignItems: "center", gap: 8,
      backgroundColor: colors.secondary, borderRadius: 12,
      paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16,
    },
    savesText: { flex: 1, fontSize: 13, color: colors.primary, fontWeight: "500" as const },
    ctaBanner: { borderRadius: 20, padding: 20, gap: 8 },
    ctaIconRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 },
    ctaIconWrap: {
      width: 28, height: 28, borderRadius: 8,
      backgroundColor: "rgba(184,58,107,0.12)", alignItems: "center", justifyContent: "center",
    },
    ctaEyebrow: { fontSize: 11, fontWeight: "700" as const, color: "#B83A6B", textTransform: "uppercase", letterSpacing: 0.6 },
    ctaTitle: { fontSize: 15, fontWeight: "700" as const, color: "#4A2D5A", lineHeight: 22 },
    ctaSub: { fontSize: 12, color: "#6B4A7E", lineHeight: 18 },
    ctaButton: {
      flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start",
      backgroundColor: "rgba(255,255,255,0.75)", paddingHorizontal: 14, paddingVertical: 8,
      borderRadius: 20, marginTop: 4,
    },
    ctaButtonText: { fontSize: 13, fontWeight: "700" as const, color: "#B83A6B" },
    privacyNote: { fontSize: 11, color: "#9B7BAF", marginTop: 6, textAlign: "center" },
  });
}
