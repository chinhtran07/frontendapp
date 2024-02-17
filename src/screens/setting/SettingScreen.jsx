import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonComponent, ContainerComponent, TextComponent } from "../../components"
import useAuth from "../../configs/AuthContext"


const SettingScreen = () => {

    const [state, dispatch] = useAuth();

    const logout = async () => {
        await AsyncStorage.removeItem('accessToken')
        dispatch({
            type: 'logout'
        })
    }

    return (
        <ContainerComponent>
            <ButtonComponent text="Logout" type="primary" onPress={logout} />
        </ContainerComponent>
    )
}

export default SettingScreen;