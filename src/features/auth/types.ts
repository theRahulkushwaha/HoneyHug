export type FurTint = 'chestnut' | 'caramel' | 'polar' | 'espresso';

export type BearExpression = 'idle' | 'happy' | 'sleepy' | 'sad' | 'loved' | 'excited';

export type BearAccessory = 'none' | 'beanie' | 'flower' | 'scarf' | 'glasses';

export interface AvatarConfig {
  fur: FurTint;
  expression: BearExpression;
  accessory: BearAccessory;
}

export interface Profile {
  id: string;
  display_name: string;
  avatar_config: AvatarConfig;
  timezone: string;
  push_token?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  fur: 'chestnut',
  expression: 'idle',
  accessory: 'none',
};
