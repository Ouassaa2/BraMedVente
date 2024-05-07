import React from 'react';
import { Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Variables from './Variables';
import HomeScreen from './RNPages/HomeScreen';
import DetailsScreen from './RNPages/DetailsScreen';

import MenuPrincipal from './RNPages/MenuPrincipal';
import ListeProduits from './RNPages/ListeProduits';
import ConnexionPage from './RNPages/ConnexionPage';
import NouvelleVente from './RNPages/NouvelleVente';
import AjouterProduits from './RNPages/AjouterProduits';

// Créez une pile de navigation
const Stack = createStackNavigator();

const App = () => {

  var width = Dimensions.get('window').width;
  Variables['width'] = width;
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Définissez les écrans de votre application */}
        <Stack.Screen name="Connexion" component={ConnexionPage} />
        <Stack.Screen name="Menu Principal" component={MenuPrincipal} />
        <Stack.Screen name="Liste des Produits" component={ListeProduits} />
        <Stack.Screen name="Ajouter des Produits" component={AjouterProduits} />
        <Stack.Screen name="Nouvelle Vente" component={NouvelleVente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
