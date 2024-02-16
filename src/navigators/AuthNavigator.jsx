import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForgetPasswordScreen, LoginScreen, RegisterScreen } from "../screens";

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;