import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View>
                <Text>启动页</Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                    title='进入首页'
                ></Button>
            </View>
        );
    }
};