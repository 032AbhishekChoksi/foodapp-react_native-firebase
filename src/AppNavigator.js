//import liraries
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import EditItem from './tabs/EditItem';
import SelectLogin from './screens/user/SelectLogin';
import UserLogin from './screens/user/UserLogin';
import UserSignup from './screens/user/UserSignup';
import Main from './screens/user/Main';
import Cart from './screens/user/Cart';
import Checkout from './screens/user/checkout/Checkout';
import Address from './screens/user/checkout/Address';
import AddNewAddress from './screens/user/checkout/AddNewAddress';
import OrderStatus from './screens/user/checkout/OrderStatus';

// create a component
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLogin"
          component={SelectLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserSignup"
          component={UserSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AddNewAddress"
          component={AddNewAddress}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="OrderStatus"
          component={OrderStatus}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
