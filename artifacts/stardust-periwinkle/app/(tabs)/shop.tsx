import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

import { useColors } from "@/hooks/useColors";
import { useSubscription } from "@/lib/revenuecat";

// ─── Placeholder product metadata ────────────────────────────────────────────
// These are display-only until RevenueCat is connected.
// Replace `rcIdentifier` values with the real package identifiers from your
// RevenueCat offering once the seed script has been run.
const PLACEHOLDER_PRODUCTS = [
  {
    id: "product_1",
    rcIdentifier: "product_1_monthly",
    title: "Digital Product 1",
    subtitle: "Coming soon — your first product",
    description:
      "This is a placeholder for your first digital product. Update the title, description, and price once your RevenueCat products are configured.",
    icon: "book-open",
    color: "#B83A6B",
    badge: "Popular",
  },
  {
    id: "product_2",
    rcIdentifier: "product_2_monthly",
    title: "Digital Product 2",
    subtitle: "Coming soon — your second product",
    description:
      "Placeholder for your second digital product. Perfect for a printable pack, guide, or activity bundle.",
    icon: "package",
    color: "#7B8ECC",
    badge: null,
  },
  {
    id: "product_3",
    rcIdentifier: "product_3_monthly",
    title: "Digital Product 3",
    subtitle: "Coming soon — your third product",
    description:
      "Placeholder for your third digital product. Could be a monthly subscription, ebook, or resource kit.",
    icon: "file-text",
    color: "#6B5B95",
    badge: "New",
  },
  {
    id: "product_4",
    rcIdentifier: "product_4_monthly",
    title: "Digital Product 4",
    subtitle: "Coming soon — your fourth product",
    description:
      "Placeholder for your fourth digital product — perhaps a sleep guide, routine planner, or printable set.",
    icon: "moon",
    color: "#4CAF50",
    badge: null,
  },
  {
    id: "product_5",
    rcIdentifier: "product_5_monthly",
    title: "Digital Product 5",
    subtitle: "Coming soon — your fifth product",
    description:
      "Placeholder for your fifth digital product. A great spot for a bundle or premium toolkit.",
    icon: "star",
    color: "#F5A623",
    badge: null,
  },
];

type PlaceholderProduct = (typeof PLACEHOLDER_PRODUCTS)[0];

