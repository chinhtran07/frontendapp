import { ArrowLeft2, ArrowRight, ArrowRight2 } from "iconsax-react-native";
import { ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components"
import { appColors } from "../../constants/appColors";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { appInfos } from "../../constants/appInfos";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext";
import globalStyles from "../../styles/globalStyles";

const MessageScreen = ({ route, navigation }) => {
    const { receiverId, first_name, last_name } = route.params
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [state] = useAuth()

    useEffect(() => {
        const loadMessages = async () => {
            try {
                let url = `${endpoints['list_messages']}/?receiver_id=${receiverId}`
                let res = await authApi(state.accessToken).post(url);
                setMessages(res.data)
            } catch (error) {
                console.error(error)                
            }
        }
        loadMessages();
    }, [])


    const sendMessage = async () => {
        if (receiverId === null) 
        {
            alert("Khong the gui")
            return
        }
        try {
            const url = `${endpoints['send_message']}`
            let res = await authApi(state.accessToken).post(url, {'message': message, 'receiver_id': receiverId});
            setMessages([...messages, message])
            setMessage('')
        } catch (error) {
            console.error(error)
        }
    };


    return (
        <ContainerComponent>
            <SectionComponent styles={{ width: appInfos.sizes.WIDTH, height: 40, backgroundColor: appColors.button, paddingTop: 5 }}>
                <RowComponent styles={{ position: 'relative', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0, top: 0 }}>
                        <ArrowLeft2 size={30} color={appColors.blue} />
                    </TouchableOpacity>
                    <TextComponent text={`${first_name} ${last_name}`} size={30} styles={{ position: 'absolute', left: appInfos.sizes.WIDTH / 2 - 70, top: 0 }} />
                </RowComponent>
            </SectionComponent>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginBottom: 5
                }}
            />
            <View style={{ flex: 3 }}>
                <ContainerComponent isScroll styles={{ flex: 2 }}>
                    {messages.map((m, index) => (
                        <SectionComponent key={index} styles={{alignItems: 'flex-end'}}>
                            <RowComponent>
                                <TextComponent text={m} size={20} />
                                <Image source={{ uri: state.user.avatar }}
                                    style={[
                                        globalStyles.avatar,
                                        {
                                            borderWidth: 1,
                                            borderColor: appColors.black
                                        }
                                    ]}
                                />
                            </RowComponent>
                        </SectionComponent>
                    ))}
                </ContainerComponent>
                <SectionComponent>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginBottom: 5
                        }}
                    />
                    <RowComponent styles={{ marginHorizontal: 40 }}>
                        <InputComponent value={message} onChange={value => setMessage(value)} placeholder="Nội dung tin nhắn" />
                        <SpaceComponent width={5} />
                        <TouchableOpacity onPress={() => sendMessage()}>
                            <ArrowRight2 size={25} color={appColors.black} />
                        </TouchableOpacity>
                    </RowComponent>
                </SectionComponent>
            </View>
        </ContainerComponent>
    )
}

export default MessageScreen;