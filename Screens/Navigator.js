import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ItemScreen from "./ItemsScreens/ItemScreen";
import ListScreen from "./ListsScreen/ListScreen";
import EquipmentList from "./ListsScreen/EquipmentList";
import TypeOfEquipmentList from "./ListsScreen/TypeOfEquipment";
import TypeOfPartOfEquipmentList from "./ListsScreen/TypeOfPartOfEquipmentList";
import UsersList from "./ListsScreen/UsersList";


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
            <Stack.Screen
                name="EquipmentList"
                component={EquipmentList}
                options={{title: "Перелік обладнання"}}
            />
            <Stack.Screen
                name="TypeOfEquipmentList"
                component={TypeOfEquipmentList}
                options={{title: "Перелік типів обладнання"}}
            />
            <Stack.Screen
                name="TypeOfPartOfEquipmentList"
                component={TypeOfPartOfEquipmentList}
                options={{title: "Перелік типів запчастин"}}
            />
            <Stack.Screen
                name="UsersList"
                component={UsersList}
                options={{title: "Перелік користувачів"}}
            />
        </Stack.Navigator>
    );
};
export default Navigator
