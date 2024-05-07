import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView} from 'react-native-gesture-handler'

import MenuPrincipal from '../RNPages/MenuPrincipal';
import ListeProduits from '../RNPages/ListeProduits';
import ConnexionPage from '../RNPages/ConnexionPage';

const Tab = createMaterialBottomTabNavigator();

export default function MenuNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Menu') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'MenuProduits') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}

            >
                <Tab.Screen name="ConnexionScreen" component={ConnexionPage} />
                <Tab.Screen name="Menu" component={MenuPrincipal} />
                <Tab.Screen name="MenuProduits" component={ListeProduits} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}