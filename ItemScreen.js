// import axios from "axios";
import {StyleSheet, View, TouchableOpacity} from "react-native";
let React = require('react');
import Icon from 'react-native-vector-icons/AntDesign';

class ItemScreen extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            showTheSettings: false,
        }
    }

    settingsShow(){
        this.setState({
            showTheSettings : !this.state.showTheSettings
        });
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.container}>

                </View>
                { this.state.showTheSettings &&
                    <View style={styles.sidebar}>
                        <TouchableOpacity style={styles.button}
                                          title="Learn More">
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
                    </View>
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
