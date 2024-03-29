import { useEffect, useState } from "react";
import { ContainerComponent, PostComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import useAuth from "../../configs/AuthContext";
import Header from "./components/Header"
import { authApi, endpoints } from "../../configs/API";
import { ActivityIndicator } from "react-native";


const ProfileScreen = () => {

    const [state, dispatch] = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                url = `${endpoints['list_posts']}?userId=${state.user.id}` 
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
            <Header user={state.user}/>
            <SpaceComponent height={10}/>
            <TextComponent text="Bài viết" size={24} styles={{paddingBottom: 10, fontWeight: '400'}} />
            {posts === null ? <ActivityIndicator /> :
                (
                    (posts).map(p => (
                        <SectionComponent key={p.id} styles={{paddingHorizontal: 10}}>
                            <PostComponent post={p} />
                        </SectionComponent>
                    ))
                )
            }
        </ContainerComponent>
    )
}

export default ProfileScreen;