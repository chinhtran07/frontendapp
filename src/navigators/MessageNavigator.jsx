import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FriendScreen, MessageScreen } from "../screens";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useAuth from "../configs/AuthContext"
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../configs/API";
import globalStyles from "../styles/globalStyles";
import { appColors } from "../constants/appColors";
import { TextComponent } from "../components";

const MessageNavigator = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    

    return (
        <Stack.Navigator initialRouteName="FriendScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="FriendScreen" component={FriendScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
        </Stack.Navigator>
    )
}
export default MessageNavigator;