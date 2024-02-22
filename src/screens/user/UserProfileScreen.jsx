import { useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext"
const UserProfileScreen = ({ userId }) => {

    const [state, dispatch] = useAuth()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    {
        async () => {
            try {
                setUser(await authApi(state.accessToken).get(endpoints['retrieve-user'](userId)).then(res => res.data));
            } catch (error) {
                console.error(error);
            }
        }
    }

    
}

export default UserProfileScreen;