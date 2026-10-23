import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { useAuthStore } from '@/features/auth/authStore';
import { colors } from '@/theme/colors';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const { isInitialized, session, profile, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Route protection & state-based navigation
  useEffect(() => {
    if (!fontsLoaded || !isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session) {
      // Unauthenticated -> direct to sign-in
      if (!inAuthGroup) {
        router.replace('/(auth)/sign-in');
      }
    } else if (!profile?.display_name) {
      // Authenticated but onboarding incomplete -> direct to onboarding
      const isOnboarding = segments.length > 1 && (segments as string[])[1] === 'onboarding';
      if (!isOnboarding) {
        router.replace('/(auth)/onboarding');
      }
    } else {
      // Authenticated & completed onboarding -> go to home
      if (inAuthGroup) {
        router.replace('/');
      }
    }
  }, [fontsLoaded, isInitialized, session, profile, segments, router]);

  if (!fontsLoaded || !isInitialized) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={colors.honey} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.cream },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
