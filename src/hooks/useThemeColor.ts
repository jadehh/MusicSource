/**
 * @File     : useThemeColor.ts.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:20
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : useThemeColor.ts.tsx
 """
 */
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
