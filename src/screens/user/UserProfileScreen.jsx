import { useEffect, useReducer, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext";
import { ContainerComponent, PostComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { ActivityIndicator, Text } from "react-native";
import Header from "./HeaderUserProfile";
import MyContext from "../../configs/MyContext";
import userReducer from "../../reducers/userReducer";


const UserProfileScreen = ({ route}) => {
    const [state] = useAuth()
    const [posts, setPosts] = useState([])
    const [user, dispatch] = useReducer(userReducer, null)


    const id = route.params.userId

    console.info([state.accessToken, endpoints.retrieve_user(id)])

    useEffect(() => {
        const loadUser = async () => {
            try {
                let res = await authApi(state.accessToken).get(endpoints.retrieve_user(id)).then(res => res.data);
                dispatch({
                    'type': 'read',
                    'payload': {
                        user: res
                    }
                })
            } catch (error) {
                console.error(error);
            }
        };
            loadUser();
    }, [id])

    console.log(user)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                url = `${endpoints['list_posts']}?userId=${id}`
                let res = await authApi(state.accessToken).get(url);
                setPosts(res.data.results);
            } catch (error) {
                setPosts([])
            }
        };
        loadPosts();
    }, [])

    return (
        <MyContext.Provider value={{user}}>
            <ContainerComponent isScroll>
                <Header />
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