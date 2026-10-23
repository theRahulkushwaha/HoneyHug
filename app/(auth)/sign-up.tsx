import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { HoneyInput } from '@/components/HoneyInput';
import { HoneyButton } from '@/components/HoneyButton';
import { BearAvatar } from '@/components/BearAvatar';
import { authService } from '@/features/auth/authService';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radii } from '@/theme/spacing';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Please enter an email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authService.signUpWithEmail(email.trim(), password);
      if (error) {
        setErrorMessage(error.message);
      } else if (data?.session) {
        // Active session established (email confirmation disabled or auto-logged in)
        router.replace('/(auth)/onboarding');
      } else if (data?.user && !data.session) {
        // Email confirmation is required by your Supabase project settings
        setErrorMessage(
          'Account created! 💌 Supabase requires email verification. Please check your inbox and verify your email before signing in.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to sign up');
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
        <View style={styles.headerContainer}>
          <BearAvatar
            config={{ fur: 'chestnut', expression: 'excited', accessory: 'flower' }}
            size={120}
          />
          <Text style={styles.title}>Join HoneyHug</Text>
          <Text style={styles.subtitle}>Begin your shared chapter together</Text>
        </View>

        <View style={styles.formCard}>
          <HoneyInput
            label="Email"
            placeholder="bear@honeyhug.app"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <HoneyInput
            label="Password"
            placeholder="At least 6 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <HoneyInput
            label="Confirm Password"
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {errorMessage && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <HoneyButton
            title="Create Bear Account 🐾"
            onPress={handleSignUp}
            isLoading={isLoading}
            style={styles.actionButton}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.title1,
    color: colors.cocoa,
    marginTop: spacing.md,
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.body,
    color: colors.cocoaLight,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  formCard: {
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
  errorBanner: {
    backgroundColor: '#FFEBEE',
    borderRadius: radii.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.caption,
    color: colors.error,
    textAlign: 'center',
  },
  actionButton: {
    marginTop: spacing.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.body,
    color: colors.cocoaLight,
  },
  linkText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.body,
    color: colors.cocoa,
    textDecorationLine: 'underline',
  },
});
