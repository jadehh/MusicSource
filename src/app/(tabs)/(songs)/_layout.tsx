/**
 * @File     : _layout.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:13
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : _layout.tsx
 """
 */

import GlobalButton from '@/components/GlobalButton'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import i18n, { nowLanguage } from '@/utils/i18n'
import { Stack } from 'expo-router'
import { View, Button } from 'react-native'

const SongsScreenLayout = () => {
    const language = nowLanguage.useValue()
    return (
        <View style={defaultStyles.container} key={language}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: i18n.t('appTab.songs'),
                        headerRight: () => <GlobalButton />,
                    }}
                />
            </Stack>
        </View>
    )
}
export default SongsScreenLayout