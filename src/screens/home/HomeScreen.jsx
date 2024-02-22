import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, PostComponent } from "../../components";
import useAuth from "../../configs/AuthContext";
import { appColors } from "../../constants/appColors";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import * as ImagePicker from 'expo-image-picker';


const HomeScreen = ({ navigation }) => {

    const [state, dispatch] = useAuth();
    const user = state.user
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);
    const [haveImage, setHaveImage] = useState(false)
    const [images, setImages] = useState([]);

    const addPost = async () => {
        if (content === "") {
            !isEmpty ? setIsEmpty(!isEmpty) : setIsEmpty(isEmpty);
            return;
        }

        try {
            const form = new FormData();
            images.forEach((image, index) => {
                form.append('images[]', {
                    uri: image.uri,
                    name: image.name,
                    type: image.mimeType
                })
            })
            form.append('content', content);
            let res = await authApi(state.accessToken).post(endpoints['add-posts'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            alert("Thêm bài viết thành công")
            isEmpty ? setIsEmpty(!isEmpty) : setIsEmpty(isEmpty);
            setImages([])
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required!');
            }
        }
        )();
    }, []);

    const picker = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 1
            })
            if (!result.canceled) {
                const selectedImages = result.selected.map((image) => image.assets[0]);
                setHaveImage(!haveImage);
                setImages(selectedImages);
            }
        } catch (ex) {
            console.log('Error selecting image:', ex)
            setImages([])
        }
    }

    useEffect(() => {
        const loadPosts = async () => {
            try {
                let res = await authApi(state.accessToken).get(endpoints['list-random-posts']);
                setPosts(res.data);
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
                {isEmpty && !haveImage ? <TextComponent text="Vui lòng nhập nội dung" color={appColors.warning} size={15} /> : <></>}
                <SectionComponent>
                    
                </SectionComponent>
                <ButtonComponent text="Chọn ảnh" type="primary" onPress={picker} />
                <SpaceComponent height={10} />
                <ButtonComponent text="Đăng" type="primary" onPress={addPost} />
            </SectionComponent>
            <SpaceComponent height={10} />
            {posts === null ? <ActivityIndicator /> :
                (
                    (posts).map(p => (
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