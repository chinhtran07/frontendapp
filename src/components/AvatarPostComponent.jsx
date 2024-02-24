import { Image, TouchableOpacity, View } from "react-native"
import RowComponent from "./RowComponent"
import { useNavigation } from "@react-navigation/native"
import globalStyles from "../styles/globalStyles"
import SpaceComponent from "./SpaceComponent"
import TextComponent from "./TextComponent"
import SectionComponent from "./SectionComponent"
import { appColors } from "../constants/appColors"

const AvatarPostComponent = ({ user }) => {
    const [state, dispatch] = useAuth()
    const navigation = useNavigation()


    return (
        <TouchableOpacity
            onPress={() => (user.id === state.user.id ?
                navigation.navigate('Profile') :
                navigation.navigate('UserProfile', { userId: user.id })
            )}>
            <RowComponent>
                <Image source={{ uri: user.avatar }}
                    style={[
                        globalStyles.avatar,
                        {
                            borderWidth: 1,
                            borderColor: appColors.black
                        }
                    ]}
                />
                <SpaceComponent width={10} />
                <TextComponent text={`${user.first_name} ${user.last_name}`} size={20} />
            </RowComponent>
        </TouchableOpacity>
    )
}

export default AvatarPostComponent;