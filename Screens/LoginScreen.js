// import axios from "axios";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
let React = require('react');
import AsyncStorage from '@react-native-community/async-storage'
import Icon from "react-native-vector-icons/AntDesign";

class LoginScreen extends React.Component {

    constructor(props){
        super(props)

    this.state = {
        username: '',
        email: '',
        password: '',
        STORAGE_KEY : 'id_token',
        error: false,
        }
    }

    async _onValueChange(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    apiCall() {
        let self = this;
        // if validation fails, value will be null
        fetch("http://192.168.1.101:3000/api/auth/signin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(res => {
                self.props.navigation.navigate('Home', {
                        name: res.username,
                        role: res.roles,
                    }
                );
                self._onValueChange(self.state.STORAGE_KEY, res.accessToken);
                })
            .catch ((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Логін</Text>
                <TextInput style={styles.textInput}
                           autoCapitalize="none"
                           onChangeText={(text) => this.setState({email:text})}
                />
                <Text style={styles.text}>Пароль</Text>
                <TextInput secureTextEntry={true} style={styles.textInput}
                           autoCapitalize="none"
                           onChangeText={(text) => this.setState({password:text})}
                />
                {this.state.error &&
                    <Text style={styles.errorMessage}>Неправильний логін чи пароль</Text>
                }
                <TouchableOpacity style={styles.button}
                                  title="Learn More" onPress={() => this.apiCall()}>
                    <Text style={styles.input}>Авторизуватися</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
    textInput: {
        borderColor:'#181616',
        borderWidth: 1,
        fontSize: 15,
    },
    errorMessage: {
        borderColor:'#ba0707',
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#37399a",
        padding: 10,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    input: {
        textAlign:'center',
        color: "#FAFAFA",
        fontSize: 20,
    }
});

export default LoginScreen
