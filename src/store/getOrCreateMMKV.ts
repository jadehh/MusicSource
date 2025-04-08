/**
 * @File     : getOrCreateMMKV.ts.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:21
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : getOrCreateMMKV.ts
 """
 */
import {MMKV} from 'react-native-mmkv';
import pathConst from '@/store/pathConst'

const _mmkvCache: Record<string, any> = {};

// @ts-ignore
global.mmkv = _mmkvCache;

// Internal Method
const getOrCreateMMKV = (dbName: string, cachePath = false) => {
    if (_mmkvCache[dbName]) {
        return _mmkvCache[dbName];
    }

    const newStore = new MMKV({
        id: dbName,
        path: cachePath ? pathConst.mmkvCachePath : pathConst.mmkvPath,
    });

    _mmkvCache[dbName] = newStore;
    return newStore;
};
export default getOrCreateMMKV;
