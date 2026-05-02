import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MOOD_CONFIGS, Mood, useMoodCheckIn } from "@/hooks/useMoodCheckIn";
import { useColors } from "@/hooks/useColors";

const MOODS: Mood[] = ["calm", "stressed", "exhausted"];

type Phase = "question" | "transitioning" | "acked";

export function MoodCheckIn() {
  const colors = useColors();
  const { todaysMood, loaded, saveMood } = useMoodCheckIn();

  // Local mood so we can show the ack immediately during animation
  const [localMood, setLocalMood] = useState<Mood | null>(null);
  const [phase, setPhase] = useState<Phase>("question");

  const questionOpacity = useRef(new Animated.Value(1)).current;
  const ackOpacity = useRef(new Animated.Value(0)).current;
  const ackTranslateY = useRef(new Animated.Value(10)).current;

  // If already checked in today, skip straight to acked
  useEffect(() => {
    if (loaded && todaysMood) {
      setLocalMood(todaysMood);
      setPhase("acked");
      ackOpacity.setValue(1);
      ackTranslateY.setValue(0);
    }
  }, [loaded, todaysMood]);

  if (!loaded) return null;

  async function handleSelect(mood: Mood) {
    if (phase !== "question") return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setLocalMood(mood);
    setPhase("transitioning");
    await saveMood(mood);

    Animated.timing(questionOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setPhase("acked");
      Animated.parallel([
        Animated.timing(ackOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(ackTranslateY, { toValue: 0, friction: 7, tension: 80, useNativeDriver: true }),
      ]).start();
    });
  }

  const cfg = localMood ? MOOD_CONFIGS[localMood] : null;

  return (
    <View style={s.wrapper}>
      {/* Question card — fades out on selection */}
      {phase !== "acked" && (
        <Animated.View
          style={[
            s.questionCard,
            { backgroundColor: colors.card, opacity: questionOpacity },
          ]}
        >
          <Text style={[s.question, { color: colors.foreground }]}>
            How are you feeling right now?
          </Text>
          <Text style={[s.hint, { color: colors.mutedForeground }]}>
            Tap to get a personalised suggestion
          </Text>
          <View style={s.optionRow}>
            {MOODS.map((mood) => {
              const c = MOOD_CONFIGS[mood];
              return (
                <TouchableOpacity
                  key={mood}
                  style={[
                    s.option,
                    {
                      borderColor: c.color + "40",
                      backgroundColor: c.color + "0E",
                    },
                  ]}
                  onPress={() => handleSelect(mood)}
                  activeOpacity={0.72}
                  disabled={phase !== "question"}
                >
                  <Text style={s.emoji}>{c.emoji}</Text>
                  <Text style={[s.optionLabel, { color: c.color }]}>{c.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      )}

      {/* Acknowledgement card — fades in after selection */}
      {phase === "acked" && cfg && (
        <Animated.View
          style={[
            s.ackCard,
            {
              borderColor: cfg.color + "30",
              backgroundColor: cfg.color + "0D",
              opacity: ackOpacity,
              transform: [{ translateY: ackTranslateY }],
            },
          ]}
        >
          <View style={s.ackTop}>
            <Text style={s.ackEmoji}>{cfg.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[s.ackTitle, { color: cfg.color }]}>{cfg.ack}</Text>
              <Text style={[s.ackSub, { color: "#7A6A8A" }]}>{cfg.sub}</Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              s.ackButton,
              { backgroundColor: cfg.color, opacity: pressed ? 0.84 : 1 },
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push(cfg.route as any);
            }}
          >
            <Feather name={cfg.icon as any} size={14} color="#fff" />
            <Text style={s.ackButtonText}>{cfg.cta}</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { marginBottom: 14 },

  // Question
  questionCard: {
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  question: {
    fontSize: 15,
    fontWeight: "700" as const,
    textAlign: "center",
  },
  hint: {
    fontSize: 12,
    textAlign: "center",
    marginTop: -4,
    marginBottom: 2,
  },
  optionRow: { flexDirection: "row", gap: 10 },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 6,
  },
  emoji: { fontSize: 24 },
  optionLabel: { fontSize: 12, fontWeight: "700" as const },

  // Ack
  ackCard: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  ackTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  ackEmoji: { fontSize: 28, lineHeight: 34 },
  ackTitle: { fontSize: 15, fontWeight: "800" as const, lineHeight: 20 },
  ackSub: { fontSize: 13, lineHeight: 18, marginTop: 3 },
  ackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
  },
  ackButtonText: { color: "#fff", fontSize: 14, fontWeight: "700" as const },
});
