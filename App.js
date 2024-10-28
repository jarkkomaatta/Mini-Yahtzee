import Home from "./components/Home";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommonityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#ebe3e3'}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'information'
                : 'information-outline';
            } else if (route.name === 'Gameboard') {
              iconName = focused 
              ? 'dice-multiple' 
              : 'dice-multiple-outline';
            }
            else if (route.name === 'Scoreboard') {
              iconName = focused 
              ? 'view-list' 
              : 'view-list-outline';
            }
            return <MaterialCommonityIcons 
              name={iconName}
              size={size}
              color={color}
            />
          },
          tabBarActiveTintColor: '#050000',
          tabBarInactiveTintColor: '#ffffff',
          tabBarStyle: { 
            backgroundColor: '#0e8b8b',
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} 
          options={{tabBarStyle: {display: 'none'}}}/>
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}