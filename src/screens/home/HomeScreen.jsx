import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, PostComponent, AddSurveyComponent, CustomDropDownPicker, SurveyComponent } from "../../components";
import useAuth from "../../configs/AuthContext";
import { appColors } from "../../constants/appColors";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, ArrowRight } from "iconsax-react-native";


const HomeScreen = ({ navigation }) => {

    const [state, dispatch] = useAuth();
    const user = state.user
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);
    const [haveImage, setHaveImage] = useState(false)
    const [images, setImages] = useState([]);
    const [types, setTypes] = useState([
        { label: 'Post', value: 1 },
        { label: 'Survey', value: 2 },
        { label: 'Invitation', value: 3 }
    ])
    const [showTypeValue, setShowTypeValue] = useState(1)
    const [value, setValue] = useState(1)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1);
    const [surveys, setSurveys] = useState(null)

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
            let updatedPosts = [...posts];
            updatedPosts.unshift(res.data);
            setPosts(updatedPosts);
            isEmpty ? setIsEmpty(!isEmpty) : setIsEmpty(isEmpty);
            setContent('');
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
    const loadPosts = async () => {
        try {
            let url = `${endpoints['list_random_posts']}?page=${page}`
            let res = await authApi(state.accessToken).get(url);
            setPosts(res.data.results);
            setMaxPage(Math.ceil(res.data.count / 10));
        } catch (error) {
            setPosts([])
            console.error(error)
        }
    };
    const loadSurveys = async () => {
        try {
            let url = `${endpoints['list_surveys']}?page=${page}`
            let res = await authApi(state.accessToken).get(url);
            setSurveys(res.data.results);
            setMaxPage(Math.ceil(res.data.count / 10));
        } catch (error) {
            setSurveys(null)
            console.error(error)
        }
    }

    useEffect(() => {
        switch (showTypeValue) {
            case 1:
                loadPosts();
                break;
            case 2:
                loadSurveys();
                break;
            default:
                break;
        }
    }, [page, showTypeValue])

    const goToPreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, maxPage));
    };

    return (
        <ContainerComponent isScroll>
            {user.role === 3 ? (
                <CustomDropDownPicker
                    items={types}
                    setItems={setTypes}
                    selectedValue={value}
                    setSelectedValue={setValue}
                />
            ) : <></>}
            {value === 1 ? (
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
                            <Image source={user.avatar === null ? require("../../assets/images/avatar.jpg") : { uri: user.avatar }} width={50} height={50} resizeMode='cover' borderRadius={50} />
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
            ) : value === 2 ? (
                <AddSurveyComponent />
            ) : (
                <></>
            )}
            <SpaceComponent height={10} />
            <CustomDropDownPicker
                items={types}
                setItems={setTypes}
                selectedValue={showTypeValue}
                setSelectedValue={setShowTypeValue}
            />
            <RowComponent styles={{ justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={goToPreviousPage}>
                    <RowComponent>
                        <ArrowLeft size={25} color={appColors.blue} />
                        <TextComponent text="Trang trước" />
                    </RowComponent>
                </TouchableOpacity>
                <TextComponent text={`Trang ${page}/${maxPage}`} />
                <TouchableOpacity onPress={goToNextPage}>
                    <RowComponent>
                        <TextComponent text="Trang sau" />
                        <ArrowRight size={25} color={appColors.blue} />
                    </RowComponent>
                </TouchableOpacity>
            </RowComponent>
            {showTypeValue === 1 &&
                (posts === null ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <SpaceComponent height={10} />
                        {posts.map(p => (
                            <SectionComponent key={p.id}>
                                <PostComponent post={p} />
                            </SectionComponent>
                        ))}
                    </>
                ))
            }
            {showTypeValue === 2 &&
                (surveys === null ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <SpaceComponent height={10} />
                        {surveys.map(s => (
                            <SectionComponent key={s.id}>
                                <SurveyComponent survey={s} />
                            </SectionComponent>
                        ))}
                    </>
                ))}
        </ContainerComponent >
    )
};

export default HomeScreen;