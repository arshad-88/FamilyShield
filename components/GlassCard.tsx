import { View, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function GlassCard({ children, style }: GlassCardProps) {
  return (
    <View
      className="rounded-2xl border border-white/20 bg-white/10 p-4"
      style={style}
    >
      {children}
    </View>
  );
}