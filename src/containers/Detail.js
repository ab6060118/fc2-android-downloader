import React from 'react'
import { View, Image, Button, StyleSheet, FlatList, Text, TouchableWithoutFeedback, Dimensions, AsyncStorage, ToastAndroid, Alert } from 'react-native'
import Lightbox from 'react-native-lightbox';
import { doDownload } from '../libs/api'

export default class Post extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `[${navigation.getParam('no')}] ${navigation.getParam('name')}`
    })

    constructor() {
        super()
        this.state = { isDownloading: false }
        this.renderItem = this.renderItem.bind(this)
        this.handleDownloadClick = this.handleDownloadClick.bind(this)
        this.download = this.download.bind(this)
    }

    async download() {
        let { navigation } = this.props
        let urls = navigation.getParam('urls') || []
        let no = navigation.getParam('no')

        this.setState({ isDownloading: true })
        try {
            await doDownload(`fc2-${no}`, urls, no)
            ToastAndroid.show('Download Success', ToastAndroid.SHORT); 
        }
        catch(e) {
            ToastAndroid.show(e, ToastAndroid.SHORT); 
        }

        this.setState({ isDownloading: false })
    }

    handleDownloadClick() {
        Alert.alert(
            '',
            'Do you want to download this one?',
            [{
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            }, {
                text: 'Yes',
                onPress: () => {
                    this.download()
                }
            }],
            { cancelable: false },
        );
    }

    renderItem({ item }) {
        return (
            <Lightbox activeProps={{style: { flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }, resizeMode: 'contain'}}>
                <Image source={{uri: item || undefined}} style={{height: Dimensions.get('window').width/2, marginTop: 5, marginBottom: 5}} resizeMode='contain' />
            </Lightbox>
        )
    }

    render() {
        let { isDownloading } = this.state
        let { navigation } = this.props
        let images = navigation.getParam('images') || []

        return (
            <View style={styles.container}>
                <Button title='Download' onPress={this.handleDownloadClick} disabled={isDownloading}/>
                {
                    images.length > 0 ? (
                        <FlatList
                            style={styles.container}
                            data={images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderItem}
                        />
                    ) : (
                        <View style={{...styles.container, ...styles.emptyContainer}}>
                            <Text style={styles.text} numberOfLines={2}>Nothing to display</Text>
                        </View>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24
    },
    item: {
        flex: 1,
        margin: 3,
        alignItems: 'center',
    }
});
