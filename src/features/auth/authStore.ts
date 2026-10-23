import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { authService } from './authService';
import { Profile, AvatarConfig } from './types';
import { registerForPushNotificationsAsync } from '@/lib/notifications';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  saveProfile: (displayName: string, avatarConfig: AvatarConfig) => Promise<Profile>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  isInitialized: false,

  initialize: async () => {
    try {
      set({ isLoading: true });

      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      let profile: Profile | null = null;
      if (user) {
        profile = await authService.getProfile(user.id);
      }

      set({
        session,
        user,
        profile,
        isLoading: false,
        isInitialized: true,
      });

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        const currentUser = newSession?.user ?? null;
        let userProfile: Profile | null = null;

        if (currentUser) {
          userProfile = await authService.getProfile(currentUser.id);
        }

        set({
          session: newSession,
          user: currentUser,
          profile: userProfile,
          isLoading: false,
        });
      });
    } catch (error) {
      console.warn('Error during authStore initialization:', error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  saveProfile: async (displayName: string, avatarConfig: AvatarConfig) => {
    let { user } = get();
    if (!user) {
      // Fallback check directly from Supabase client in case of state re-hydration race condition
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user ?? null;
      if (user && session) {
        set({ user, session });
      }
    }

    if (!user) {
      throw new Error('No active session found. Please sign in again.');
    }

    set({ isLoading: true });
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      const savedProfile = await authService.upsertProfile({
        id: user.id,
        display_name: displayName,
        avatar_config: avatarConfig,
        timezone,
      });

      set({ profile: savedProfile, isLoading: false });

      // Attempt push token extraction in the background
      registerForPushNotificationsAsync()
        .then((token) => {
          if (token) {
            authService.updatePushToken(user.id, token).catch(console.warn);
          }
        })
        .catch(console.warn);

      return savedProfile;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;
    const profile = await authService.getProfile(user.id);
    set({ profile });
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await authService.signOut();
    } finally {
      set({
        session: null,
        user: null,
        profile: null,
        isLoading: false,
      });
    }
  },
}));
