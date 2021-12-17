import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import HomeScreen from './screens/Home';
import SignOutScreen from './screens/SignOut';
import MovieScreen from './screens/Movie';
import SearchScreen from './screens/Search';
import MenuScreen from './screens/Menu';
import WatchlistScreen from './screens/Watchlist';
import UpcomingScreen from './screens/Upcoming';
import SeenlistScreen from './screens/Seenlist';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignOut" component={SignOutScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
        <Stack.Screen name="Upcoming" component={UpcomingScreen} />
        <Stack.Screen name="Seenlist" component={SeenlistScreen} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
