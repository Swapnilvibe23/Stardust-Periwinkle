import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const sections = [
  {
    icon: "user",
    title: "This App Is for Parents",
    body: "Stardust & Periwinkle is designed for parents and caregivers of young children. It is not intended to be used independently by children.",
  },
  {
    icon: "shield",
    title: "No Child Data Collection",
    body: "We do not collect any personal information from children. Child profiles (name, age range, themes) are stored only on your device and are never transmitted to any server.",
  },
  {
    icon: "hard-drive",
    title: "Everything Stays on Your Device",
    body: "All data — including child profiles, saved favorites, and app preferences — is stored locally using your device's secure storage. Nothing leaves your phone.",
  },
  {
    icon: "eye-off",
    title: "No Tracking",
    body: "We do not use analytics, crash reporting, or any tracking technology. Your use of this app is completely private.",
  },
  {
    icon: "bell-off",
    title: "No Ads",
    body: "This app contains no advertising of any kind. There are no third-party ad networks, sponsored content, or promotional tracking.",
  },
  {
    icon: "share-2",
    title: "No Data Sharing",
    body: "We do not share, sell, or transmit any information to third parties. Ever. There are no social features, no connected accounts, and no external data flows.",
  },
  {
    icon: "heart",
    title: "Built with Care",
    body: "Stardust & Periwinkle was built by parents, for parents. Your family's privacy and safety are the foundation of every decision we make.",
  },
];

export default function PrivacyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const s = makeStyles(colors);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[
        s.container,
        { paddingTop: 16, paddingBottom: insets.bottom + 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.hero}>
        <View style={[s.heroIcon, { backgroundColor: colors.accent + "20" }]}>
          <Feather name="shield" size={32} color={colors.accent} />
        </View>
        <Text style={s.heroTitle}>Privacy Notice</Text>
        <Text style={s.heroSub}>
          Simple, clear, and complete. Here's exactly how we treat your family's information.
        </Text>
      </View>

      {sections.map((sec, i) => (
        <View key={i} style={s.card}>
          <View style={[s.cardIcon, { backgroundColor: colors.secondary }]}>
            <Feather name={sec.icon as any} size={16} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{sec.title}</Text>
            <Text style={s.cardBody}>{sec.body}</Text>
          </View>
        </View>
      ))}

      <View style={[s.footer, { borderTopColor: colors.border }]}>
        <Text style={s.footerText}>
          Questions? Contact us at hello@stardustandperiwinkle.com
        </Text>
        <Text style={s.footerVersion}>Stardust & Periwinkle · Version 1.0</Text>
      </View>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    hero: {
      alignItems: "center",
      marginBottom: 28,
      gap: 10,
    },
    heroIcon: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    heroTitle: {
      fontSize: 24,
      fontWeight: "800" as const,
      color: colors.foreground,
    },
    heroSub: {
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: "center",
      lineHeight: 20,
    },
    card: {
      flexDirection: "row",
      gap: 14,
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 1,
    },
    cardIcon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700" as const,
      color: colors.foreground,
      marginBottom: 4,
    },
    cardBody: {
      fontSize: 13,
      color: colors.mutedForeground,
      lineHeight: 19,
    },
    footer: {
      borderTopWidth: 1,
      marginTop: 8,
      paddingTop: 20,
      alignItems: "center",
      gap: 6,
    },
    footerText: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
    },
    footerVersion: {
      fontSize: 11,
      color: colors.border,
    },
  });
}
