import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import firebase from 'react-native-firebase'

export default class DrawerContentComponent extends React.Component {
    handleLogout() {
        firebase.auth().signOut()
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...this.props} />
                </SafeAreaView>
                <TouchableOpacity onPress={this.handleLogout}>
                    <View style={styles.item}>
                        <Text style={styles.label}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        margin: 16,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, .87)',
    },
});