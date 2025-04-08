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

const PersistConfig = {
    PersistStatus: 'appPersistStatus',
}

interface IPersistConfig {
    'app.language': string
}

function set<K extends keyof IPersistConfig>(key: K, value: IPersistConfig[K] | undefined) {
    // 保存数据
    const store = getOrCreateMMKV(PersistConfig.PersistStatus)
    if (value === undefined) {
        store.delete(key)
    } else {
        store.set(key, JSON.stringify(value))
    }
}

function get<K extends keyof IPersistConfig>(key: K): IPersistConfig[K] | null {
    const store = getOrCreateMMKV(PersistConfig.PersistStatus)
    const raw = store.getString(key)
    if (raw) {
        return safeParse(raw) as IPersistConfig[K]
    }
    return null

}

function useValue<K extends keyof IPersistConfig>(
    key: K,
    defaultValue?: IPersistConfig[K],
): IPersistConfig[K] | null {
    const [state, setState] = useState<IPersistConfig[K] | null>(get(key) ?? defaultValue ?? null)

    useEffect(() => {
        const store = getOrCreateMMKV(PersistConfig.PersistStatus)
        const sub = store.addOnValueChangedListener((changedKey) => {
            if (key === changedKey) {
                setState(get(key))
            }
        })

        return () => {
            sub.remove()
        }
    }, [key])

    return state
}

const PersistStatus = {
    get,
    set,
}

export default PersistStatus