import { supabase } from '@/lib/supabase';
import { Profile, AvatarConfig } from './types';

export const authService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }

    return data as Profile | null;
  },

  async upsertProfile(profile: Partial<Profile> & { id: string }): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Profile;
  },

  async updatePushToken(userId: string, token: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ push_token: token, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.warn('Failed to update push token in profile:', error.message);
    }
  },

  async signInWithEmail(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signUpWithEmail(email: string, password: string) {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  async signInWithOtp(email: string) {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'honeyhug://',
      },
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },
};
