/**
 * @File     : storage.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 15:33
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : storage.tsx
 """
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
import {logDebug, logError} from "@/helpers/logger";


const partKeyPrefix = '@___PART___'
const partKeyPrefixRxp = /^@___PART___/
const keySplit = ','
const limit = 500000

const buildData = (key: string, value: any, datas: Array<[string, string]>) => {
  const valueStr = JSON.stringify(value)
  if (valueStr.length <= limit) {
    datas.push([key, valueStr])
    return
  }

  const partKeys:string[] = []
  for (let i = 0, len = Math.floor(valueStr.length / limit); i <= len; i++) {
    const partKey = `${partKeyPrefix}${key}${i}`
    partKeys.push(partKey)
    datas.push([partKey, valueStr.substring(i * limit, (i + 1) * limit)])
  }
  datas.push([key, `${partKeyPrefix}${partKeys.join(keySplit)}`])
}

const handleGetData = async<T>(partKeys: string): Promise<T> => {
  const keys = partKeys.replace(partKeyPrefixRxp, '').split(keySplit)

  return AsyncStorage.multiGet(keys).then(datas => {
    return JSON.parse(datas.map(data => data[1]).join(''))
  })
}

export const saveData = async(key: string, value: any) => {
  const datas: Array<[string, string]> = []
  buildData(key, value, datas)

  try {
    await AsyncStorage.multiSet(datas)
  } catch (e: any) {
    // saving error
    logDebug('storage error[saveData]:', key, e.message)
    throw e
  }
}

// export const getData = async<T = unknown>(key: string): Promise<T | null> => {
//   let value: string | null
//   try {
//     value = await AsyncStorage.getItem(key)
//   } catch (e: any) {
//     // error reading value
//     log('storage error[getData]:', key, e.message)
//     throw e
//   }
//   if (value && partKeyPrefixRxp.test(value)) {
//     return handleGetData<T>(value)
//   } else if (value == null) return value
//   return JSON.parse(value)
// }

export const removeData = async(key: string) => {
  let value: string | null
  try {
    value = await AsyncStorage.getItem(key)
  } catch (e: any) {
    // error reading value
    logDebug('storage error[removeData]:', key, e.message)
    throw e
  }
  if (value && partKeyPrefixRxp.test(value)) {
    const partKeys = value.replace(partKeyPrefixRxp, '').split(keySplit)
    partKeys.push(key)
    try {
      await AsyncStorage.multiRemove(partKeys)
    } catch (e: any) {
      // remove error
      logError('storage error[removeData]:', key, e.message)
      throw e
    }
  } else {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e: any) {
      // remove error
      logError('storage error[removeData]:', key, e.message)
      throw e
    }
  }
}

export const getAllKeys = async() => {
  let keys
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch (e: any) {
    // read key error
    logError('storage error[getAllKeys]:', e.message)
    throw e
  }

  return keys
}


export const getDataMultiple = async<T extends readonly string[]>(keys: T) => {
  type RawData = { [K in keyof T]: [T[K], string | null] }
  let datas: RawData
  try {
    datas = await AsyncStorage.multiGet(keys) as RawData
  } catch (e: any) {
    // read error
    logError('storage error[getDataMultiple]:', e.message)
    throw e
  }
  const promises: Array<Promise<ReadonlyArray<[unknown | null]>>> = []
  for (const [, value] of datas) {
    if (value && partKeyPrefixRxp.test(value)) {
      promises.push(handleGetData(value))
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      promises.push(Promise.resolve(value ? JSON.parse(value) : value))
    }
  }
  return Promise.all(promises).then(values => {
    return datas.map(([key], index) => ([key, values[index]])) as { [K in keyof T]: [T[K], unknown] }
  })
}

export const saveDataMultiple = async(datas: Array<[string, any]>) => {
  const allData: Array<[string, string]> = []
  for (const [key, value] of datas) {
    buildData(key, value, allData)
  }
  try {
    await AsyncStorage.multiSet(allData)
  } catch (e: any) {
    // save error
    logError('storage error[saveDataMultiple]:', e.message)
    throw e
  }
}


export const removeDataMultiple = async(keys: string[]) => {
  if (!keys.length) return
  const datas = await AsyncStorage.multiGet(keys)
  const allKeys:string[] = []
  for (const [key, value] of datas) {
    allKeys.push(key)
    if (value && partKeyPrefixRxp.test(value)) {
      allKeys.push(...value.replace(partKeyPrefixRxp, '').split(keySplit))
    }
  }
  try {
    await AsyncStorage.multiRemove(allKeys)
  } catch (e: any) {
    // remove error
    logError('storage error[removeDataMultiple]:', e.message)
    throw e
  }
}

export const clearAll = async() => {
  try {
    await AsyncStorage.clear()
  } catch (e: any) {
    // clear error
    logError('storage error[clearAll]:', e.message)
    throw e
  }
}

export async function setStorage(key: string, value: any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value, null, ''));
    } catch (e: any) {
        console.log(`存储失败${key}`, e?.message);
    }
}

export async function getStorage(key: string) {
    try {
        const result = await AsyncStorage.getItem(key);
        if (result) {
            return JSON.parse(result);
        }
    } catch(e:any) {
         logError(`获取存储失败${key}`, e?.message);
    }
    return null;
}

export async function getMultiStorage(keys: string[]) {
    if (keys.length === 0) {
        return [];
    }
    const result = await AsyncStorage.multiGet(keys);

    return result.map(_ => {
        try {
            if (_[1]) {
                return JSON.parse(_[1]);
            }
            return null;
        } catch {
            return null;
        }
    });
}

export async function removeStorage(key: string) {
    return AsyncStorage.removeItem(key);
}
export { useAsyncStorage } from '@react-native-async-storage/async-storage'
