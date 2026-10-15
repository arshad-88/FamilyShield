// NativeWind className type augmentation for React Native components
import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
    contentContainerClassName?: string;
  }
  interface FlatListProps<any> {
    className?: string;
    contentContainerClassName?: string;
  }
  interface ActivityIndicatorProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
}