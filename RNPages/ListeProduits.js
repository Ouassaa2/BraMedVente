import React, { useEffect, useState } from 'react';
import {Text, View, ImageBackground, SafeAreaView, TouchableWithoutFeedback, FlatList, TouchableHighlight} from 'react-native';
import {customStyle} from '../stylesfile.js';
import Variables from '../Variables.js';

const ListeProduits = (navigation) => 
{ 

const separator = () => (
    <View style={{height: 0.8, width: '100%', backgroundColor: '#fff'}} />
)

const [ListeProduitsAjoutes, setResults] = useState([]);
const [initialise, setInitialise] = useState(false);
const [deleted, setDeleted] = useState(null);
const [totaleFacture, settotaleFacture] = useState(null);
  

//Produit retiré
useEffect
( () => 
  {
    try
    {
      var total=0
      for(i=0; i<ListeProduitsAjoutes.length; i++)
      {
        total=total+(ListeProduitsAjoutes[i].Quantite*ListeProduitsAjoutes[i].PrixVente)
      }
      Variables['totalFacture']=total
      settotaleFacture(Variables['totalFacture'])
    }
    catch(e)
    {
      console.log("Erreur "+e)
    }
  },[deleted]
)


if(!initialise)
{
  setInitialise(true) 
  setResults(Variables['listeProduitsAjoutes'])
  settotaleFacture(Variables['totalFacture'])
}

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          
        <ImageBackground
          source={require('../assets/prod7.jpg')} style={customStyle.backg}
          imageStyle={{ opacity: 0.7}}
        >
        <Text style={customStyle.text}>Long clique sur un produit pour le retirer</Text>
        <Text style={customStyle.text}>Totale facture: {totaleFacture} DA</Text>
        <Text style={customStyle.text}>Nombre produits: {ListeProduitsAjoutes.length}</Text>
          
        <SafeAreaView style={{flex: 1, width: "100%", alignItems:'center', }}>
          <FlatList
            style={{  width: "80%", padding:20,  }}
            ItemSeparatorComponent={separator}
            keyExtractor={(item) => item.IdListe}
            key={(item) => item.Identifiant}
            data={ListeProduitsAjoutes}
            renderItem={({item, index})=>{
              
              return (
                <TouchableHighlight
                key={item.IdListe}
                onPress={() => {}}
                >
                <View >
                  <Text style={customStyle.textTitre}>{item.value}</Text>
                  <TouchableWithoutFeedback onPress={ () => 
                  {
                  }}
                  onLongPress={ () => 
                    {
                      if(index==0)
                      {
                        Variables['listeProduitsAjoutes'].shift()
                      }
                      else
                      {
                        Variables['listeProduitsAjoutes'].splice(index, index)
                      }
                      setDeleted(item)
                      setResults(Variables['listeProduitsAjoutes'])
                    }}
                  >
                    <View>
                      <Text>Prix: {item.PrixVente} DA</Text>
                      <Text>Qunantite: {item.Quantite}</Text>
                    </View>

                  </TouchableWithoutFeedback>

                </View>
              </TouchableHighlight> 
              )
            }}
          />
        </SafeAreaView>

      </ImageBackground>

    </View>
  );
};

export default ListeProduits;