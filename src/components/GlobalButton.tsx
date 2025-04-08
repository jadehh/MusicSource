/**
 * @File     : GlobalButton.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:15
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : GlobalButton.tsx
 """
 */
import { router } from 'expo-router'
import React from 'react'
import {StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/constants/constant'

const GlobalButton = () => {

	const showPlayList = () => {
		// @ts-ignore
		router.navigate('/(modals)/settingModal')
	}

	return (
		<View style={styles.container}>
				<MaterialCommunityIcons
			name='menu'
			size={27}
			onPress={showPlayList}
			color={colors.icon}
				style={{ marginRight: 6 }}
		/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
})

export default GlobalButton