import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BearAvatar } from '@/components/BearAvatar';
import { HoneyInput } from '@/components/HoneyInput';
import { HoneyButton } from '@/components/HoneyButton';
import { useAuthStore } from '@/features/auth/authStore';
import { FurTint, BearAccessory, BearExpression } from '@/features/auth/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radii } from '@/theme/spacing';

const FUR_OPTIONS: { id: FurTint; label: string; color: string }[] = [
  { id: 'chestnut', label: 'Chestnut', color: colors.fur.chestnut },
  { id: 'caramel', label: 'Caramel', color: colors.fur.caramel },
  { id: 'polar', label: 'Polar', color: colors.fur.polar },
  { id: 'espresso', label: 'Espresso', color: colors.fur.espresso },
];

const ACCESSORY_OPTIONS: { id: BearAccessory; label: string; icon: string }[] = [
  { id: 'none', label: 'Natural', icon: '🐾' },
  { id: 'flower', label: 'Flower', icon: '🌸' },
  { id: 'beanie', label: 'Beanie', icon: '🧶' },
  { id: 'scarf', label: 'Scarf', icon: '🧣' },
  { id: 'glasses', label: 'Glasses', icon: '👓' },
];

const EXPRESSION_OPTIONS: { id: BearExpression; label: string; emoji: string }[] = [
  { id: 'idle', label: 'Gentle', emoji: '😊' },
  { id: 'happy', label: 'Happy', emoji: '🥰' },
  { id: 'excited', label: 'Excited', emoji: '✨' },
  { id: 'loved', label: 'In Love', emoji: '💖' },
  { id: 'sleepy', label: 'Sleepy', emoji: '😴' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { user, profile, saveProfile } = useAuthStore();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [selectedFur, setSelectedFur] = useState<FurTint>(
    profile?.avatar_config?.fur || 'chestnut'
  );
  const [selectedAccessory, setSelectedAccessory] = useState<BearAccessory>(
    profile?.avatar_config?.accessory || 'none'
  );
  const [selectedExpression, setSelectedExpression] = useState<BearExpression>(
    profile?.avatar_config?.expression || 'idle'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setError(null);
    if (!displayName.trim()) {
      setError('Please choose a display name for your bear.');
      return;
    }

    if (!user) {
      setError('No active session found. Please sign in again.');
      return;
    }

    setIsLoading(true);
    try {
      await saveProfile(displayName.trim(), {
        fur: selectedFur,
        accessory: selectedAccessory,
        expression: selectedExpression,
      });

      Alert.alert(
        'Profile Saved! 🍯',
        `Welcome to HoneyHug, ${displayName.trim()}! Your bear profile is ready.`,
        [
          {
            text: 'Let’s Go!',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (err: any) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Customize Your Bear</Text>
          <Text style={styles.subtitle}>
            Your partner will see this sweet bear in your shared sanctuary
          </Text>
        </View>

        {/* Live Preview of Bear */}
        <View style={styles.avatarPreviewContainer}>
          <BearAvatar
            config={{
              fur: selectedFur,
              accessory: selectedAccessory,
              expression: selectedExpression,
            }}
            size={160}
          />
        </View>

        <View style={styles.card}>
          <HoneyInput
            label="Your Bear Name"
            placeholder="e.g. Honey Bear, Rahul"
            value={displayName}
            onChangeText={setDisplayName}
          />

          {/* Fur Selection */}
          <Text style={styles.sectionLabel}>Fur Coat Tint</Text>
          <View style={styles.chipRow}>
            {FUR_OPTIONS.map((fur) => {
              const isSelected = selectedFur === fur.id;
              return (
                <TouchableOpacity
                  key={fur.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedFur(fur.id)}
                  style={[
                    styles.furChip,
                    isSelected && styles.furChipSelected,
                  ]}
                >
                  <View style={[styles.furColorDot, { backgroundColor: fur.color }]} />
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {fur.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Accessory Selection */}
          <Text style={styles.sectionLabel}>Accessory</Text>
          <View style={styles.chipRow}>
            {ACCESSORY_OPTIONS.map((acc) => {
              const isSelected = selectedAccessory === acc.id;
              return (
                <TouchableOpacity
                  key={acc.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedAccessory(acc.id)}
                  style={[
                    styles.accChip,
                    isSelected && styles.accChipSelected,
                  ]}
                >
                  <Text style={styles.accIcon}>{acc.icon}</Text>
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {acc.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Expression Selection */}
          <Text style={styles.sectionLabel}>Initial Mood Expression</Text>
          <View style={styles.chipRow}>
            {EXPRESSION_OPTIONS.map((exp) => {
              const isSelected = selectedExpression === exp.id;
              return (
                <TouchableOpacity
                  key={exp.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedExpression(exp.id)}
                  style={[
                    styles.accChip,
                    isSelected && styles.accChipSelected,
                  ]}
                >
                  <Text style={styles.accIcon}>{exp.emoji}</Text>
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {exp.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <HoneyButton
            title="Complete My Bear 🍯"
            onPress={handleComplete}
            isLoading={isLoading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.title1,
    color: colors.cocoa,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.body,
    color: colors.cocoaLight,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  avatarPreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: radii.xl,
    padding: spacing.xl,
    borderWidth: 1.5,
    borderColor: '#F0E4D2',
    shadowColor: colors.cocoa,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.caption,
    color: colors.cocoa,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  furChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5ED',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#E6D7C3',
    gap: spacing.xs + 2,
  },
  furChipSelected: {
    backgroundColor: '#FFF1D6',
    borderColor: colors.honey,
  },
  furColorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  accChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5ED',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#E6D7C3',
    gap: spacing.xs,
  },
  accChipSelected: {
    backgroundColor: '#FFF1D6',
    borderColor: colors.honey,
  },
  accIcon: {
    fontSize: 14,
  },
  chipText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.sizes.caption,
    color: colors.cocoaLight,
  },
  chipTextSelected: {
    color: colors.cocoa,
    fontFamily: typography.fontFamily.bold,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: radii.sm,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.caption,
    color: colors.error,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: spacing.xl,
  },
});
