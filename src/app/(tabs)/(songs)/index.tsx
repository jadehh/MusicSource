/**
 * @File     : index.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:12
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : 音乐页面
 """
 */

import { screenPadding } from '@/constants/constant'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import i18n from '@/utils/i18n'
import {ScrollView, View } from 'react-native'
const SongsScreen = () => {
    useNavigationSearch({
        searchBarOptions: {
            tintColor: '#FF5733', // Set the search button color
            placeholder: i18n.t('find.inSongs'),
            cancelButtonText: i18n.t('find.cancel'),
        },
    })
    return (
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ paddingHorizontal: screenPadding.horizontal }}
                onScroll={({ nativeEvent }) => {
                    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
                    const paddingToBottom = 20
                    const isCloseToBottom =
                        layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom

                    if (isCloseToBottom) {
                        // handleLoadMore()
                    }
                }}
                scrollEventThrottle={400}
            >
                {/*<TracksList*/}
                {/*    id={generateTracksListId('songs', search)}*/}
                {/*    // tracks={filteredTracks}*/}
                {/*    scrollEnabled={false}*/}
                {/*    // numsToPlay={songsNumsToLoad}*/}
                {/*/>*/}
                {/* {isLoading && tracks.length > 0 && (
					<View
						style={{
							paddingVertical: 0,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ActivityIndicator size="large" />
					</View>
				)} */}
            </ScrollView>
        </View>
    )
}

export default SongsScreen