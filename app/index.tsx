import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '@/features/auth/authStore';
import { BearAvatar } from '@/components/BearAvatar';
import { HoneyButton } from '@/components/HoneyButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radii } from '@/theme/spacing';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <BearAvatar
          config={
            profile?.avatar_config || {
              fur: 'chestnut',
              expression: 'happy',
              accessory: 'none',
            }
          }
          size={150}
        />
        <Text style={styles.welcomeText}>
          Hello, {profile?.display_name || 'Sweet Bear'}! 🍯
        </Text>
        <Text style={styles.infoText}>
          Your profile & authentication are successfully established.
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Fur: {profile?.avatar_config?.fur || 'chestnut'} • Accessory:{' '}
            {profile?.avatar_config?.accessory || 'none'}
          </Text>
        </View>

        <HoneyButton
          title="Customize Bear Again"
          variant="outline"
          onPress={() => router.push('/(auth)/onboarding')}
          style={styles.editButton}
        />

        <HoneyButton
          title="Sign Out"
          variant="ghost"
          onPress={signOut}
          style={styles.signOutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0E4D2',
    shadowColor: colors.cocoa,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  welcomeText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.title1,
    color: colors.cocoa,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  infoText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.body,
    color: colors.cocoaLight,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#FAF5ED',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: '#E6D7C3',
  },
  badgeText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.sizes.micro,
    color: colors.cocoa,
    textTransform: 'capitalize',
  },
  editButton: {
    width: '100%',
    marginTop: spacing.sm,
  },
  signOutButton: {
    width: '100%',
    marginTop: spacing.xs,
  },
});
