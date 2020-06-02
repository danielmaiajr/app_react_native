import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from '../component/Cart';
import Checkout from '../component/Checkout';

const Stack = createStackNavigator();

const CartScreen = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Cart" component={Cart} />
			<Stack.Screen name="Checkout" component={Checkout} />
		</Stack.Navigator>
	);
};

export default CartScreen;
