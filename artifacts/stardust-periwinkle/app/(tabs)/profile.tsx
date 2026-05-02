import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AgeRange, ChildProfile, useChild } from "@/contexts/ChildContext";
import { useColors } from "@/hooks/useColors";

const AGE_RANGES: AgeRange[] = ["1-2", "3-4", "5-6", "7-8"];

const THEME_OPTIONS = [
  "Animals", "Dinosaurs", "Space", "Princesses", "Superheroes",
  "Cars & Trucks", "Ocean", "Fairies", "Music", "Nature",
  "Building", "Art", "Sports", "Cooking",
];

const STRUGGLE_OPTIONS = [
  "Tantrums", "Sleep resistance", "Separation anxiety", "Hitting/biting",
  "Sibling conflict", "Transitions", "Picky eating", "Sharing",
  "Big emotions", "Morning chaos", "Screen time battles", "Bedtime",
];

type EditForm = {
  name: string;
  ageRange: AgeRange;
  favoriteThemes: string[];
  commonStruggles: string[];
};

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { children, activeChild, addChild, updateChild, removeChild, setActiveChild } = useChild();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EditForm>({
    name: "",
    ageRange: "3-4",
    favoriteThemes: [],
    commonStruggles: [],
  });

  const s = makeStyles(colors);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  function openAdd() {
    setEditingId(null);
    setForm({ name: "", ageRange: "3-4", favoriteThemes: [], commonStruggles: [] });
    setModalVisible(true);
  }

  function openEdit(child: ChildProfile) {
    setEditingId(child.id);
    setForm({
      name: child.name,
      ageRange: child.ageRange,
      favoriteThemes: child.favoriteThemes,
      commonStruggles: child.commonStruggles,
    });
    setModalVisible(true);
  }

  function save() {
    if (!form.name.trim()) return;
    if (editingId) {
      updateChild(editingId, form);
    } else {
      addChild(form);
    }
    setModalVisible(false);
  }

  function confirmRemove(id: string, name: string) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(`Remove ${name}?`, "This will delete this child's profile.", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeChild(id) },
    ]);
  }

  function toggleArrayItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
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
      <Text style={s.heading}>Children</Text>
      <Text style={s.subheading}>Manage up to 3 child profiles</Text>

      {children.map((child) => (
        <View key={child.id} style={[s.childCard, activeChild?.id === child.id && s.childCardActive]}>
          <Pressable style={s.childMain} onPress={() => setActiveChild(child.id)}>
            <View style={[s.avatar, activeChild?.id === child.id && s.avatarActive]}>
              <Text style={[s.avatarText, activeChild?.id === child.id && { color: "#fff" }]}>
                {child.name.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text style={s.childName}>{child.name}</Text>
                {activeChild?.id === child.id && (
                  <View style={s.activeBadge}>
                    <Text style={s.activeBadgeText}>Active</Text>
                  </View>
                )}
              </View>
              <Text style={s.childAge}>Ages {child.ageRange}</Text>
              {child.favoriteThemes.length > 0 && (
                <Text style={s.childThemes} numberOfLines={1}>
                  {child.favoriteThemes.slice(0, 3).join(" · ")}
                </Text>
              )}
            </View>
          </Pressable>
          <View style={s.childActions}>
            <TouchableOpacity onPress={() => openEdit(child)} hitSlop={8}>
              <Feather name="edit-2" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmRemove(child.id, child.name)} hitSlop={8}>
              <Feather name="trash-2" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {children.length < 3 && (
        <TouchableOpacity style={s.addButton} onPress={openAdd} activeOpacity={0.7}>
          <Feather name="plus" size={18} color={colors.primary} />
          <Text style={s.addButtonText}>Add Child Profile</Text>
        </TouchableOpacity>
      )}

      <View style={s.divider} />

      <TouchableOpacity style={s.privacyLink} onPress={() => router.push("/privacy" as any)}>
        <Feather name="shield" size={14} color={colors.accent} />
        <Text style={s.privacyLinkText}>Privacy Notice</Text>
        <Feather name="chevron-right" size={14} color={colors.mutedForeground} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[s.modal, { paddingBottom: insets.bottom + 20 }]}>
          <View style={s.modalHeader}>
            <Text style={s.modalTitle}>{editingId ? "Edit Child" : "Add Child"}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather name="x" size={22} color={colors.foreground} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={s.fieldLabel}>Name or Nickname</Text>
            <TextInput
              style={s.input}
              value={form.name}
              onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="e.g. Mia, Boo, Buddy"
              placeholderTextColor={colors.mutedForeground}
              maxLength={30}
            />

            <Text style={s.fieldLabel}>Age Range</Text>
            <View style={s.chipRow}>
              {AGE_RANGES.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[s.chip, form.ageRange === r && s.chipActive]}
                  onPress={() => setForm((f) => ({ ...f, ageRange: r }))}
                >
                  <Text style={[s.chipText, form.ageRange === r && s.chipTextActive]}>
                    {r} yrs
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.fieldLabel}>Favorite Themes</Text>
            <View style={s.chipRow}>
              {THEME_OPTIONS.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[s.chip, form.favoriteThemes.includes(t) && s.chipActive]}
                  onPress={() =>
                    setForm((f) => ({
                      ...f,
                      favoriteThemes: toggleArrayItem(f.favoriteThemes, t),
                    }))
                  }
                >
                  <Text style={[s.chipText, form.favoriteThemes.includes(t) && s.chipTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.fieldLabel}>Common Struggles</Text>
            <View style={s.chipRow}>
              {STRUGGLE_OPTIONS.map((st) => (
                <TouchableOpacity
                  key={st}
                  style={[s.chip, form.commonStruggles.includes(st) && s.chipActiveRed]}
                  onPress={() =>
                    setForm((f) => ({
                      ...f,
                      commonStruggles: toggleArrayItem(f.commonStruggles, st),
                    }))
                  }
                >
                  <Text
                    style={[
                      s.chipText,
                      form.commonStruggles.includes(st) && s.chipTextActiveRed,
                    ]}
                  >
                    {st}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[s.saveButton, !form.name.trim() && { opacity: 0.5 }]}
              onPress={save}
              disabled={!form.name.trim()}
            >
              <Text style={s.saveButtonText}>{editingId ? "Save Changes" : "Add Child"}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    heading: { fontSize: 24, fontWeight: "800" as const, color: colors.foreground, marginBottom: 4 },
    subheading: { fontSize: 13, color: colors.mutedForeground, marginBottom: 20 },
    childCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    childCardActive: {
      borderWidth: 2,
      borderColor: colors.primary + "40",
    },
    childMain: { flex: 1, flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarActive: { backgroundColor: colors.primary },
    avatarText: {
      fontSize: 18,
      fontWeight: "700" as const,
      color: colors.primary,
    },
    childName: { fontSize: 15, fontWeight: "700" as const, color: colors.foreground },
    childAge: { fontSize: 12, color: colors.mutedForeground, marginTop: 2 },
    childThemes: { fontSize: 11, color: colors.accent, marginTop: 2 },
    activeBadge: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    activeBadgeText: { fontSize: 9, color: "#fff", fontWeight: "700" as const, textTransform: "uppercase" },
    childActions: { flexDirection: "row", gap: 16, paddingRight: 14 },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 2,
      borderColor: colors.primary + "40",
      borderStyle: "dashed",
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
    },
    addButtonText: { fontSize: 14, fontWeight: "600" as const, color: colors.primary },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
    privacyLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 14,
      backgroundColor: colors.card,
      borderRadius: 12,
    },
    privacyLinkText: { flex: 1, fontSize: 14, color: colors.accent, fontWeight: "600" as const },
    modal: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      paddingTop: 24,
    },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
    modalTitle: { fontSize: 20, fontWeight: "800" as const, color: colors.foreground },
    fieldLabel: { fontSize: 12, fontWeight: "700" as const, color: colors.mutedForeground, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8, marginTop: 16 },
    input: {
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 12,
      fontSize: 15,
      color: colors.foreground,
      backgroundColor: colors.card,
    },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: colors.muted,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    chipActive: { backgroundColor: colors.secondary, borderColor: colors.primary },
    chipActiveRed: { backgroundColor: "#FFF0F3", borderColor: "#F48FB1" },
    chipText: { fontSize: 13, color: colors.mutedForeground, fontWeight: "500" as const },
    chipTextActive: { color: colors.primary, fontWeight: "600" as const },
    chipTextActiveRed: { color: "#C2185B", fontWeight: "600" as const },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      alignItems: "center",
      marginTop: 24,
      marginBottom: 8,
    },
    saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" as const },
  });
}
