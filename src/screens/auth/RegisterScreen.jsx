import { useState } from "react"
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from "../../components"
import globalStyles from "../../styles/globalStyles"
import { appColors } from "../../constants/appColors"
import API, { endpoints } from "../../configs/API"
import { ActivityIndicator, Image } from "react-native"
import * as ImagePicker from 'expo-image-picker'

const RegisterScreen = ({ navigation }) => {
    const [user, setUser] = useState(
        {
            'first_name': '',
            'last_name': '',
            'username': '',
            'password': '',
            'email': '',
            'student_id': '',
            'avatar': ''
        }
    )
    const [errors, setErrors] = useState({
        'first_name': '',
        'last_name': '',
        'username': '',
        'password': '',
        'email': '',
        'student_id': '',
    });
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const containsNonAscii = str => /[^\u0000-\u007F]+/.test(str);
    const isValidStudentId = str => /^\d{10}$/.test(str);
    const isValidEmail = str => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

    const validate = () => {
        let newErrors = {};

        for (const key in user) {
            if (!user[key]) {
                newErrors[key] = "Trường này không được để trống.";
            }
        }

        if (containsNonAscii(user.username)) {
            newErrors.username = "Tên người dùng không được chứa ký tự không phải là chữ cái không dấu.";
        }

        if (!isValidStudentId(user.student_id)) {
            newErrors.student_id = "Mã số sinh viên phải chứa chính xác 10 số.";
        }

        if (!isValidEmail(user.email)) {
            newErrors.email = "Địa chỉ email không hợp lệ.";
        }
        if (confirmPassword !== user.password) {
            newErrors.confirmPassword = "Mật khẩu không trùng khớp"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShow(true)
            return;
        }

    }


    const register = async () => {
        validate()
        if (show) 
            return;
        setLoading(true);

        const form = new FormData();
        for (let key in user) {
            if (key === 'avatar') {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: user[key].mimeType
                })
                console.log(user[key].mimeType)
            } else {
                form.append(key, user[key])
            }
        }

        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.info(res.data);
            setErrors({})
            navigation.navigate("LoginScreen");
        } catch (ex) {
            console.error(ex)
        } finally {
            setLoading(false)
        }
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permission Denied!");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change("avatar", res.assets[0])
            }
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }
    return (
        <ContainerComponent isScroll>
            <SectionComponent>
                <TextComponent title text="NHẬP THÔNG TIN ĐĂNG KÝ" />
            </SectionComponent>
            <SectionComponent styles={{ paddingHorizontal: 20 }}>
                <InputComponent allowClear onChange={val => change("first_name", val)} value={user.first_name} placeholder="Tên" />
                <InputComponent allowClear onChange={val => change("last_name", val)} value={user.last_name} placeholder="Họ và tên lót" />
                <InputComponent onChange={val => change("username", val)} value={user.username} placeholder="Tài khoản" />
                {errors.username && <TextComponent text={errors.username} color={appColors.warning} />}
                <InputComponent isPassword={true} onChange={val => change("password", val)} value={user.password} placeholder="Mật khẩu" />
                <InputComponent isPassword={true} onChange={val => setConfirmPassword(val)} value={confirmPassword} placeholder="Xác nhận mật khẩu" />
                {errors.confirmPassword && <TextComponent text={errors.confirmPassword} color={appColors.warning} />}
                <InputComponent type='email-address' onChange={val => change("email", val)} value={user.email} placeholder="Địa chỉ email" />
                {errors.email && <TextComponent text={errors.email} color={appColors.warning} />}
                <InputComponent allowClear onChange={val => change("student_id", val)} value={user.student_id} placeholder="Mã số sinh viên" />
                {errors.student_id && <TextComponent text={errors.student_id} color={appColors.warning} />}
                <ButtonComponent
                    styles={[globalStyles.input]}
                    textColor="white"
                    type="primary"
                    text="Chọn ảnh đại diện"
                    onPress={picker}
                />
                <SectionComponent>
                    {user.avatar ? <Image source={{ uri: user.avatar.uri }} style={{ width: 80, height: 80, alignSelf: 'center' }} /> : ""}
                </SectionComponent>
                {loading === true ? <ActivityIndicator /> : <>
                    <ButtonComponent text="ĐĂNG KÝ" type="primary" color={appColors.button} onPress={register} />
                </>}
            </SectionComponent>
        </ContainerComponent>
    )
}

export default RegisterScreen