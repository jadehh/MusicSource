/**
 * @File     : layout.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:17
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : layout.tsx
 """
 */
import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src"
import { colors } from './constant'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerLargeStyle: {
		backgroundColor: colors.background,
	},
	headerLargeTitleStyle: {
		color: colors.text,
	},
	headerTintColor: colors.text,
	headerTransparent: true,
	headerBlurEffect: 'prominent',
	headerShadowVisible: false,
}