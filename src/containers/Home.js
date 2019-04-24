import React from 'react'
import firebase from 'react-native-firebase'
import { ScrollView, StatusBar, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'

import Post from '../components/Post'

export default class Home extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super()
        this.query = undefined
        this.lastPost = undefined
        this.state = {
            posts: [],
            refreshing: false
        }

        this.handlerItemPress = this.handlerItemPress.bind(this)
        this.handleEndReached = this.handleEndReached.bind(this)
        this.getPosts = this.getPosts.bind(this)
        this.doRefresh = this.doRefresh.bind(this)
    }

    componentDidMount() {
        let { posts } = this.state
        this.query = firebase.firestore().collection('sukebeiPosts').orderBy('time', 'desc').limit(10)
        this.getPosts()
    }

    async getPosts() {
        let { posts } = this.state
        let oldPosts = []
        let result = await this.query.get()

        this.query.get().then(snap => {
            this.query = this.query.startAfter(snap.docs[snap.size - 1])
            this.setState({
                posts: [...posts, ...snap.docs.map(doc => doc.data())],
                refreshing: false
            })
        })
    }

    doRefresh() {
        this.query = firebase.firestore().collection('sukebeiPosts').orderBy('time', 'desc').limit(10)
        this.setState({
            refreshing: true,
            posts: []
        }, this.getPosts)
    }

    handlerItemPress(post) {
        let { navigation } = this.props

        navigation.navigate('Detail', post)
    }

    handleEndReached() {
        this.getPosts()
    }

    render() {
        let { posts, refreshing } = this.state

        return (posts.length !== 0 ? (
            <FlatList
                onEndReached={this.handleEndReached}
                onEndReachedThreshold={5}
                data={posts}
                keyExtractor={(item, index) => item.time.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.doRefresh} />}
                renderItem={({ item }) => <Post {...item} onPress={this.handlerItemPress} />}
            />) : (<ActivityIndicator />)
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
