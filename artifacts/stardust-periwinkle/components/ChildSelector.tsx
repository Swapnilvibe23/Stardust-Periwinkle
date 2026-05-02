import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useChild } from "@/contexts/ChildContext";
import { useColors } from "@/hooks/useColors";

export default function ChildSelector() {
  const { children, activeChild, setActiveChild, addChild } = useChild();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const s = makeStyles(colors);

  if (children.length === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={s.selector}
        onPress={() => children.length > 1 && setOpen(true)}
        activeOpacity={0.7}
      >
        <View style={s.avatarDot} />
        <Text style={s.selectorText} numberOfLines={1}>
          {activeChild?.name || "Select child"}
        </Text>
        <Text style={s.selectorAge}>
          {activeChild ? `Ages ${activeChild.ageRange}` : ""}
        </Text>
        {children.length > 1 && (
          <Feather name="chevron-down" size={14} color={colors.primary} />
        )}
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={s.overlay} onPress={() => setOpen(false)}>
          <View style={[s.sheet, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={s.sheetTitle}>Switch Child</Text>
            <ScrollView>
              {children.map((child) => (
                <TouchableOpacity
                  key={child.id}
                  style={[s.childRow, activeChild?.id === child.id && s.childRowActive]}
                  onPress={() => {
                    setActiveChild(child.id);
                    setOpen(false);
                  }}
                >
                  <View style={[s.avatarDotLarge, activeChild?.id === child.id && s.avatarDotActive]} />
                  <View style={{ flex: 1 }}>
                    <Text style={[s.childName, activeChild?.id === child.id && s.childNameActive]}>
                      {child.name}
                    </Text>
                    <Text style={s.childAge}>Ages {child.ageRange}</Text>
                  </View>
                  {activeChild?.id === child.id && (
                    <Feather name="check" size={16} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    selector: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondary,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 24,
      gap: 6,
      alignSelf: "flex-start",
    },
    avatarDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    selectorText: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.foreground,
    },
    selectorAge: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
    },
    sheetTitle: {
      fontSize: 16,
      fontWeight: "700" as const,
      color: colors.foreground,
      marginBottom: 16,
    },
    childRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 12,
      marginBottom: 8,
      gap: 12,
      backgroundColor: colors.muted,
    },
    childRowActive: {
      backgroundColor: colors.secondary,
    },
    avatarDotLarge: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.border,
    },
    avatarDotActive: {
      backgroundColor: colors.primary,
    },
    childName: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: colors.foreground,
    },
    childNameActive: {
      color: colors.primary,
    },
    childAge: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 2,
    },
  });
}
