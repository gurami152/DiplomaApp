import axios from "axios";
import {Animated, Modal, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import {BottomSheet, ListItem} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";

let React = require('react');


let isHidden = true;


class ItemScreen extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            values: null,
            fio: this.props.route.params.item.name,
            department_id: this.props.route.params.item.department.id,
            bottomMenu: false,
            STORAGE_KEY: 'id_token',
            showTheSettings: false,
            modalVisible: false,
            bounceValue: new Animated.Value(100),
            isLoading: false,
            list: [
                {
                    title: 'Повернутись назад',
                    onPress: () => {
                        this.deleteBottomSheetShow();
                        this.settingsShow();
                    },
                },
                {
                    title: 'Видалити',
                    containerStyle: {backgroundColor: 'red'},
                    titleStyle: {color: 'white'},
                    onPress: () => (this.deleteBottomSheetShow()),
                },
            ],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    deleteBottomSheetShow() {
        this.setState({
            bottomMenu: !this.state.bottomMenu
        });
    }

    modalShow() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    addFinancialResponsiblePerson() {
        let self = this;
        axios({
            method: 'post',
            url: '/user/12345',
            data: {
                name: self.state.fio,
                department_id: self.state.department_id,
            }
        }).then(function (response) {
            self.modalShow();
            self.loadData();
        });
    }


    settingsShow() {
        let toValue = 100;
        if (isHidden) {
            toValue = 0;
        }
        //This will animate the transalteX of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
                useNativeDriver: true
            }
        ).start();
        isHidden = !isHidden;
        this.setState({
            showTheSettings: !this.state.showTheSettings
        });
    }

    loadData() {
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

    render() {
        return (
            <View style={styles.main}>
                {this.state.values && this.state.modalVisible &&
                <Modal style={styles.modal}>
                    <Text style={styles.text}>Редагувати відповідальну особу</Text>
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
                            onValueChange={(itemValue, itemIndex) => this.setState({department_id: itemValue})}
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
                    <Text>ПІБ відповідальної особи</Text>
                    <Text style={styles.text}>{this.props.route.params.item.name}</Text>
                    <Text>Підрозділ</Text>
                    <Text style={styles.text}>{this.props.route.params.item.department.name}</Text>
                    <BottomSheet
                        isVisible={this.state.bottomMenu}
                        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
                    >
                        {this.state.list.map((l, i) => (
                            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </BottomSheet>
                </View>

                {this.state.showTheSettings &&
                <Animated.View
                    style={[styles.sidebar,
                        {transform: [{translateX: this.state.bounceValue}]}]}
                >
                    <TouchableOpacity style={styles.button}
                                      title="Learn More" onPress={() => {
                        this.settingsShow();
                        this.deleteBottomSheetShow();
                    }
                    }>

                        <Icon
                            name='delete'
                            size={25}
                            color='#FAFAFA'
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      title="Learn More"
                                      onPress={() => this.modalShow()}
                    >
                        <Icon
                            name='edit'
                            size={25}
                            color='#FAFAFA'
                        />

                    </TouchableOpacity>
                </Animated.View>
                }
                <TouchableOpacity style={styles.floatingButton}
                                  title="Learn More" onPress={() => this.settingsShow()}>
                    {this.state.showTheSettings ?
                        <Icon
                            name='menu-unfold'
                            size={25}
                            color='#FAFAFA'
                        />
                        : <Icon
                            name='menu-fold'
                            size={25}
                            color='#FAFAFA'
                        />
                    }
                </TouchableOpacity>
            </View>
        )
    }

}


let styles = StyleSheet.create( {
    main: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
    }
,
    modal: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        backgroundColor: '#FAFAFA',
    }
,
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#FAFAFA',
    }
,
    sidebar: {
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'column-reverse',
        width: 60,
        backgroundColor: '#000000',
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
    }
,
    input: {
        textAlign: 'center',
        color: "#FAFAFA",
        fontSize: 20,
    }
,
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
}

);

export default ItemScreen
