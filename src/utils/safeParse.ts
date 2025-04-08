/**
 * @File     : safeParse.ts.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:24
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : safeParse.ts.tsx
 """
 */

export default function <T = any>(raw?: string) {
    try {
        if (!raw) {
            return null;
        }
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}
