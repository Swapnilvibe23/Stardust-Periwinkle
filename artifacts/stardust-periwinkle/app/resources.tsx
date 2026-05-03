import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { SYSTEME_IO_URL } from "@/constants/monetization";

const RESOURCES = [
  {
    title: "Monthly printable pack",
    description: "A curated set of ready-to-use printables, routines, and calm-down tools.",
    icon: "package",
    color: "#B83A6B",
  },
  {
    title: "Bedtime story collection",
    description: "Gentle stories designed for winding down after a long day.",
    icon: "moon",
    color: "#6B5B95",
  },
  {
    title: "Quick activity bundle",
    description: "Simple low-prep activities for the moments when you need help now.",
    icon: "zap",
    color: "#7B8ECC",
  },
  {
    title: "Parenting guidebook",
    description: "Practical notes and ideas for handling big feelings with less stress.",
    icon: "book-open",
    color: "#4CAF50",
  },
  {
    title: "Printable routines set",
    description: "Morning and bedtime routines you can print and stick on the wall.",
    icon: "list",
    color: "#F5A623",
  },
] as const;

export default function ResourcesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const s = makeStyles(colors);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  function openStore() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    WebBrowser.openBrowserAsync(SYSTEME_IO_URL);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[s.container, { paddingTop: topPad + 16, paddingBottom: bottomPad + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.hero}>
        <View style={s.heroIcon}>
          <Feather name="book" size={22} color={colors.primary} />
        </View>
        <Text style={s.title}>Resources</Text>
        <Text style={s.subheading}>
          A simple collection of my digital products, books, and printables.
        </Text>
      </View>

      {RESOURCES.map((item) => (
        <View key={item.title} style={s.card}>
          <View style={[s.cardIcon, { backgroundColor: item.color + "18" }]}>
            <Feather name={item.icon as any} size={18} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.cardTitle, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[s.cardDesc, { color: colors.mutedForeground }]}>{item.description}</Text>
          </View>
          <View style={[s.pill, { borderColor: item.color + "35" }]}>
            <Text style={[s.pillText, { color: item.color }]}>Paid</Text>
          </View>
        </View>
      ))}

      <Pressable style={s.cta} onPress={openStore}>
        <Text style={s.ctaTitle}>View my digital shop</Text>
        <Text style={s.ctaSub}>Open the monthly pack and future product releases.</Text>
        <View style={s.ctaButton}>
          <Text style={s.ctaButtonText}>Open Store</Text>
          <Feather name="external-link" size={13} color="#B83A6B" />
        </View>
      </Pressable>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    hero: {
      alignItems: "center",
      padding: 20,
      borderRadius: 20,
      backgroundColor: "#F7E8F0",
      marginBottom: 18,
      gap: 8,
    },
    heroIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(184,58,107,0.12)",
    },
    title: { fontSize: 24, fontWeight: "800" as const, color: colors.foreground },
    subheading: { fontSize: 13, color: colors.mutedForeground, textAlign: "center", lineHeight: 19 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 14,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    cardIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    cardTitle: { fontSize: 14, fontWeight: "700" as const },
    cardDesc: { fontSize: 12, lineHeight: 18, marginTop: 2 },
    pill: {
      borderWidth: 1.5,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    pillText: { fontSize: 10, fontWeight: "700" as const, textTransform: "uppercase", letterSpacing: 0.4 },
    cta: {
      marginTop: 14,
      backgroundColor: "#FFF0F7",
      borderRadius: 18,
      padding: 18,
      gap: 6,
    },
    ctaTitle: { fontSize: 15, fontWeight: "800" as const, color: "#4A2D5A" },
    ctaSub: { fontSize: 12, color: "#7A5A8A", lineHeight: 18 },
    ctaButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      marginTop: 4,
      backgroundColor: "rgba(255,255,255,0.8)",
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    ctaButtonText: { fontSize: 13, color: "#B83A6B", fontWeight: "700" as const },
  });
}
