import { Image, TouchableOpacity, View } from "react-native";
import TextComponent from "../TextComponent";
import RowComponent from "../RowComponent";
import { appColors } from "../../constants/appColors";
import globalStyles from "../../styles/globalStyles";
import moment from "moment";
import SectionComponent from "../SectionComponent";
import SpaceComponent from "../SpaceComponent";
import ButtonComponent from "../ButtonComponent";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../configs/AuthContext"
import AvatarPostComponent from "../AvatarPostComponent";

const PostComponent = ({ post }) => {
    const user = post.user
    const [state, dispatch] = useAuth()
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: appColors.white, borderRadius: 10 }}>
            <AvatarPostComponent user={user} />
            <SectionComponent>
                {post.updated_date ?
                    <TextComponent text={moment(post.updated_date).fromNow()} /> :
                    <TextComponent text={moment(post.created_date).fromNow()} />
                }
            </SectionComponent>
            <SectionComponent>
                <TextComponent text={post.content} size={20} />
            </SectionComponent>
            <SectionComponent>
                <RowComponent styles={{ justifyContent: 'space-between' }}>
                    <ButtonComponent text="Like" icon={<FontAwesome name="thumbs-up" size={20} color={post.reacted ? appColors.black : appColors.white} />} iconFlex="left" type="primary" />
                    <ButtonComponent text="Comment" icon={<FontAwesome name="comment" size={20} />} iconFlex="left" type="primary" />
                    <ButtonComponent text="Share" icon={<FontAwesome name="share" size={20} />} iconFlex="left" type="primary" />
                </RowComponent>
            </SectionComponent>
        </View>
    )
}

export default PostComponent;