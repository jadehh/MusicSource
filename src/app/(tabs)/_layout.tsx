/**
 * @File     : _layout.tsx
 * @Author   : jade
 * @Date     : 2025/4/7 10:44
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : 应用的根布局文件，负责全局配置和布局
 */

import { Tabs } from 'expo-router';
import React from 'react';
import { colors, fontSize } from '@/constants/constant';
import { Ionicons } from '@expo/vector-icons';
import i18n from "@/utils/i18n";

// 定义 TabsNavigation 组件
const TabsNavigation = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle: {
                        fontSize: fontSize.xs,
                        fontWeight: '500',
                    },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="(songs)"
                    options={{
                        title: i18n.t('appTab.songs'),
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Ionicons name="musical-notes-sharp" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: i18n.t('appTab.radio'),
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Ionicons name="radio" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}

// 导出 TabsNavigation 组件
export default TabsNavigation;