/**
 * @File     : +not-found.tsx
 * @Author   : jade
 * @Date     : 2025/4/8 9:13
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : +not-found.tsx
 """
 */
import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { Redirect } from 'expo-router'
import i18n from "@/utils/i18n";

function Unmatched() {
   useEffect(() => {
        // 弹出警告框
        Alert.alert(
            i18n.t("find.noPages.title"),
            i18n.t("find.noPages.message"),
            [
                {
                    text: i18n.t("find.noPages.ok"),},
            ],
        )
    })
    // 重定向到主页
    return <Redirect href="/" />
}

export default Unmatched;
