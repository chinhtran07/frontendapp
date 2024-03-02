import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import useAuth from "../../configs/AuthContext"
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import AvatarPostComponent from "../../components/AvatarPostComponent";
import globalStyles from "../../styles/globalStyles";
import { appColors } from "../../constants/appColors";

const FriendScreen = ({navigation}) => {

    const [state] = useAuth()
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const loadFriends = async () => {
            try {
                let res = await authApi(state.accessToken).get(endpoints['list_friends'])
                setFriends(res.data)
            } catch (error) {
                console.error(error)
            }
        };
        loadFriends();
    }, []);


    return (
        <ContainerComponent isScroll>
            <SpaceComponent height={10} />
            <View style={{ justifyContent: 'center',  }}>
                {friends.map(f => (
                    <SectionComponent key={f.id}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("MessageScreen", {"receiverId": f.id, "first_name": f.first_name, "last_name": f.last_name})}>
                            <RowComponent>
                                <Image source={{ uri: f.avatar }}
                                    style={[
                                        globalStyles.avatar,
                                        {
                                            borderWidth: 1,
                                            borderColor: appColors.black
                                        }
                                    ]}
                                />
                                <SpaceComponent width={10} />
                                <TextComponent text={`${f.first_name} ${f.last_name}`} size={20} />
                            </RowComponent>
                        </TouchableOpacity>
                    </SectionComponent>
                ))}
            </View>
        </ContainerComponent>
    )
}

export default FriendScreen;