import { createStackNavigator } from 'react-navigation-stack';

import Home from '_scenes/Home';
import Purchase from '_scenes/Transaction/Purchase';
import Payment from '_scenes/Transaction/Payment';
import BankInvoice from '_scenes/Transaction/BankInvoice';
import WadiahInvoice from '_scenes/Transaction/WadiahInvoice';
import TopUp from '_scenes/Transaction/TopUp';
import Transfer from '_scenes/Transaction/Transfer';
import Pulsa from '_scenes/PPOB/Pulsa';
import Listrik from '_scenes/PPOB/Listrik';
import InputListrik from '_scenes/PPOB/InputListrik';
import ListrikConfirm from '_scenes/PPOB/ListrikConfirm';
import PPOBPayment from '_scenes/PPOB/PPOBPayment';

const HomeNavigatorConfig = {
	initialRouteName: 'Home',
};

const RouteConfigs = {
	Home: {
		screen: Home,
		path: 'home',
		navigationOptions: {
			header: null
		},
	},
	Purchase: {
		screen: Purchase,
		path: 'purchase/:id',
	},
	Payment: {
		screen: Payment,
	},
	BankInvoice: {
		screen: BankInvoice,
	},
	WadiahInvoice: {
		screen: WadiahInvoice,
	},
	TopUp: {
		screen: TopUp,
	},
	Transfer: {
		screen: Transfer,
	},
	Pulsa: {
		screen: Pulsa,
	},
	Listrik: {
		screen: Listrik,
	},
	InputListrik: {
		screen: InputListrik,
	},
	ListrikConfirm: {
		screen: ListrikConfirm,
	},
	PPOBPayment: {
		screen: PPOBPayment,
	},
};

const HomeNavigator = createStackNavigator(RouteConfigs, HomeNavigatorConfig);

HomeNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}
	return {
		tabBarVisible
	}
}

export default HomeNavigator;