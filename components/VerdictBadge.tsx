import { View, Text } from 'react-native';
import { useLanguage } from '@/hooks/useLanguage';

interface VerdictBadgeProps {
  verdict: 'safe' | 'suspicious' | 'scam';
}

const VERDICT_STYLES: Record<
  string,
  { bg: string; label: string }
> = {
  safe: { bg: 'bg-green-500', label: 'results.safe' },
  suspicious: { bg: 'bg-amber-500', label: 'results.suspicious' },
  scam: { bg: 'bg-red-500', label: 'results.scam' },
};

export default function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const { t } = useLanguage();
  const style = VERDICT_STYLES[verdict];

  if (!style) return null;

  return (
    <View
      className={`flex-row items-center self-start rounded-full px-3 py-1 ${style.bg}`}
    >
      <View className="mr-1.5 h-2 w-2 rounded-full bg-white" />
      <Text className="text-xs font-bold text-white">{t(style.label)}</Text>
    </View>
  );
}