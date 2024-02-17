import { ActivityIndicator, Alert, Button, Image, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import useAuth from "../../configs/AuthContext";
import { appColors } from "../../constants/appColors";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import PostComponent from "../../components/PostComponent";

const HomeScreen = ({ navigation }) => {

    const [state, dispatch] = useAuth();
    const user = state.user
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);

    const addPost = async () => {
        if (content === "") {
            isEmpty == false ? setIsEmpty(!isEmpty) : setIsEmpty(isEmpty);
            return;
        }
        let data = {
            "content": content
        }
        try {
            let res = await authApi(state.accessToken).post(endpoints['add-posts'], data)
            Alert.alert("thêm bài viết thành công")
            isEmpty ? setIsEmpty(!isEmpty) : setIsEmpty(isEmpty);
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        const loadPosts = async () => {
            try {
                let res = await authApi(state.accessToken).get(endpoints['posts']);
                setPosts(res.data.results);
            } catch (error) {
                setPosts([])
                console.error(error)
            }
        };
        loadPosts();
    }, [])

    return (
        <ContainerComponent isScroll>
            <SectionComponent
                styles={{
                    backgroundColor: appColors.white,
                    borderRadius: 20,
                    marginTop: 10,
                }}>
                <RowComponent
                    styles={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: 50,
                        paddingTop: 10
                    }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Image source={{ uri: user.avatar }} width={50} height={50} resizeMode='cover' borderRadius={50} />
                    </TouchableOpacity>
                    <SpaceComponent width={5} />
                    <InputComponent value={content} onChange={val => setContent(val)} placeholder="Nội dung bài viết" multiline={true} />
                </RowComponent>
                {isEmpty ? <TextComponent text="Vui lòng nhập nội dung" color={appColors.warning} size={15} /> : <></>}
                <ButtonComponent text="Đăng" type="primary" onPress={addPost} />
            </SectionComponent>
            <SpaceComponent height={10}/>
            {posts === null ? <ActivityIndicator /> :
                (
                    posts.map(p => (
                        <SectionComponent key={p.id}>
                            <PostComponent post={p} />
                        </SectionComponent>
                    ))
                )
            }
        </ContainerComponent >
    )
};

export default HomeScreen;