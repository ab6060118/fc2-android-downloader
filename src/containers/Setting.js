import React from 'react'
import { Text, TextInput, View, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'

export default class Setting extends React.Component {
    constructor() {
        super()

        this.state = {
            nas: undefined,
            username: undefined,
            password: undefined,
        }

        this.fetchData = this.fetchData.bind(this)
        this.putData = this.putData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    handleInputChange = (name) => ({text}) => {
        this.setState({ [name]: text })
    }

    handleInputBluer = (name) => (e) => {
        this.putData(name, e.nativeEvent.text)
    }

    async fetchData() {
        let nas = await AsyncStorage.getItem('nas')
        let username = await AsyncStorage.getItem('username')
        let password = await AsyncStorage.getItem('password')

        this.setState({
            nas,
            username,
            password
        })
    }

    async putData(key, value) {
        await AsyncStorage.setItem(key, value)
    }

    render() {
        let { nas, username, password } = this.state

        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Nas Location" onChange={this.handleInputChange('nas')} onEndEditing={this.handleInputBluer('nas')} value={nas} keyboardType='url' returnKeyType='next' />
                <TextInput style={styles.input} placeholder="Username" onChange={this.handleInputChange('username')} onEndEditing={this.handleInputBluer('username')} value={username} returnKeyType='next' />
                <TextInput style={styles.input} placeholder="Password" onChange={this.handleInputChange('password')} onEndEditing={this.handleInputBluer('password')} value={password} keyboardType='visible-password' secureTextEntry={true} />
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
    input: {
        width: 280,
        height: 40,
        borderBottomWidth: 2,
        marginTop: 10
    }
});

