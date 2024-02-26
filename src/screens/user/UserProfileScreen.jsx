import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext";
import { ContainerComponent, PostComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import Header from "./HeaderUserProfile";
import MyContext from "../../configs/MyContext";
import { ArrowLeft } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";


const UserProfileScreen = ({ route, navigation }) => {
    const [state] = useAuth()
    const [posts, setPosts] = useState([])


    const { userId } = route.params

    console.info([state.accessToken, endpoints.retrieve_user(userId)])

    useEffect(() => {
        const loadPosts = async () => {
            try {
                url = `${endpoints['list_posts']}?userId=${userId}`
                let res = await authApi(state.accessToken).get(url);
                setPosts(res.data.results);
            } catch (error) {
                setPosts([])
            }
        };
        loadPosts();
    }, [])


    return (
        <MyContext.Provider value={{ "userId": userId }}>
            <ContainerComponent isScroll>
                <SectionComponent styles={{ paddingTop: 30 }}>
                    <RowComponent styles={{ justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowLeft size={30} color={appColors.black} />
                        </TouchableOpacity>
                        <TextComponent text="Thông tin chi tiết" size={30} />
                    </RowComponent>
                </SectionComponent>
                {/* <Header /> */}
                <SpaceComponent height={10} />
                <TextComponent text="Bài viết" size={24} styles={{ paddingBottom: 10, fontWeight: '400' }} />
                {posts === null ? <ActivityIndicator /> :
                    (
                        (posts).map(p => (
                            <SectionComponent key={p.id} styles={{ paddingHorizontal: 10 }}>
                                <PostComponent post={p} />
                            </SectionComponent>
                        ))
                    )
                }
            </ContainerComponent>
        </MyContext.Provider>
    )
}

export default UserProfileScreen;