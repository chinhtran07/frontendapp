import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { RowComponent, TextComponent } from "../components";
import { appColors } from "../constants/appColors";
import { useNavigation } from "@react-navigation/native";
import { SearchNormal1 } from "iconsax-react-native";
import { TouchableOpacity } from "react-native";
import { SearchingScreen, UserProfileScreen } from "../screens";

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();

    const CustomHeader = () => {
        const navigation = useNavigation()

        return (
            <RowComponent
                styles={{
                    marginTop: 40,
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                }} >
                <TextComponent text="ALUMNI OU" size={25} color={appColors.blue} styles={{ fontWeight: 'bold' }} />
                <TouchableOpacity onPress={() => navigation.navigate('Searching')}>
                    <SearchNormal1 size={25} color="black" />
                </TouchableOpacity>
            </RowComponent>
        )
    }

    return (
        <Stack.Navigator screenOptions={{statusBarAnimation: 'slide'}}>
            <Stack.Screen
                options={{
                    header: () => <CustomHeader />
                }}
                name="Main" component={TabNavigator} />
            <Stack.Screen options={{headerShown: false}} name="Searching" component={SearchingScreen}/>
            <Stack.Screen options={{headerShown: false}} name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator;