import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import DrawerContentComponent from '../containers/Drawer'
import Home from '../containers/Home'
import Detail from '../containers/Detail'
import Setting from '../containers/Setting'

var navigator = createStackNavigator({
    List: Home,
    Detail: Detail
})

export default createDrawerNavigator({
    Home: navigator,
    Setting: Setting
}, {
    contentComponent: DrawerContentComponent,
})