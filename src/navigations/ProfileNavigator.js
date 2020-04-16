import {createStackNavigator} from 'react-navigation-stack';

import Profile from '_scenes/Profile';

const ProfileNavigatorConfig = {
	initialRouteName: 'Profile',
};

const RouteConfigs = {
	Profile: {
		screen: Profile,
		path: 'profile/:id',
	}
};

const ProfileNavigator = createStackNavigator(RouteConfigs, ProfileNavigatorConfig);

export default ProfileNavigator;