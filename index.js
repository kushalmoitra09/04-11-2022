/**
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import HomeScreen from './src/screens/home_screen';
import ProductDetailsScreen from './src/screens/product_details_screen';
import SplashScreen from './src/screens/splash_screen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
AppRegistry.registerComponent(appName, () => MyStack);
