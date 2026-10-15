import { TouchableOpacity, Text, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function PrimaryButton({
  onPress,
  label,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      className={`rounded-2xl border border-white/25 bg-white px-6 py-3 ${
        disabled ? 'opacity-50' : ''
      }`}
      style={style}
    >
      <Text className="text-center text-base font-semibold text-primary">
        {label}
      </Text>
    </TouchableOpacity>
  );
}