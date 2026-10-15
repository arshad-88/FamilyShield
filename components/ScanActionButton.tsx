import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from './GlassCard';

interface ScanActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export default function ScanActionButton({
  icon,
  label,
  onPress,
}: ScanActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="min-h-14"
    >
      <GlassCard>
        <Ionicons
          name={icon}
          size={32}
          color="rgba(255,255,255,0.9)"
          style={{ textAlign: 'center' }}
        />
        <Text className="mt-2 text-center text-sm text-white/80">{label}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
}