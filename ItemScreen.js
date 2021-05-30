// import axios from "axios";
import {StyleSheet, View, Text, FlatList,  TouchableOpacity, Animated} from "react-native";
let React = require('react');
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-community/async-storage";
import { BottomSheet, ListItem } from 'react-native-elements';


let isHidden = true;



class ItemScreen extends React.Component {


    constructor(props){
        super(props)

        this.state = {
            bottomMenu: false,
            STORAGE_KEY : 'id_token',
            showTheSettings: false,
            bounceValue: new Animated.Value(100),
            financial: {},
            isLoading: false,
            list : [
                { title: 'Повернутись назад',
                    onPress: () =>{
                        this.deleteBottomSheetShow();
                        this.settingsShow();
                    },
                },
                {   title: 'Видалити',
                    containerStyle: { backgroundColor: 'red' },
                    titleStyle: { color: 'white' },
                    onPress: () =>(this.deleteBottomSheetShow()),
                },
            ],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({ isLoading: true})
        const value = AsyncStorage.getItem(this.state.STORAGE_KEY);
        fetch("http://192.168.1.101:8081/api/financial/all", {
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
                    financial : responseData
                });
            }).finally(() => this.setState({ isLoading: false}))
    }

    deleteBottomSheetShow() {
        this.setState({
            bottomMenu : !this.state.bottomMenu
        });
    }

    settingsShow(){
        let toValue = 100;
        if(isHidden) {
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
            showTheSettings : !this.state.showTheSettings
        });
    }

    // renderRow = ({item}) => {
    //     return (
    //         <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
    //             <TouchableOpacity>
    //                 <Text>{item.name}</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <Text>{this.props.route.params.item.name}</Text>
                    <BottomSheet
                        isVisible={this.state.bottomMenu}
                        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                    >
                        {this.state.list.map((l, i) => (
                            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </BottomSheet>
                    {/*<FlatList*/}
                    {/*    data={this.state.financial}*/}
                    {/*    renderItem={this.renderRow}*/}
                    {/*    refreshing={this.state.isLoading}*/}
                    {/*    onRefresh={this.loadData}*/}
                    {/*/>*/}
                </View>

                { this.state.showTheSettings &&
                <Animated.View
                    style={[styles.sidebar,
                        {transform: [{translateX: this.state.bounceValue}]}]}
                >
                    <TouchableOpacity style={styles.button}
                                      title="Learn More" onPress={() => {
                                          this.settingsShow();
                                          this.deleteBottomSheetShow();}
                                      }>

                        <Icon
                            name='delete'
                            size={25}
                            color='#FAFAFA'
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      title="Learn More">
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
                    { this.state.showTheSettings ?
                        <Icon
                            name='menu-unfold'
                            size={25}
                            color='#FAFAFA'
                        />
                        :  <Icon
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


let styles = StyleSheet.create({
    main: {
        flex:1,
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
        shadowOffset: { height: 1, width: 1 }, // IOS
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
        textAlign:'center',
        color: "#FAFAFA",
        fontSize: 20,
    }
});

export default ItemScreen
