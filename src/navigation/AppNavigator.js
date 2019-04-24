import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Auth from './AuthNavigator'
import Login from './LoginNavigator'
import Main from './MainNavigator'

export default createAppContainer(createSwitchNavigator(
    {
        Auth: Auth,
        Login: Login,
        App: Main,
    },
    {
        initialRouteName: 'Auth',
    }
))