import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { HomeScreen, MessageScreen, NotificationScreen, ProfileScreen } from "../screens";
import SettingNavigator from "./SettingNavigator";
import { Home, Messages, Notification, Profile2User, Setting2 } from "iconsax-react-native";

const TabNavigator = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon, variant;

                    switch (route.name) {
                        case "Home":
                            variant = focused ? 'Bold' : 'Outline'
                            icon = <Home color={color} size={size} />
                            break;
                        case "Profile":
                            variant = focused ? 'Bold' : 'Outline'
                            icon = <Profile2User color={color} size={size} />
                            break;
                        case "Message":
                            variant = focused ? 'Bold' : 'Outline'
                            icon = <Messages color={color} size={size} />
                            break;
                        case "Notification":
                            variant = focused ? 'Bold' : 'Outline'
                            icon = <Notification color={color} size={size} />
                            break;
                        default:
                            variant = focused ? 'Bold' : 'Outline'
                            icon = <Setting2 color={color} size={size} />
                            break;
                    }

                    return icon;
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Message" component={MessageScreen} />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen name="Setting" component={SettingNavigator} />
        </ Tab.Navigator>
    )
}

export default TabNavigator;