import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ChildProvider } from "@/contexts/ChildContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { requestAndScheduleNotifications } from "@/hooks/useNotifications";
import { SubscriptionProvider, initializeRevenueCat } from "@/lib/revenuecat";

SplashScreen.preventAutoHideAsync();

// Initialize RevenueCat at module level — safe to call before render
try {
  initializeRevenueCat();
} catch (err: any) {
  // Keys not yet configured — Shop screen will show "Coming Soon" states
  if (__DEV__) {
    console.warn("[RevenueCat] Not configured:", err?.message);
  }
}

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back", headerTintColor: "#B83A6B", headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="calm" options={{ title: "Calm This Moment", headerStyle: { backgroundColor: "#FFF8F5" } }} />
      <Stack.Screen name="whatnow" options={{ title: "What Now?", headerStyle: { backgroundColor: "#FFF8F5" } }} />
      <Stack.Screen name="story" options={{ title: "Last Story Tonight", headerStyle: { backgroundColor: "#1A0D1F" }, headerTintColor: "#C9A0DC" }} />
      <Stack.Screen name="routine" options={{ title: "Let's Get Through This", headerStyle: { backgroundColor: "#FFF8F5" } }} />
      <Stack.Screen name="breathe" options={{ title: "Take a Breath", headerStyle: { backgroundColor: "#FFF8F5" } }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy Notice", headerStyle: { backgroundColor: "#FFF8F5" } }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      requestAndScheduleNotifications();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SubscriptionProvider>
            <ChildProvider>
              <FavoritesProvider>
                <GestureHandlerRootView>
                  <KeyboardProvider>
                    <RootLayoutNav />
                  </KeyboardProvider>
                </GestureHandlerRootView>
              </FavoritesProvider>
            </ChildProvider>
          </SubscriptionProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
