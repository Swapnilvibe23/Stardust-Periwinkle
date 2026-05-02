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
import { useChild } from "@/contexts/ChildContext";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { children, activeChild } = useChild();
  const s = makeStyles(colors);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  function nav(route: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
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

      <LinearGradient
        colors={["#F7E8F0", "#EDE0F5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.ctaBanner}
      >
        <Text style={s.ctaTitle}>Want a full month of ready-to-use routines, activities, and meal plans?</Text>
        <Pressable
          style={s.ctaButton}
          onPress={() => WebBrowser.openBrowserAsync("https://stardustandperiwinkle.com")}
        >
          <Text style={s.ctaButtonText}>Learn More</Text>
          <Feather name="external-link" size={14} color={colors.primary} />
        </Pressable>
      </LinearGradient>
    </ScrollView>
  );
}

function PrimaryButton({
  label,
  icon,
  description,
  color,
  onPress,
}: {
  label: string;
  icon: string;
  description: string;
  color: string;
  onPress: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        pbs.card,
        { backgroundColor: colors.card, opacity: pressed ? 0.85 : 1 },
      ]}
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
  label,
  icon,
  onPress,
  colors,
}: {
  label: string;
  icon: string;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 14,
    marginBottom: 10,
    shadowColor: "#B83A6B",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  desc: {
    fontSize: 12,
    marginTop: 2,
  },
});

const sbs = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    minHeight: 90,
  },
  label: {
    fontSize: 13,
    fontWeight: "600" as const,
    textAlign: "center",
  },
});

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 28,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: "800" as const,
      color: colors.foreground,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 13,
      color: colors.mutedForeground,
      textAlign: "center",
      marginTop: 4,
      marginBottom: 12,
    },
    selectorRow: {
      marginTop: 4,
    },
    addChildPrompt: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.secondary,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
    },
    addChildText: {
      fontSize: 13,
      color: colors.primary,
      fontWeight: "600" as const,
    },
    section: {
      marginBottom: 20,
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: "700" as const,
      color: colors.mutedForeground,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 10,
    },
    secondaryRow: {
      flexDirection: "row",
      gap: 10,
    },
    ctaBanner: {
      borderRadius: 20,
      padding: 20,
      gap: 12,
    },
    ctaTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: "#4A2D5A",
      lineHeight: 20,
    },
    ctaButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
    },
    ctaButtonText: {
      fontSize: 13,
      fontWeight: "700" as const,
      color: "#B83A6B",
    },
  });
}
