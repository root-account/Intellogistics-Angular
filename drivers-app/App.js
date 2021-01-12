// In App.js in a new project

import { View } from 'react-native';
import React, { Component } from 'react';
// import AppContainer from './navigation';
import { Root, Text } from 'native-base';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


import SignUp from "./app/screens/SignUp";
import SignIn from "./app/screens/SignIn";
import Home from "./app/screens/Home";
import Profile from "./app/screens/Profile";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}



const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();


// function App() {
//   return (
//     <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Home">
//             <Drawer.Screen name="Dashboard" component={Home} />
//             <Drawer.Screen name="Delivery History" component={Profile} />
//             <Drawer.Screen name="Messages" component={Profile} />
//             <Drawer.Screen name="My Profile" component={Profile} />
//             <Drawer.Screen name="My Wallet" component={Profile} />
//             <Drawer.Screen name="Settings" component={Profile} />
//             <Drawer.Screen name="Get Help" component={Profile} />
//             <Drawer.Screen name="Logout" component={SignIn} />
//         </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    } else {
      return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Dashboard" component={Home} />
                <Drawer.Screen name="Delivery History" component={Profile} />
                <Drawer.Screen name="Messages" component={Profile} />
                <Drawer.Screen name="My Profile" component={Profile} />
                <Drawer.Screen name="My Wallet" component={Profile} />
                <Drawer.Screen name="Settings" component={Profile} />
                <Drawer.Screen name="Get Help" component={Profile} />
                <Drawer.Screen name="Logout" component={SignIn} />
            </Drawer.Navigator>
        </NavigationContainer>
      );
    }
  }
}