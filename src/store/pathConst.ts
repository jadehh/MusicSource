/**
 * @File     : pathConst.ts.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:22
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : pathConst.ts.tsx
 """
 */
import * as FileSystem from 'expo-file-system';
import {logDebug} from "@/helpers/logger";
// 基础路径设置
export const basePath = FileSystem.documentDirectory

logDebug(`basePath: ${basePath}`)

// 导出路径配置
export default {
	basePath,
	pluginPath: `${basePath}/plugins/`, // 插件路径
	logPath: `${basePath}/log/`, // 日志路径
	dataPath: `${basePath}/data/`, // 数据路径
	cachePath: `${basePath}/cache/`, // 缓存路径
	musicCachePath: `${FileSystem.cacheDirectory}/TrackPlayer`, // 音乐缓存路径
	imageCachePath: `${FileSystem.cacheDirectory}/image_manager_disk_cache`, // 图片缓存路径
	lrcCachePath: `${basePath}/cache/lrc/`, // 歌词缓存路径
	downloadPath: `${basePath}/download/`, // 下载路径
	downloadMusicPath: `${basePath}/download/music/`, // 音乐下载路径
	mmkvPath: `${basePath}/mmkv`, // MMKV 存储路径
	mmkvCachePath: `${basePath}/cache/mmkv`, // MMKV 缓存路径
}
