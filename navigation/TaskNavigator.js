import Colors from '../constants/Colors';
import CreateTask from '../screens/CreateTask';
import {Platform} from 'react-native';
import React from 'react';
import TaskDetails from '../screens/TaskDetails';
import TaskList from '../screens/TaskList';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor:  Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
}

const stackNavigator = createStackNavigator(
    {
        create: CreateTask,
        detail: TaskDetails,
        task: TaskList,
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

export default createAppContainer(stackNavigator);