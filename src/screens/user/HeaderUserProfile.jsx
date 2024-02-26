import { useContext, useEffect, useState } from 'react';
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { appInfos } from '../../constants/appInfos';
import MyContext from '../../configs/MyContext';
import { ArrowLeft } from 'iconsax-react-native';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authApi, endpoints } from '../../configs/API';
import useAuth from "../../configs/AuthContext";


const Header = () => {
    const { userId } = useContext(MyContext)
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [state] = useAuth()


    useEffect(() => {
        const loadUser = async () => {
            try {
                let url = endpoints['retrieve_user'](userId);
                let res = await authApi(state.accessToken).get(url);
                setUser(res.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        loadUser();
    }, [])

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: appColors.white, borderRadius: 10 }}>
            <Image
                source={user.cover_image === null ? require('../../assets/images/background.png') : { uri: user.cover_image }}
                resizeMode='contain'
                width={appInfos.sizes.WIDTH}
                height={150}
                borderRadius={20}
                borderColor={appColors.black}
                style={{
                    borderWidth: 1
                }}
            />
            <SpaceComponent height={10} />
            <RowComponent>
                <Image
                    source={user.avatar === null ? require('../../assets/images/avatar.jpg') : { uri: user.avatar }}
                    resizeMode='cover'
                    width={60}
                    height={60}
                    borderRadius={50}
                    style={{ borderColor: appColors.black, borderWidth: 2 }}
                />
                <SectionComponent styles={{ paddingLeft: 10 }}>
                    <TextComponent text={`${user.last_name} ${user.first_name}`} styles={{
                        fontWeight: 'bold',
                        fontSize: 20
                    }} />
                    <TextComponent text='Sinh viên' />
                </SectionComponent>
                <ButtonComponent
                    text='Kết bạn'
                    onPress={() => { }}
                    type='primary'
                    color='#D9D5D5'
                    textColor={appColors.blue}
                    textStyles={{ fontWeight: '500' }}
                />
            </RowComponent>
        </View>
    )
}

export default Header;