export default function ShopScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { offerings, isLoading, purchase, isPurchasing, restore, isRestoring } = useSubscription();

  const [selectedProduct, setSelectedProduct] = useState<PlaceholderProduct | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultType, setResultType] = useState<"success" | "error" | null>(null);

  const s = makeStyles(colors);
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  // Match placeholder to a real RC package by rcIdentifier
  function getRcPackage(product: PlaceholderProduct) {
    const allPackages = offerings?.current?.availablePackages ?? [];
    return allPackages.find((pkg) => pkg.identifier === product.rcIdentifier) ?? null;
  }

  function openConfirm(product: PlaceholderProduct) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedProduct(product);
    setResultMessage(null);
    setResultType(null);
    setConfirmVisible(true);
  }

  async function handlePurchase() {
    if (!selectedProduct) return;
    const pkg = getRcPackage(selectedProduct);

    if (!pkg) {
      setResultMessage("This product is not yet available for purchase. Check back soon!");
      setResultType("error");
      return;
    }

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await purchase(pkg);
      setResultMessage("Purchase successful! Thank you for your support.");
      setResultType("success");
    } catch (err: any) {
      if (err?.userCancelled) {
        setConfirmVisible(false);
        return;
      }
      setResultMessage(err?.message ?? "Something went wrong. Please try again.");
      setResultType("error");
    }
  }

  async function handleRestore() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await restore();
      setResultMessage("Purchases restored successfully.");
      setResultType("success");
    } catch {
      setResultMessage("Could not restore purchases. Please try again.");
      setResultType("error");
    }
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
      {/* Header */}
      <LinearGradient
        colors={["#F7E8F0", "#EDE0F5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.heroCard}
      >
        <View style={s.heroIcon}>
          <Feather name="shopping-bag" size={22} color="#B83A6B" />
        </View>
        <Text style={s.heroTitle}>Resources & Products</Text>
        <Text style={s.heroSub}>
          Digital tools, printables, and guides created for real parenting moments.
        </Text>
      </LinearGradient>

      {isLoading && (
        <View style={s.loadingRow}>
          <ActivityIndicator color={colors.primary} />
          <Text style={[s.loadingText, { color: colors.mutedForeground }]}>
            Loading products…
          </Text>
        </View>
      )}

      {/* Product cards */}
      {PLACEHOLDER_PRODUCTS.map((product) => {
        const pkg = getRcPackage(product);
        const priceStr = pkg?.product.priceString ?? null;

        return (
          <View key={product.id} style={[s.card, { backgroundColor: colors.card }]}>
            {product.badge && (
              <View style={[s.badge, { backgroundColor: product.color }]}>
                <Text style={s.badgeText}>{product.badge}</Text>
              </View>
            )}

            <View style={s.cardTop}>
              <View style={[s.cardIcon, { backgroundColor: product.color + "18" }]}>
                <Feather name={product.icon as any} size={22} color={product.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.cardTitle, { color: colors.foreground }]}>{product.title}</Text>
                <Text style={[s.cardSubtitle, { color: colors.mutedForeground }]}>
                  {product.subtitle}
                </Text>
              </View>
              {priceStr ? (
                <Text style={[s.price, { color: product.color }]}>{priceStr}</Text>
              ) : (
                <View style={[s.comingSoonPill, { borderColor: product.color + "40" }]}>
                  <Text style={[s.comingSoonText, { color: product.color }]}>Soon</Text>
                </View>
              )}
            </View>

            <Text style={[s.cardDesc, { color: colors.mutedForeground }]}>
              {product.description}
            </Text>

            <Pressable
              style={({ pressed }) => [
                s.buyButton,
                {
                  backgroundColor: priceStr ? product.color : colors.muted,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
              onPress={() => openConfirm(product)}
            >
              <Feather
                name={priceStr ? "shopping-cart" : "bell"}
                size={14}
                color={priceStr ? "#fff" : colors.mutedForeground}
              />
              <Text
                style={[
                  s.buyButtonText,
                  { color: priceStr ? "#fff" : colors.mutedForeground },
                ]}
              >
                {priceStr ? `Buy — ${priceStr}` : "Coming Soon"}
              </Text>
            </Pressable>
          </View>
        );
      })}

      {/* Restore purchases */}
      <TouchableOpacity
        style={s.restoreRow}
        onPress={handleRestore}
        disabled={isRestoring}
      >
        {isRestoring ? (
          <ActivityIndicator size="small" color={colors.mutedForeground} />
        ) : (
          <Feather name="refresh-cw" size={13} color={colors.mutedForeground} />
        )}
        <Text style={[s.restoreText, { color: colors.mutedForeground }]}>
          Restore previous purchases
        </Text>
      </TouchableOpacity>

      <Text style={[s.disclaimer, { color: colors.mutedForeground }]}>
        Purchases are managed securely via the App Store or Google Play. All sales are final unless
        otherwise noted.
      </Text>

      {/* Purchase confirmation modal */}
      <Modal
        visible={confirmVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={[s.modal, { paddingBottom: insets.bottom + 24 }]}>
          <View style={s.modalHandle} />

          <TouchableOpacity style={s.modalClose} onPress={() => setConfirmVisible(false)}>
            <Feather name="x" size={20} color={colors.mutedForeground} />
          </TouchableOpacity>

          {selectedProduct && (
            <>
              <View style={[s.modalIcon, { backgroundColor: selectedProduct.color + "18" }]}>
                <Feather name={selectedProduct.icon as any} size={28} color={selectedProduct.color} />
              </View>
              <Text style={[s.modalTitle, { color: colors.foreground }]}>
                {selectedProduct.title}
              </Text>
              <Text style={[s.modalDesc, { color: colors.mutedForeground }]}>
                {selectedProduct.description}
              </Text>

              {resultMessage ? (
                <View
                  style={[
                    s.resultBanner,
                    {
                      backgroundColor:
                        resultType === "success" ? "#E8F5E9" : "#FFF0F4",
                    },
                  ]}
                >
                  <Feather
                    name={resultType === "success" ? "check-circle" : "alert-circle"}
                    size={16}
                    color={resultType === "success" ? "#4CAF50" : "#B83A6B"}
                  />
                  <Text
                    style={[
                      s.resultText,
                      { color: resultType === "success" ? "#2E7D32" : "#B83A6B" },
                    ]}
                  >
                    {resultMessage}
                  </Text>
                </View>
              ) : (
                <Pressable
                  style={({ pressed }) => [
                    s.confirmButton,
                    {
                      backgroundColor: selectedProduct.color,
                      opacity: isPurchasing || pressed ? 0.8 : 1,
                    },
                  ]}
                  onPress={handlePurchase}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Feather name="shopping-cart" size={16} color="#fff" />
                      <Text style={s.confirmButtonText}>
                        {getRcPackage(selectedProduct)
                          ? `Buy — ${getRcPackage(selectedProduct)!.product.priceString}`
                          : "Not yet available"}
                      </Text>
                    </>
                  )}
                </Pressable>
              )}

              <Text style={[s.modalDisclaimer, { color: colors.mutedForeground }]}>
                Payment is processed securely by Apple or Google. You'll be charged only after
                confirming in the store dialog.
              </Text>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { paddingHorizontal: 20 },
    heroCard: { borderRadius: 20, padding: 20, marginBottom: 20, gap: 8, alignItems: "center" },
    heroIcon: {
      width: 48, height: 48, borderRadius: 14,
      backgroundColor: "rgba(184,58,107,0.12)",
      alignItems: "center", justifyContent: "center", marginBottom: 4,
    },
    heroTitle: { fontSize: 20, fontWeight: "800" as const, color: "#4A2D5A", textAlign: "center" },
    heroSub: { fontSize: 13, color: "#7A5A8A", textAlign: "center", lineHeight: 19 },
    loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16, justifyContent: "center" },
    loadingText: { fontSize: 13 },
    card: {
      borderRadius: 20, padding: 18, marginBottom: 14,
      shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 }, elevation: 2, gap: 10,
    },
    badge: {
      alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3,
      borderRadius: 20, marginBottom: 2,
    },
    badgeText: { fontSize: 10, fontWeight: "700" as const, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5 },
    cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    cardIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    cardTitle: { fontSize: 15, fontWeight: "800" as const, lineHeight: 20 },
    cardSubtitle: { fontSize: 12, marginTop: 2, lineHeight: 17 },
    price: { fontSize: 16, fontWeight: "800" as const, flexShrink: 0 },
    comingSoonPill: {
      borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    },
    comingSoonText: { fontSize: 11, fontWeight: "700" as const },
    cardDesc: { fontSize: 13, lineHeight: 19 },
    buyButton: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 8, borderRadius: 12, paddingVertical: 12,
    },
    buyButtonText: { fontSize: 14, fontWeight: "700" as const },
    restoreRow: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 6, paddingVertical: 14,
    },
    restoreText: { fontSize: 13, fontWeight: "500" as const },
    disclaimer: { fontSize: 11, textAlign: "center", lineHeight: 16, paddingBottom: 8 },
    modal: {
      flex: 1, backgroundColor: colors.background,
      padding: 24, paddingTop: 16, alignItems: "center",
    },
    modalHandle: {
      width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: 20,
    },
    modalClose: { position: "absolute", top: 16, right: 20 },
    modalIcon: {
      width: 72, height: 72, borderRadius: 20,
      alignItems: "center", justifyContent: "center", marginBottom: 16,
    },
    modalTitle: { fontSize: 20, fontWeight: "800" as const, textAlign: "center", marginBottom: 8 },
    modalDesc: { fontSize: 14, lineHeight: 21, textAlign: "center", marginBottom: 20 },
    resultBanner: {
      flexDirection: "row", alignItems: "flex-start", gap: 10,
      borderRadius: 12, padding: 14, width: "100%", marginBottom: 12,
    },
    resultText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: "500" as const },
    confirmButton: {
      flexDirection: "row", alignItems: "center", justifyContent: "center",
      gap: 10, borderRadius: 14, paddingVertical: 16,
      width: "100%", marginBottom: 12,
    },
    confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" as const },
    modalDisclaimer: { fontSize: 11, textAlign: "center", lineHeight: 16, paddingHorizontal: 16 },
  });
}
