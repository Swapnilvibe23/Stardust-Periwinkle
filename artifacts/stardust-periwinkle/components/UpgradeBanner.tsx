import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SYSTEME_IO_URL, UPGRADE_HEADLINE, UPGRADE_SUBTEXT } from "@/constants/monetization";

interface Props {
  variant?: "soft" | "limit";
  onDismiss?: () => void;
}

export function UpgradeBanner({ variant = "soft", onDismiss }: Props) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  function handleLearnMore() {
    WebBrowser.openBrowserAsync(SYSTEME_IO_URL);
  }

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  return (
    <LinearGradient
      colors={["#F7E8F0", "#EDE0F5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.container}
    >
      <View style={s.topRow}>
        {variant === "limit" && (
          <View style={s.limitBadge}>
            <Feather name="zap" size={10} color="#B83A6B" />
            <Text style={s.limitBadgeText}>Daily limit reached</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleDismiss} style={s.dismissBtn} hitSlop={12}>
          <Feather name="x" size={14} color="#9B7BAF" />
        </TouchableOpacity>
      </View>

      <Text style={s.headline}>{UPGRADE_HEADLINE}</Text>
      <Text style={s.subtext}>{UPGRADE_SUBTEXT}</Text>

      <Pressable
        style={({ pressed }) => [s.cta, { opacity: pressed ? 0.8 : 1 }]}
        onPress={handleLearnMore}
      >
        <Text style={s.ctaText}>Learn More</Text>
        <Feather name="external-link" size={13} color="#B83A6B" />
      </Pressable>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  limitBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(184,58,107,0.1)",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  limitBadgeText: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "#B83A6B",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  dismissBtn: {
    marginLeft: "auto",
  },
  headline: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#4A2D5A",
    lineHeight: 20,
  },
  subtext: {
    fontSize: 12,
    color: "#6B4A7E",
    lineHeight: 18,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.75)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: "700" as const,
    color: "#B83A6B",
  },
});
