import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { BreathResult, getBreathResult } from "@/utils/content";

export default function BreatheScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [result, setResult] = useState<BreathResult>(getBreathResult());
  const [phase, setPhase] = useState<"in" | "out">("in");
  const circleScale = useRef(new Animated.Value(1)).current;

  const s = makeStyles(colors);

  useEffect(() => {
    animatBreath();
  }, []);

  function animatBreath() {
    Animated.sequence([
      Animated.timing(circleScale, {
        toValue: 1.25,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(circleScale, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) animatBreath();
    });
  }

  function refresh() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setResult(getBreathResult());
  }

  return (
    <View style={[s.container, { paddingTop: 16, paddingBottom: insets.bottom + 40 }]}>
      <View style={s.breatheSection}>
        <Animated.View style={[s.outerCircle, { transform: [{ scale: circleScale }] }]}>
          <View style={s.innerCircle}>
            <Feather name="wind" size={28} color={colors.primary} />
            <Text style={s.breatheLabel}>
              {phase === "in" ? "Breathe in" : "Breathe out"}
            </Text>
          </View>
        </Animated.View>
        <Text style={s.breatheHint}>Follow the circle. Breathe with it.</Text>
      </View>

      <View style={s.cardsSection}>
        <ResultCard
          icon="check-circle"
          label="You Are Seen"
          content={result.validation}
          color={colors.primary}
          colors={colors}
        />
        <ResultCard
          icon="anchor"
          label="Ground Yourself"
          content={result.groundingAction}
          color={colors.accent}
          colors={colors}
        />
        <ResultCard
          icon="star"
          label="Try This With Your Child"
          content={result.childActivity}
          color="#F5A623"
          colors={colors}
        />
      </View>

      <TouchableOpacity style={s.refreshButton} onPress={refresh} activeOpacity={0.7}>
        <Feather name="refresh-cw" size={14} color={colors.mutedForeground} />
        <Text style={s.refreshText}>Try Another</Text>
      </TouchableOpacity>
    </View>
  );
}

function ResultCard({
  icon,
  label,
  content,
  color,
  colors,
}: {
  icon: string;
  label: string;
  content: string;
  color: string;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={[rc.card, { backgroundColor: colors.card }]}>
      <View style={[rc.iconWrap, { backgroundColor: color + "18" }]}>
        <Feather name={icon as any} size={16} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[rc.label, { color }]}>{label}</Text>
        <Text style={[rc.content, { color: colors.foreground }]}>{content}</Text>
      </View>
    </View>
  );
}

const rc = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
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
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    breatheSection: {
      alignItems: "center",
      marginBottom: 28,
      paddingVertical: 12,
    },
    outerCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.primary + "15",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    innerCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    breatheLabel: {
      fontSize: 11,
      color: colors.primary,
      fontWeight: "600" as const,
    },
    breatheHint: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
    },
    cardsSection: { flex: 1 },
    refreshButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: 14,
      marginTop: 4,
    },
    refreshText: { fontSize: 13, color: colors.mutedForeground },
  });
}
