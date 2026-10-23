import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect, G } from 'react-native-svg';
import { AvatarConfig, FurTint, BearExpression, BearAccessory } from '@/features/auth/types';
import { colors } from '@/theme/colors';

interface BearAvatarProps {
  config: AvatarConfig;
  size?: number;
}

export const BearAvatar: React.FC<BearAvatarProps> = ({ config, size = 180 }) => {
  const furColor = colors.fur[config.fur] || colors.fur.chestnut;
  const innerEarColor = '#FAD4D8';
  const muzzleColor = '#FFF5EA';
  const noseColor = '#4A3528';
  const eyeColor = '#3A2618';
  const blushColor = 'rgba(255, 143, 163, 0.45)';

  const renderExpression = (expression: BearExpression) => {
    switch (expression) {
      case 'happy':
        return (
          <G>
            {/* Happy eyes - inverted arcs */}
            <Path
              d="M 68 86 Q 78 76 88 86"
              stroke={eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M 112 86 Q 122 76 132 86"
              stroke={eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cheerful wide open mouth */}
            <Path
              d="M 92 110 Q 100 124 108 110"
              stroke={eyeColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="#E57373"
            />
            {/* Blushing cheeks */}
            <Circle cx="62" cy="98" r="8" fill={blushColor} />
            <Circle cx="138" cy="98" r="8" fill={blushColor} />
          </G>
        );

      case 'sleepy':
        return (
          <G>
            {/* Sleepy straight-curved eyes */}
            <Path
              d="M 68 86 Q 78 92 88 86"
              stroke={eyeColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M 112 86 Q 122 92 132 86"
              stroke={eyeColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tiny Zzz */}
            <Path
              d="M 145 50 L 155 50 L 145 60 L 155 60"
              stroke={colors.cocoaLight}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </G>
        );

      case 'sad':
        return (
          <G>
            {/* Sad eyes with watery tear */}
            <Circle cx="78" cy="88" r="4.5" fill={eyeColor} />
            <Circle cx="122" cy="88" r="4.5" fill={eyeColor} />
            <Path
              d="M 94 116 Q 100 110 106 116"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Teardrop */}
            <Circle cx="132" cy="98" r="3.5" fill="#64B5F6" />
          </G>
        );

      case 'loved':
        return (
          <G>
            {/* Heart eyes */}
            <Path
              d="M 78 85 C 74 78, 66 82, 70 89 L 78 96 L 86 89 C 90 82, 82 78, 78 85 Z"
              fill={colors.blush}
            />
            <Path
              d="M 122 85 C 118 78, 110 82, 114 89 L 122 96 L 130 89 C 134 82, 126 78, 122 85 Z"
              fill={colors.blush}
            />
            {/* Cute gentle smile */}
            <Path
              d="M 93 112 Q 100 120 107 112"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx="60" cy="98" r="9" fill={blushColor} />
            <Circle cx="140" cy="98" r="9" fill={blushColor} />
          </G>
        );

      case 'excited':
        return (
          <G>
            {/* Sparkle big eyes */}
            <Circle cx="78" cy="86" r="6" fill={eyeColor} />
            <Circle cx="76" cy="84" r="2" fill="#FFFFFF" />
            <Circle cx="122" cy="86" r="6" fill={eyeColor} />
            <Circle cx="120" cy="84" r="2" fill="#FFFFFF" />
            {/* Big joyful open mouth */}
            <Path
              d="M 90 110 Q 100 128 110 110 Z"
              fill="#E57373"
              stroke={eyeColor}
              strokeWidth="2.5"
            />
            <Circle cx="58" cy="98" r="8" fill={blushColor} />
            <Circle cx="142" cy="98" r="8" fill={blushColor} />
          </G>
        );

      case 'idle':
      default:
        return (
          <G>
            {/* Idle eyes */}
            <Circle cx="78" cy="86" r="5" fill={eyeColor} />
            <Circle cx="76" cy="84" r="1.5" fill="#FFFFFF" />
            <Circle cx="122" cy="86" r="5" fill={eyeColor} />
            <Circle cx="120" cy="84" r="1.5" fill="#FFFFFF" />
            {/* Gentle smile */}
            <Path
              d="M 94 112 Q 100 118 106 112"
              stroke={eyeColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx="62" cy="98" r="7" fill={blushColor} />
            <Circle cx="138" cy="98" r="7" fill={blushColor} />
          </G>
        );
    }
  };

  const renderAccessory = (accessory: BearAccessory) => {
    switch (accessory) {
      case 'flower':
        return (
          <G>
            {/* Flower petal crown on right ear */}
            <Circle cx="138" cy="42" r="7" fill="#FF8FA3" />
            <Circle cx="148" cy="46" r="7" fill="#FF8FA3" />
            <Circle cx="144" cy="56" r="7" fill="#FF8FA3" />
            <Circle cx="132" cy="54" r="7" fill="#FF8FA3" />
            <Circle cx="140" cy="48" r="5" fill="#F6B93B" />
          </G>
        );

      case 'beanie':
        return (
          <G>
            {/* Cozy red/honey beanie */}
            <Path
              d="M 60 62 C 60 20, 140 20, 140 62 Z"
              fill="#E57373"
              stroke="#6B4226"
              strokeWidth="3"
            />
            <Rect
              x="54"
              y="56"
              width="92"
              height="12"
              rx="6"
              fill="#F6B93B"
              stroke="#6B4226"
              strokeWidth="2.5"
            />
            <Circle cx="100" cy="20" r="10" fill="#FFF4E0" stroke="#6B4226" strokeWidth="2" />
          </G>
        );

      case 'scarf':
        return (
          <G>
            {/* Winter knit scarf around neck */}
            <Path
              d="M 52 145 C 75 160, 125 160, 148 145 C 152 158, 142 168, 100 170 C 58 168, 48 158, 52 145 Z"
              fill="#8DB580"
              stroke="#6B4226"
              strokeWidth="2.5"
            />
            {/* Scarf hanging tail */}
            <Path
              d="M 120 155 L 126 190 L 142 188 L 134 153 Z"
              fill="#8DB580"
              stroke="#6B4226"
              strokeWidth="2.5"
            />
          </G>
        );

      case 'glasses':
        return (
          <G>
            {/* Left rim */}
            <Circle
              cx="78"
              cy="86"
              r="14"
              stroke={colors.cocoa}
              strokeWidth="3"
              fill="rgba(255, 255, 255, 0.3)"
            />
            {/* Right rim */}
            <Circle
              cx="122"
              cy="86"
              r="14"
              stroke={colors.cocoa}
              strokeWidth="3"
              fill="rgba(255, 255, 255, 0.3)"
            />
            {/* Bridge */}
            <Path
              d="M 92 85 Q 100 81 108 85"
              stroke={colors.cocoa}
              strokeWidth="3"
              fill="none"
            />
          </G>
        );

      case 'none':
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* Left Ear */}
        <Circle cx="55" cy="55" r="22" fill={furColor} stroke={colors.cocoa} strokeWidth="3" />
        <Circle cx="55" cy="55" r="12" fill={innerEarColor} />

        {/* Right Ear */}
        <Circle cx="145" cy="55" r="22" fill={furColor} stroke={colors.cocoa} strokeWidth="3" />
        <Circle cx="145" cy="55" r="12" fill={innerEarColor} />

        {/* Body Base */}
        <Path
          d="M 45 190 C 40 145, 160 145, 155 190 Z"
          fill={furColor}
          stroke={colors.cocoa}
          strokeWidth="3"
        />
        {/* Belly Patch */}
        <Ellipse cx="100" cy="180" rx="35" ry="20" fill={muzzleColor} />

        {/* Head */}
        <Circle cx="100" cy="95" r="54" fill={furColor} stroke={colors.cocoa} strokeWidth="3" />

        {/* Muzzle */}
        <Ellipse cx="100" cy="105" rx="26" ry="18" fill={muzzleColor} />

        {/* Nose */}
        <Path
          d="M 94 99 C 94 95, 106 95, 106 99 C 106 104, 94 104, 94 99 Z"
          fill={noseColor}
        />

        {/* Dynamic Expression */}
        {renderExpression(config.expression)}

        {/* Accessory */}
        {renderAccessory(config.accessory)}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
