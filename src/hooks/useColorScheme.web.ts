/**
 * @File     : useColorScheme.web.ts.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:20
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : useColorScheme.web.ts.tsx
 """
 */

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
