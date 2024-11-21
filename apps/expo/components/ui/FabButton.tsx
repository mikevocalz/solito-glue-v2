import React, {useEffect, useState, useRef, ReactNode } from 'react'
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'app/components/ui/pressable'

interface RouteProps {
  id: number
  name: string
  icon: keyof typeof Ionicons.glyphMap
}
const FabButton = ({
  children,
  routes,
}: {
  children: ReactNode
  routes: RouteProps[]
}) => {
  const [expanded, setExpanded] = useState(false)
  const animation = useRef(new Animated.Value(0)).current
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navigation = useNavigation()
  const activeRoute = useNavigationState(
    (state) => state.routes[state.index]?.name,
  )

  const toggleFab = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setExpanded(!expanded)
    resetAutoClose()
  }

  const resetAutoClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setExpanded(false))
    }, 16000) // 20 seconds
  }

  useEffect(() => {
    if (expanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setExpanded(false))
    }
  }, [activeRoute])

  // Clear the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const calculatePosition = (index: number, total: number) => {
    const angle = (Math.PI / 4) * (index - (total - 4.5)) // Spread out buttons in a quarter-circle arc
    const radius = 90 // Distance from center
    return {
      x: radius * Math.cos(angle),
      y: -radius * Math.sin(angle),
    }
  }

  return (
    <View style={styles.container}>
      {/* Expanding FAB-like buttons */}
      {routes.reverse().map((route, index) => {
        const pos = calculatePosition(index, routes.length)
        return (
          <Animated.View
            key={index}
            style={[
              styles.fab,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, pos.x],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, pos.y],
                    }),
                  },
                ],
                opacity: animation,
              },
            ]}
          >
            <Pressable
              style={styles.smallButton}
              onPress={() => {
                toggleFab()
                navigation.navigate(route.name as never)
              }}
            >
              <Ionicons name={route.icon} size={20} color="white" />
            </Pressable>
          </Animated.View>
        )
      })}

      {/* Main FAB */}
      <Pressable style={styles.mainFab} onPress={toggleFab}>
        {children}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 2,
     alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainFab: {
    backgroundColor: '#6200EE',
    height: 80,
    width: 80,
    borderRadius: 80/4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  smallButton: {
    backgroundColor: '#03DAC5',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
})

export default FabButton
