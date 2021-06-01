import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

let React = require('react');

class EquipmentList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            STORAGE_KEY: 'id_token',
            isLoading: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true})
        const value = AsyncStorage.getItem(this.state.STORAGE_KEY);
        fetch("http://192.168.1.101:8081/api/equipment/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': value,
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    financial: responseData
                });
            }).finally(() => this.setState({isLoading: false}))
    }

    renderRow = ({item}) => {
        return (
            <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.push('Item', {
                        item: item,
                    });
                }}>
                    <Text>{item.inventoryNumber}</Text>
                    <Text>{item.typeOfEquipment_id}</Text>
                    <Text>{item.status_id}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.financial}
                        renderItem={this.renderRow}
                        refreshing={this.state.isLoading}
                        onRefresh={this.loadData}
                    />
                </View>
            </View>
        )
    }
}


let styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#FAFAFA',
    },
    sidebar: {
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'column-reverse',
        width: 60,
        backgroundColor: '#000000',
    },
    floatingButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#37399a",
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: {height: 1, width: 1}, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    button: {
        left: 10,
        bottom: -60,
        marginBottom: 10,
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#5b5b63",
        alignItems: 'center',
        justifyContent: "center",
    },
    input: {
        textAlign: 'center',
        color: "#FAFAFA",
        fontSize: 20,
    }
});

export default EquipmentList
