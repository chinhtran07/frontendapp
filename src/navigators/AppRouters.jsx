import { useContext, useEffect, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { SplashScreen } from "../screens";
import useAuth from "../configs/AuthContext"
import { authApi, endpoints } from "../configs/API";

const AppRouters = () => {
    const [isShowSplash, setShowSplash] = useState(true);

    const {getItem} = useAsyncStorage('accessToken')

    const [state, dispatch] = useAuth()


    useEffect(() => {
        checkLogin();
        const timeOut = setTimeout(() => {
            setShowSplash(false)
        }, 1500)

        return () => clearTimeout(timeOut);
    }, []);

    const checkLogin = async () => {
        const token = await getItem();
        let user = await authApi(token).get(endpoints['current-user']);
        token && dispatch({
            type: 'login',
            payload: {
                user: user.data,
                accessToken: token
            }
        })
    }


    return (
        <>
            {isShowSplash ? (
                <SplashScreen />
            ) : state.accessToken ? (
                <MainNavigator />
            ) : (
                <AuthNavigator />
            )}
        </>
    )
}

export default AppRouters;