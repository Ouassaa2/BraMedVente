import React from 'react';
import {Text, View, Pressable, ImageBackground} from 'react-native';
import {customStyle} from '../stylesfile.js';

const MenuPrincipal = ({navigation}) => {  
  return (
    <View style={customStyle.container}>
      
      <ImageBackground
        source={require('../assets/produits.jpg')} style={customStyle.backg}
        imageStyle={{ opacity: 0.3}}
      >

        <Text style={customStyle.label} >Hello, connected world!</Text>
        <Pressable   style={customStyle.button}  onPress={() => navigation.navigate('Nouvelle Vente')}  >
          <Text style={customStyle.text}>Nouvelle vente</Text>
        </Pressable>

        <Pressable   style={customStyle.button}  onPress={() => navigation.goBack()}  >
          <Text style={customStyle.text}>Déconnexion</Text>
        </Pressable>

      </ImageBackground>
    </View>
  );
};

export default MenuPrincipal;