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
import { useColors } from "@/hooks/useColors";
import { STORY_ENERGIES, STORY_THEMES, StoryResult, getStory } from "@/utils/content";

export default function StoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { activeChild } = useChild();
  const { addFavorite, isFavorited } = useFavorites();

  const [theme, setTheme] = useState<string>(STORY_THEMES[0]);
  const [energy, setEnergy] = useState<string>("Tired");
  const [story, setStory] = useState<StoryResult | null>(null);

  const isDark = true;
  const bg = "#1A0D1F";
  const textColor = "#E8D5F5";
  const accentColor = "#C9A0DC";
  const mutedColor = "#9B7BAF";

  function generate() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStory(getStory(theme, energy, activeChild?.name || "Little One"));
  }

  function save() {
    if (!story) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addFavorite({
      type: "story",
      title: story.title,
      childName: activeChild?.name,
      content: { story: story.body },
    });
  }

  const alreadySaved = story ? isFavorited(story.title) : false;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={[s.container, { paddingTop: 16, paddingBottom: insets.bottom + 40 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.moonHeader}>
        <Feather name="moon" size={28} color={accentColor} />
        <Text style={[s.heading, { color: textColor }]}>Last Story Tonight</Text>
        <Text style={[s.subheading, { color: mutedColor }]}>
          {activeChild ? `For ${activeChild.name}` : "A calm bedtime story"}
        </Text>
      </View>

      <Text style={[s.sectionLabel, { color: mutedColor }]}>Story Theme</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
        <View style={s.hRow}>
          {STORY_THEMES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[s.themeChip, theme === t && { backgroundColor: accentColor + "30", borderColor: accentColor }]}
              onPress={() => { setTheme(t); setStory(null); }}
            >
              <Text style={[s.themeText, { color: mutedColor }, theme === t && { color: accentColor }]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={[s.sectionLabel, { color: mutedColor }]}>Energy Level Right Now</Text>
      <View style={s.energyRow}>
        {STORY_ENERGIES.map((e) => (
          <TouchableOpacity
            key={e}
            style={[s.energyChip, energy === e && { backgroundColor: accentColor + "30", borderColor: accentColor }]}
            onPress={() => { setEnergy(e); setStory(null); }}
          >
            <Text style={[s.energyText, { color: mutedColor }, energy === e && { color: accentColor }]}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[s.generateButton, { backgroundColor: accentColor }]} onPress={generate} activeOpacity={0.8}>
        <Feather name="book-open" size={16} color="#1A0D1F" />
        <Text style={[s.generateText, { color: "#1A0D1F" }]}>Tell Me the Story</Text>
      </TouchableOpacity>

      {story && (
        <View style={[s.storyCard, { backgroundColor: "#230F2E" }]}>
          <Text style={[s.storyTitle, { color: accentColor }]}>{story.title}</Text>
          <Text style={[s.storyBody, { color: textColor }]}>{story.body}</Text>

          <View style={[s.sleepCue, { borderTopColor: accentColor + "30" }]}>
            <Feather name="moon" size={14} color={accentColor} />
            <Text style={[s.sleepCueText, { color: mutedColor }]}>
              Read slowly. Pause at each line. Let silence do the work.
            </Text>
          </View>

          <Pressable
            style={[s.saveButton, { borderColor: alreadySaved ? "#444" : accentColor }]}
            onPress={save}
            disabled={alreadySaved}
          >
            <Feather name={alreadySaved ? "check" : "heart"} size={14} color={alreadySaved ? "#666" : accentColor} />
            <Text style={[s.saveText, { color: alreadySaved ? "#666" : accentColor }]}>
              {alreadySaved ? "Saved" : "Save Story"}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  moonHeader: { alignItems: "center", marginBottom: 28, gap: 8 },
  heading: { fontSize: 22, fontWeight: "800" as const, textAlign: "center" },
  subheading: { fontSize: 13, textAlign: "center" },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 16,
  },
  hScroll: { marginBottom: 4 },
  hRow: { flexDirection: "row", gap: 8, paddingRight: 20 },
  themeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#3D2550",
    backgroundColor: "transparent",
  },
  themeText: { fontSize: 13, fontWeight: "500" as const },
  energyRow: { flexDirection: "row", gap: 10 },
  energyChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#3D2550",
    alignItems: "center",
  },
  energyText: { fontSize: 14, fontWeight: "500" as const },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
  },
  generateText: { fontSize: 16, fontWeight: "700" as const },
  storyCard: { marginTop: 24, borderRadius: 20, padding: 20 },
  storyTitle: { fontSize: 18, fontWeight: "800" as const, marginBottom: 16, textAlign: "center" },
  storyBody: { fontSize: 15, lineHeight: 26, letterSpacing: 0.2 },
  sleepCue: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  sleepCueText: { fontSize: 12, lineHeight: 18, flex: 1, fontStyle: "italic" },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  saveText: { fontSize: 13, fontWeight: "600" as const },
});
