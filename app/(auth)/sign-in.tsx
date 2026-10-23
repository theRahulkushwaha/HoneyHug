import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { HoneyInput } from '@/components/HoneyInput';
import { HoneyButton } from '@/components/HoneyButton';
import { BearAvatar } from '@/components/BearAvatar';
import { authService } from '@/features/auth/authService';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radii } from '@/theme/spacing';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (isMagicLinkMode) {
      setIsLoading(true);
      try {
        const { error } = await authService.signInWithOtp(email.trim());
        if (error) {
          setErrorMessage(error.message);
        } else {
          Alert.alert(
            'Magic Link Sent! 💌',
            'Check your inbox for a login link to enter your cozy den.'
          );
        }
      } catch (err: any) {
        setErrorMessage(err.message || 'Failed to send magic link');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authService.signInWithEmail(email.trim(), password);
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Sign in failed');
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
            config={{ fur: 'caramel', expression: 'happy', accessory: 'none' }}
            size={120}
          />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Step inside your cozy shared sanctuary</Text>
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

          {!isMagicLinkMode && (
            <HoneyInput
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          )}

          {errorMessage && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <HoneyButton
            title={isMagicLinkMode ? 'Send Magic Link 💌' : 'Sign In 🍯'}
            onPress={handleSignIn}
            isLoading={isLoading}
            style={styles.actionButton}
          />

          <TouchableOpacity
            style={styles.toggleModeButton}
            onPress={() => {
              setIsMagicLinkMode(!isMagicLinkMode);
              setErrorMessage(null);
            }}
          >
            <Text style={styles.toggleModeText}>
              {isMagicLinkMode
                ? 'Use email & password instead'
                : 'Or sign in with passwordless Magic Link'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>New to HoneyHug? </Text>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Create Account</Text>
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
  toggleModeButton: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  toggleModeText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.sizes.caption,
    color: colors.cocoaLight,
    textDecorationLine: 'underline',
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
