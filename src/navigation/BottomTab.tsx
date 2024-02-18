import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'native-base';
import React from 'react';
import GamesTab from '../screens/main/game/GamesTab';
import HomeTab from '../screens/main/home/HomeTab';
import NewsTab from '../screens/main/news/NewsTab';
import TrophyTab from '../screens/main/trophy/TrophyTab';

const BottomTab = () => {
  const Tabs = createBottomTabNavigator();

  // console.log(Path("assets/bottom_tab/home.png"));

  return (
    <Tabs.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#08B364",
      tabBarStyle: {
        // marginTop: 10,
        height: 55
      },
      tabBarIconStyle: {
        marginTop: 8
      },
      tabBarLabelStyle: {
        marginBottom: 6
      }
    }}>
      <Tabs.Screen name={TabNames.Home}   component={HomeTab}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/bottom_tab/home.png")}
              size={size}
              tintColor={focused ? color : color}
              alt='home'
            />
          )
        }}
      />
      <Tabs.Screen name={TabNames.News}   component={NewsTab}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/bottom_tab/newspaper.png")}
              size={size}
              tintColor={focused ? color : color}
              alt='news'
            />
          )
        }}
      />
      <Tabs.Screen name={TabNames.Games}  component={GamesTab}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/bottom_tab/game-controller.png")}
              size={size}
              tintColor={focused ? color : color}
              alt='games'
            />
          )
        }}
      />
      <Tabs.Screen name={TabNames.Trophy} component={TrophyTab}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../../assets/bottom_tab/trophy.png")}
              size={size}
              tintColor={focused ? color : color}
              alt='trophy'
            />
          )
        }}
      />
    </Tabs.Navigator>
  )
}

export const TabNames = {
  Home:   "Home",
  News:   "News",
  Games:  "Games",
  Trophy: "Trophy"
}

export default BottomTab;