import React, {useEffect} from 'react';

import {Button, Linking} from "react-native";
import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeScreen} from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChatScreen from "./screens/ChatScreen";
import NewsScreen from "./screens/NewsScreen";
import AboutScreen from "./screens/AboutScreen";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {NavigationContainer} from "@react-navigation/native";
import {DeepLinking} from "./navigation/DeepLinking";
import Navigation from "./navigation/Navigation";
import {useTranslation} from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const homeScreenTitle = 'Home'
const newsScreenTitle = 'News'
const chatScreenTitle = 'Chat'
const settingsScreenTitle = 'Settings'
const TabNavigation = () => {
    const {t} = useTranslation()
    return (
        <Tab.Navigator
            initialRouteName={homeScreenTitle}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = 'planet';
                    let rn = route.name;
                    if (rn === homeScreenTitle) {
                        iconName = focused ? 'planet' : 'planet-outline';
                    } else if (rn === newsScreenTitle) {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (rn === chatScreenTitle) {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    } else if (rn === settingsScreenTitle) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: 'cornflowerblue',
                tabBarInactiveTintColor: 'lightgrey',
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeStack}
                        options={{headerShown: false, tabBarLabel: t('main.tabs.home.title')}}/>
            <Tab.Screen name="News" component={NewsScreen}
                        options={{tabBarLabel: t('main.tabs.news'), headerTitle: t('main.tabs.news')}}/>
            <Tab.Screen name="Chat" component={ChatScreen}
                        options={{tabBarLabel: t('main.tabs.chat'), headerTitle: t('main.tabs.chat')}}/>
            <Tab.Screen name="Settings" component={SettingsScreen}
                        options={{tabBarLabel: t('main.tabs.settings'), headerTitle: t('main.tabs.settings')}}/>
        </Tab.Navigator>
    );
}
const HomeStack = () => {
    const {t} = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen name={'HomeScreen'}
                          component={HomeScreen}
                          options={(props) => ({
                              headerTitleAlign: 'center',
                              headerTitle: () =>
                                  <Icon type="ionicon" name="logo-flickr"/>,
                              headerRight: () => (
                                  <Button
                                      onPress={() => props.navigation.navigate('About')}
                                      title={t('main.tabs.home.button')}
                                      color="#000"
                                  />
                              )
                          })}
            />
            <Stack.Screen name={'About'} component={AboutScreen} initialParams={{itemId: 42}}
                          options={{headerTitle: t('main.tabs.about')}}/>
        </Stack.Navigator>
    );
}
export default function App() {
    useEffect(() => {
        Linking.getInitialURL().then(async (deepLinkInitialURL: any) => {
            if (deepLinkInitialURL) {
                await DeepLinking.handleInitialNavigate(deepLinkInitialURL);
            }
        });
    }, []);
    return (
        <NavigationContainer
            linking={DeepLinking.linking}
            ref={Navigation.navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name={'Tab'} component={TabNavigation} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}