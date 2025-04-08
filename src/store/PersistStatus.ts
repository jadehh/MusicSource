/**
 * @File     : PersistStatus.ts.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:22
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : PersistStatus.ts.tsx
 """
 */
import getOrCreateMMKV from '@/store/getOrCreateMMKV'
import safeParse from '@/utils/safeParse'

import {useEffect, useState} from 'react'
import {saveData,getStorage} from "@/helpers/storage";

const PersistConfig = {
    PersistStatus: 'appPersistStatus',
}

interface IPersistConfig {
    'app.language': string
}

async function set<K extends keyof IPersistConfig>(key: K, value: IPersistConfig[K] | undefined) {


    // 保存数据
    // const store = getOrCreateMMKV(PersistConfig.PersistStatus)
    // if (value === undefined) {
    //     store.delete(key)
    // } else {
    //     store.set(key, JSON.stringify(value))
    // }
    await saveData(key, value)
}

async function get<K extends keyof IPersistConfig>(key: K): Promise<IPersistConfig[K] | null> {

    // const store = getOrCreateMMKV(PersistConfig.PersistStatus)
    // const raw = store.getString(key)
    // if (raw) {
    //     return safeParse(raw) as IPersistConfig[K]
    // }
    // return null
    return  safeParse(await getStorage(key)) as IPersistConfig[K]

}


const PersistStatus = {
    get,
    set,
}

export default PersistStatus