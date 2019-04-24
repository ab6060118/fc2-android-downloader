import React from 'react'
import { Text, View, ActivityIndicator, StatusBar, StyleSheet, Button, AsyncStorage } from 'react-native'
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };
    constructor() {
        super()
        this.handleLoginPress = this.handleLoginPress.bind(this)
    }

    async handleLoginPress() {
        try {
            // add any configuration settings here:
            await GoogleSignin.configure({
                webClientId: '727189310307-t2i746vhrgldbva1ntplgsuvt000p272.apps.googleusercontent.com',
            });

            const data = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
        } catch (e) {
            console.error(e);
        }

        // this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <Button title="Sign in!" onPress={this.handleLoginPress} />
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