import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ItemScreen from "./ItemsScreens/ItemScreen";
import ListScreen from "./ListsScreen/ListScreen";


const Stack = createStackNavigator()

const Navigator = props => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: "Вхід в систему"}}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: "Головна сторінка"}}
            />
            <Stack.Screen
                name="List"
                component={ListScreen}
                options={{title: "Перелік відповідальних осіб"}}
            />
            <Stack.Screen
                name="Item"
                component={ItemScreen}
                options={{title: "Відповідальна особа"}}
            />
        </Stack.Navigator>
    );
};
export default Navigator
