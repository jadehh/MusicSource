/**
 * @File     : _layout.tsx
 * @Author   : jade
 * @Date     : 2025/4/7 10:44
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : 应用的根布局文件，负责全局配置和布局
 */
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ShareIntentProvider } from 'expo-share-intent';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setI18nConfig } from '@/utils/i18n';
import {logDebug} from "@/helpers/logger";

logDebug("#################RootLayout.tsx loaded ######################");

// 设置国际化配置
setI18nConfig();

// 阻止启动屏幕自动隐藏
SplashScreen.preventAutoHideAsync().then(() => {
    console.log("SplashScreen preventAutoHideAsync");
});

function RootLayout() {

    // 加载自定义字体
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });
    const [isI18nReady, setIsI18nReady] = useState(false);
    logDebug("load fonts");
    // 字体加载完成后隐藏启动屏幕
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync().then(() => {
                logDebug("SplashScreen.hideAsync");
            });
        }
    }, [loaded]);

    // 初始化国际化配置
    useEffect(() => {
        const initI18n = async () => {
            try {
                await setI18nConfig();
                setIsI18nReady(true);
            } catch (error) {
                console.error('Failed to initialize i18n:', error);
            }
        };

        initI18n().then(() => {
            console.log("init success");
        });
    }, []);

    // 如果字体未加载完成或者国际化初始化未完成，返回 null
    if (!loaded || !isI18nReady) {
        return null;
    }
    // 自定义 Toast 配置
    const toastConfig = {
        success: () => (
            <BaseToast
                style={{ borderLeftColor: 'rgb(252,87,59)', backgroundColor: 'rgb(251,231,227)' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: 'rgb(252,87,59)',
                }}
                text2Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: 'rgb(252,87,59)',
                }}
            />
        ),
        error: () => (
            <ErrorToast
                style={{ borderLeftColor: 'rgb(252,87,59)', backgroundColor: 'rgb(251,231,227)' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: 'rgb(252,87,59)',
                }}
                text2Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: 'rgb(252,87,59)',
                }}
            />
        ),
    };

    return (
        <ShareIntentProvider
            options={{
                debug: true,
                resetOnBackground: true,
            }}
        >
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                    <StatusBar style="auto" />
                    <Toast config={toastConfig} />
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </ShareIntentProvider>
    );
}
export default RootLayout;