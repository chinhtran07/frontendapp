import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext"
import { ContainerComponent, PostComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { ActivityIndicator } from "react-native";
import Header from "./Header";


const UserProfileScreen = ({ route }) => {

    const [state, dispatch] = useAuth()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    const id = route.params.userId

    useEffect(() => {
        const getUser = async () => {
            try {
                let res = await authApi(state.accessToken).get(endpoints['retrieve-user'](id));
                setUser(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, [])


    useEffect(() => {
        const loadPosts = async () => {
            try {
                url = endpoints['list-posts'] + `?userId=${id}`
                let res = await authApi(state.accessToken).get(url);
                setPosts(res.data.results);
            } catch (error) {
                setPosts([])
            }
        };
        loadPosts();
    }, [])

    return (
        <ContainerComponent isScroll>
            <Header user={user}/>
            <SpaceComponent height={10} />
            <TextComponent text="Bài viết" size={24} styles={{paddingBottom: 10, fontWeight: '400'}} />
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
    )
}

export default UserProfileScreen;