import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from '_navigations/HomeNavigator';
import ProfileStack from '_navigations/ProfileNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { color } from '_styles';

const TabNavigatorConfig =
{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName == 'Home') {
                iconName = `home`;
            } else if (routeName == 'Profile') {
                iconName = `user`;
            }
            return <FontAwesome name={iconName} size={25} color={tintColor} />
        },
    }),
    tabBarOptions: {
        activeTintColor: color.primary,
        inactiveTintColor: color.g400
    }
};

const RouteConfigs = {
    Home: {
        path: 'yay',
        screen: HomeStack,
    },
    Profile: {
        path: 'test/user',
        screen: ProfileStack,
    },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;