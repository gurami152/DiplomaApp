import {ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, Text, View, TextInput} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
var React = require('react');

class HomeScreen extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            STORAGE_KEY : 'id_token',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Text >{this.props.route.params.role}</Text>*/}
                {/*<Text>{this.props.route.params.name}</Text>*/}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.input} onPress={() => this.props.navigation.navigate('EquipmentList')}>Обладнання</Text>
                    </TouchableOpacity>
                    {/*{ this.props.route.params.role === 'admin' &&*/}
                        <TouchableOpacity style={styles.button} >
                        <Text style={styles.input}>Типи обладнання</Text>
                        </TouchableOpacity>
                     {/*}*/}

                </View>
                <View style={styles.row}>
                    {/*{this.props.route.params.role === 'admin' &&*/}
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.input}>Запчастини</Text>
                        </TouchableOpacity>
                    {/*}*/}
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('List')}>
                        <Text style={styles.input}>Типи запчастин</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('List')}>
                        <Text style={styles.input}>Відповідальні особи</Text>
                    </TouchableOpacity>
                    {/*{this.props.route.params.role === 'admin' &&*/}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.input}>Підрозділи</Text>
                    </TouchableOpacity>
                    {/*}*/}
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('List')}>
                        <Text style={styles.input}>Статуси обладання</Text>
                    </TouchableOpacity>
                    {/*{this.props.route.params.role === 'admin' &&*/}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.input}>Користувачі</Text>
                    </TouchableOpacity>
                    {/*}*/}

                </View>

            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        margin: 10,
        width: 150,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#37399a",
        padding: 5,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 5, // Android
    },
    input: {
        textAlign:'center',
        color: "#FAFAFA",
        fontSize: 20,
    }
});

export default HomeScreen
