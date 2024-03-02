import { useEffect, useState } from "react";
import { ContainerComponent, SectionComponent, TextComponent } from "../../components"
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext";
import moment from "moment";
import { appColors } from "../../constants/appColors";
import { appInfos } from "../../constants/appInfos";

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([])
    const [state] = useAuth()

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                let res = await authApi(state.accessToken).get(endpoints['list_notifications']);
                setNotifications(res.data)
            } catch (error) {
                console.error
            }
        }
        loadNotifications();
    }, [])
    return (
        <ContainerComponent isScroll>
            {notifications.map(notice => (
                <SectionComponent key={notice.id} styles={{backgroundColor: appColors.white, width: appInfos.sizes.WIDTH, borderRadius: 20}}>
                    <TextComponent text={`${notice.content}`} size={25}/>
                    <TextComponent text={moment(notice.created_date).fromNow()} />
                </SectionComponent>
            ))}
        </ContainerComponent>
    )
}

export default NotificationScreen;