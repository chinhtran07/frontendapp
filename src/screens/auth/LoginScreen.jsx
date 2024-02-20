import { ActivityIndicator, Image } from "react-native";
import Styles from "./Styles";
import { appColors } from "../../constants/appColors";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { authApi, endpoints } from "../../configs/API";
import DropDownPicker from "react-native-dropdown-picker";
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, TextComponent } from "../../components";
import { User, Lock } from "iconsax-react-native";
import useAuth from "../../configs/AuthContext";


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([
        { label: 'Cựu sinh viên', value: 1 },
        { label: 'Giảng viên', value: 2 },
        { label: 'Quản trị viên', value: 3 },
    ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);

    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useAuth()



    const login = async () => {
        setLoading(true)

        try {
            let res = await API.post(endpoints['login'], {
                "username": username,
                "password": password,
                "role": value
            },
            );

            await AsyncStorage.setItem("accessToken", res.data.access_token)
            let accessToken = res.data.access_token;
            let user = await authApi(res.data.access_token).get(endpoints['current-user']);
            let data = user.data;
            dispatch({
                type: 'login',
                payload: {
                    user: data, 
                    accessToken
                }
            })
        } catch (ex) {
            console.error(ex)
        } finally {
            setLoading(false)
        }
    }
    return (
        <ContainerComponent isScroll={true} styles={{backgroundColor: appColors.background}}>
            <SectionComponent styles={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 75
            }}>
                <Image source={require("../../assets/images/logo.png")} resizeMode="cover" />
            </SectionComponent>
            <SectionComponent>
                <TextComponent text="ĐĂNG NHẬP" size={22} color="#5608ff" styles={{ alignSelf: 'center', marginBottom: 10, fontWeight: 'bold' }} />
                <DropDownPicker
                    style={[{ marginBottom: 10, borderColor: appColors.blue }]}
                    dropDownStyle={Styles.dropdownDropStyle}
                    open={open}
                    value={value}
                    items={roles}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setRoles}
                    onChangeItem={(items) => setValue(items.value)}
                />
                <InputComponent
                    value={username}
                    placeholder="Tài khoản"
                    allowClear
                    onChange={val => setUsername(val)}
                    affix={<User size={22} color={appColors.blue} />}
                />
                <InputComponent
                    value={password}
                    placeholder="Mật khẩu"
                    isPassword
                    onChange={val => setPassword(val)}
                    affix={<Lock size={22} color={appColors.blue} />}
                />
                <ButtonComponent
                    type='link'
                    text="Quên mật khẩu?"
                    textSize={30}
                    onPress={() => navigation.navigate("ForgetPasswordScreen")}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    type="primary"
                    text="Đăng nhập"
                    textSize={18}
                    textColor="white"
                    onPress={login}
                />

            </SectionComponent>
            <SectionComponent>
                <RowComponent styles={{justifyContent: 'center'}}>
                    <TextComponent text="Bạn chưa có tài khoản?" />
                    <ButtonComponent text=" Đăng ký" type='link' onPress={() => navigation.navigate('RegisterScreen')}/>
                </RowComponent>
            </SectionComponent>
            {loading ? <ActivityIndicator color={appColors.blue} /> : <></>}
        </ContainerComponent>
    )
};

export default LoginScreen;