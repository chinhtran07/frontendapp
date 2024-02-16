import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { HomeScreen } from "../screens";

const TabNavigator = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;