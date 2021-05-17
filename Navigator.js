import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ItemScreen from "./ItemScreen";


const Stack = createStackNavigator()

const Navigator = props => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: "Login Page"}}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: "Home Page"}}
            />
            <Stack.Screen
                name="Item"
                component={ItemScreen}
                options={{title: "Item Page"}}
            />
        </Stack.Navigator>
    )
}
export default Navigator
