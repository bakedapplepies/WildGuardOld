import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/main/home/Home';
import NewsTab from '../screens/main/news/NewsTab';
import HomeTab from '../screens/main/home/HomeTab';
import GamesTab from '../screens/main/game/GamesTab';
import TrophyTab from '../screens/main/trophy/TrophyTab';

const BottomTab = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name={TabNames.Home}   component={HomeTab} />
      <Tabs.Screen name={TabNames.News}   component={NewsTab} />
      <Tabs.Screen name={TabNames.Games}  component={GamesTab} />
      <Tabs.Screen name={TabNames.Trophy} component={TrophyTab} />
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