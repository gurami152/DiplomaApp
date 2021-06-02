import {FlatList, Modal, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";

let React = require('react');

class ListScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            STORAGE_KEY: 'id_token',
            isLoading: false,
            modalVisible: false,
            department_id: 1,
        }
    }

    componentDidMount() {
        this.loadData();
        this.loadDepartments();
    }

    modalShow() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    async addFinancialResponsiblePerson() {
        console.log(this.state.department_id)
            let self = this;
            const rawResponse = await fetch('http://192.168.1.101:3000/api/financial/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name: this.state.fio,
                    department_id: this.state.department_id,
                })
            })
            const content = await rawResponse;
            if(content) {
                self.modalShow();
                self.loadData();
            }
    }

    loadData = () => {
        this.setState({isLoading: true})
        const value = AsyncStorage.getItem(this.state.STORAGE_KEY);
        fetch("http://192.168.1.101:3000/api/financial/all", {
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

    loadDepartments() {
        this.setState({isLoading: true})
        const value = AsyncStorage.getItem(this.state.STORAGE_KEY);
        fetch("http://192.168.1.101:3000/api/department/all", {
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
                    values: responseData
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
                    <Text>{item.name}</Text>
                    <Text>{item.department.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main}>
                {this.state.values && this.state.modalVisible &&
                <Modal style={styles.modal}>
                    <Text style={styles.text}>Додати відповідальну особу</Text>
                    <View style={styles.container}>
                        <Text style={styles.text}>ПІБ</Text>
                        <TextInput style={styles.textInput}
                                   autoCapitalize="none"
                                   onChangeText={(text) => this.setState({fio: text})}
                                   value={this.state.fio}
                        />
                        <Text style={styles.text}>Підрозділ</Text>
                        <Picker
                            selectedValue={this.state.department_id}
                            style={{height: 50, width: 150}}
                            onValueChange={(itemValue, itemIndex) => {this.setState({department_id: itemValue});console.log(itemValue);}}
                        >
                            {this.state.values.map((item) => (
                                <Picker.Item label={item.name} value={item.id} key={item.id}/>
                            ))}
                        </Picker>
                        <TouchableOpacity style={styles.floatingButtonClose}
                                          title="Learn More"
                                          onPress={() => this.modalShow()}
                        >
                            <Icon
                                name='close'
                                size={25}
                                color='#FAFAFA'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.floatingButtonDone}
                                          title="Learn More"
                                          onPress={() => this.addFinancialResponsiblePerson()}
                        >
                            <Icon
                                name='check'
                                size={25}
                                color='#FAFAFA'
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
                }
                <View style={styles.container}>
                    <FlatList
                        data={this.state.financial}
                        renderItem={this.renderRow}
                        refreshing={this.state.isLoading}
                        onRefresh={this.loadData}
                    />
                    <TouchableOpacity style={styles.floatingButtonAdd}
                                      title="Learn More"
                                      onPress={() => this.modalShow()}
                    >
                        <Icon
                            name='plus'
                            size={25}
                            color='#FAFAFA'
                        />
                    </TouchableOpacity>
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
    floatingButtonAdd: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#189934",
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
    }
    ,
    floatingButtonClose: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#991818",
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
    }
    ,
    floatingButtonDone: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#189934",
        position: 'absolute',
        bottom: 70,
        right: 10,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: {height: 1, width: 1}, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    }
    ,
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
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    }
    ,
    textInput: {
        borderColor: '#181616',
        borderWidth: 1,
        fontSize: 15,
    }
    ,
});

export default ListScreen
