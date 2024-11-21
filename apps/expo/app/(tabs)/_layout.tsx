//import { Tabs } from 'expo-router';
import { withLayoutContext, Tabs } from 'expo-router'
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation'
import Icon from '@expo/vector-icons/FontAwesome'

//import { Tabs } from '@/components/bottom-tabs'

import TabBarIcon from '@/components/ui/TabBarIcon'
import React from 'react'
import { Platform } from 'react-native'
import { Center } from 'app/components/ui/center'
import { Pressable } from 'app/components/ui/pressable'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import FabButton from '@/components/ui/FabButton'


export default function TabLayout() {
  const colorScheme = useColorScheme()

    const fabRoutes:any = [
      {
        id: 1,
        name: 'index',
        icon: 'home',
      },
      {
        id: 2,
        name: 'modal',
        icon: 'add',
      },
      {
        id: 3,
        name: 'explore',
        icon: 'globe',
      },
      {
        id: 4,
        name: 'modal',
        icon: 'apps',
      },
    ]

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'red',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} library="Feather" />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list" color={color} library="Feather" />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          // tabBarIcon: ({ color }) => (
          //   <TabBarIcon name="plus" color={color} library="FontAwesome5" />
          // ),

          tabBarButton: (props) => (
            <FabButton
              {...props}
              routes={fabRoutes}
              // onPress={() => console.log('FAB pressed!')}
            >
              <TabBarIcon name="plus" color={'red'} library="Feather" />
            </FabButton>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="earth-americas"
              color={color}
              library="FontAwesome6"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="user"
              color={color}
              library="FontAwesome6"
            />
          ),
        }}
      />
    </Tabs>
  )
}
