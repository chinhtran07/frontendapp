import { TouchableOpacity, View } from "react-native";
import TextComponent from "../TextComponent";
import RowComponent from "../RowComponent";
import { appColors } from "../../constants/appColors";
import moment from "moment";
import SectionComponent from "../SectionComponent";
import ButtonComponent from "../ButtonComponent";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AvatarPostComponent from "../AvatarPostComponent";
import { useState } from "react";
import CommentComponent from "../CommentComponent";
import SpaceComponent from "../SpaceComponent";
import { ArrowDown, ArrowDown2, Edit2 } from "iconsax-react-native";

const PostComponent = ({ post }) => {
    const user = post.user

    const [showInputComment, setShowInputComment] = useState(false);

    return (
        <View style={{ backgroundColor: appColors.white, borderRadius: 10 }}>
            <RowComponent styles={{position: 'relative'}}>
                <AvatarPostComponent user={user} />
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 0}}>
                    <Edit2 size={20} color={appColors.black} />
                </TouchableOpacity>
            </RowComponent>
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
                    <ButtonComponent text="Comment" icon={<FontAwesome name="comment" size={20} />} iconFlex="left" type="primary" onPress={() => setShowInputComment(!showInputComment)} />
                    <ButtonComponent text="Share" icon={<FontAwesome name="share" size={20} />} iconFlex="left" type="primary" />
                </RowComponent>
            </SectionComponent>
            {showInputComment &&
                <>
                    <RowComponent>
                        <TextComponent text="Bình luận " />
                        <ArrowDown2 size={20} color={appColors.black} />
                    </RowComponent>
                    <SpaceComponent height={10} />
                    <CommentComponent postId={post.id} />
                </>
            }
        </View>
    )
}

export default PostComponent;