import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ShouYe from './components/shouye';
import PersonCenter from './components/person-center';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ShouYe/>
                <PersonCenter/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});