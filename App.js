import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React  from "react";
import Navigator from "./Screens/Navigator";


export default function App() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Navigator/>
        </NavigationContainer>
    );
}
