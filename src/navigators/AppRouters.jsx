import { useEffect, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "../screens";

const AppRouters = () => {
    const [isShowSplash, setShowSplash] = useState(true);
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        checkLogin();
        const timeOut = setTimeout(() => {
            setShowSplash(false)
        }, 1500)

        return () => clearTimeout(timeOut);
    }, []);

    const checkLogin = async () => {
        const token = await AsyncStorage.getItem("accessToken")

        token && setAccessToken(token);
    }

    return (
        <>
            {isShowSplash ? (
                <SplashScreen />
            ) : accessToken ? (
                <MainNavigator />
            ) : (
                <AuthNavigator />
            )}
        </>
    )
}

export default AppRouters;