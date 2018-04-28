import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import NavigationActions from 'react-navigation/src/NavigationActions';

const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get("window");

export default class AdView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: 3
        };
        this.nestScreen = this.nestScreen.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                let time = this.state.time;
                if (time === 0) {
                    this.nestScreen();
                } else {
                    time = time - 1;
                    this.setState({time: time});
                }
            }, 1000
        );
    }

    componentWillUnmount() {
        if (__DEV__) {
            console.log('fan', "call        componentWillUnmount");
        }
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.img}
                    source={this.props.img}>
                    <Text style={styles.text}>{this.state.time}</Text>
                    <TouchableOpacity style={styles.textB} activeOpacity={0.8} onPress={() => {
                        this.nestScreen();
                    }}>
                        <Text style={{fontSize: 14, color: '#333'}}>跳过</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );
    }

    nestScreen() {
        this.props.navigation.navigate('Home');
        this.props.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Home'}),
                ],
            })
        );
        this.timer && clearTimeout(this.timer);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: SCREEN_W,
        height: SCREEN_H,
    },
    text: {
        width: 50,
        height: 25,
        color: '#333',
        backgroundColor: '#ccc',
        fontSize: 16,
        paddingLeft: 20,
        margin: 10,
        paddingTop: 1
    },
    textB: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 50,
        height: 25,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    }
});