import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default class Post extends React.Component {
    constructor() {
        super()

        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        let { images, time, name, no, onPress, magnet } = this.props

        ims = images || []

        onPress({name, time, images, no, urls: [magnet, ...ims]})
    }

    render() {
        let { images, name, no } = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                <Image style={styles.img} source={{ uri: images ? images[0] : undefined}} />
                <Text style={styles.title} numberOfLines={2}>{name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row'
    },
    img: {
        width: 80,
        height: 80,
    },
    title: {
        textAlignVertical: 'center',
        flex: 1,
    }
});
