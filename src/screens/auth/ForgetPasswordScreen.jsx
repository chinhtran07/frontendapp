import { useState } from "react";
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from "../../components"
import { ActivityIndicator, Alert } from "react-native";
import API, { endpoints } from "../../configs/API";

const ForgetPasswordScreen = (navigation) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const forgetPassword = async () => {
        setLoading(true)

        if (!email) {
            Alert.alert("Warning", "Vui lòng nhập email")
            return;
        }

        try {
            let res = await API.post(endpoints['forget_password'], {
                "email": email,
            });
            if (res.status === 204)
                navigation.navigate("LoginScreen");
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                Alert.alert("Warning", "Email không tồn tại");
            } else {
                // Handle other errors
                console.error("An error occurred:", ex.message);
            }
        } finally {
            setLoading(false)
        }


    }

    return (
        <ContainerComponent>
            <SectionComponent styles={{ paddingHorizontal: 10 }}>
                <TextComponent text="Vui lòng nhập email đã đăng ký" title />
                <InputComponent type='email-address' value={email} onChange={(val) => setEmail(val)} placeholder="Email" />
                <ButtonComponent text="Gửi" type="primary" onPress={forgetPassword} />
                {loading ? <ActivityIndicator /> : ""}
            </SectionComponent>
        </ContainerComponent>
    )
}

export default ForgetPasswordScreen;