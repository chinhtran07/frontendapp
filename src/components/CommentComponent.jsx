import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import RowComponent from "./RowComponent"
import InputComponent from "./InputComponent"
import { Edit2, Send } from "iconsax-react-native"
import { appColors } from "../constants/appColors"
import { useState } from "react"
import useAuth from "../configs/AuthContext"
import AvatarPostComponent from "./AvatarPostComponent"
import globalStyles from "../styles/globalStyles"
import SectionComponent from "./SectionComponent"
import { authApi, endpoints } from "../configs/API"
import TextComponent from "./TextComponent"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment"
import SpaceComponent from "./SpaceComponent"
import { useNavigation } from "@react-navigation/native"

const CommentComponent = ({ postId }) => {
    const [comment, setComment] = useState('')
    const [state] = useAuth()
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false)

    const addComment = async () => {
        try {
            let res = await authApi(state.accessToken).post(endpoints['add_comments'](postId), { 'content': comment });
            setComments([res.data, ...comments])
            setComment('')
            setShowComments(true)
        } catch (error) {
            console.error(error)
        }
    }

    const [showOptions, setShowOptions] = useState(false);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);

    const handleLongPress = (index) => {
        setShowOptions(true);
        setSelectedCommentIndex(index);
    };

    const handleEdit = () => {
        // Implement edit functionality
        // You can provide a function to edit the selected comment
    };

    const handleDelete = async (commentId) => {
        try {
            let res = await authApi(state.accessToken).delete(endpoints['delete_comment'](commentId))
            setComments(comments.filter(comment => comment.id !== commentId));
            setShowOptions(false)
        } catch (error) {
            console.error(error);
        }
    };

    

    return (
        <View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginBottom: 5
                }}
            />
            {comments.map((c, index) => (
                <View >
                    <RowComponent key={index}>
                        <Avatar user={c.user} />
                        <SpaceComponent width={10} />
                        <TextComponent text={c.content} />
                    </RowComponent>
                    <View style={{ position: 'relative' }}>
                        <TouchableWithoutFeedback
                            onPress={() => handleLongPress(index)}
                            onLongPress={() => handleLongPress(index)}
                            onPressOut={() => setShowOptions(false)}
                        >
                            <View>
                                <Edit2 size={25} color="black"/>
                            </View>
                        </TouchableWithoutFeedback>
                        {showOptions && selectedCommentIndex === index && (
                            <View style={styles.optionsContainer}>
                                <TouchableOpacity onPress={handleEdit}>
                                    <TextComponent text="Edit" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDelete(c.id)}>
                                    <TextComponent text="Delete" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {c.updated_date ?
                        <TextComponent text={moment(c.updated_date).fromNow()} /> :
                        <TextComponent text={moment(c.created_date).fromNow()} />
                    }
                </View>
            ))}
            {showComments &&
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 5
                    }}
                />}
            <RowComponent styles={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <Avatar user={state.user} />
                <View style={{ marginRight: 20 }}>
                    <InputComponent
                        value={comment}
                        onChange={val => setComment(val)}
                        placeholder="Bình luận của bạn"
                        multiline
                    />
                </View>
                <TouchableOpacity onPress={addComment}>
                    <Send size={30} color={appColors.blue} />
                </TouchableOpacity>
            </RowComponent>
        </View>
    )
}

const Avatar = ({ user }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: user.avatar }}
                style={[
                    globalStyles.avatar,
                    {
                        borderWidth: 1,
                        borderColor: appColors.black
                    }
                ]}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        position: 'absolute',
        top: 0,
        left: 20,
        backgroundColor: 'white',
        zIndex: 1, // Ensure options appear above other content
        elevation: 5, // For Android elevation
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
});


export default CommentComponent;