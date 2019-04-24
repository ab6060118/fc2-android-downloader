import React from 'react'
import firebase from 'react-native-firebase';
import { Text, View, ActivityIndicator, StatusBar, StyleSheet, AsyncStorage } from 'react-native'

export default class Auth extends React.Component {
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(!user ? 'Login' : 'App')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <ActivityIndicator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});