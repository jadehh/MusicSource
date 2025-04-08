/**
 * @File     : miscellaneous.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:18
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : miscellaneous.tsx
 """
 */
export const formatSecondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}`
}

export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}
