import React, { useEffect, useState } from 'react';

import {Text, View, ScrollView, Pressable, Platform, TextInput, Alert, ToastAndroid, ImageBackground } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import {customStyle} from '../stylesfile.js';

import Variables from '../Variables.js';

const AjouterProduits = ({navigation}) => 
{    
  const [rechercheProduit, setRechercheProduit]=useState("")
  const [SelectedProduit, setSelectedProduits] = useState(null);
  const [SelectedStock, setSelectedStock] = useState("");
  const [SelectedDateExpiration, setSelectedDateExpiration] = useState("");

  const [quantiteDisponible, setQuantiteDisponible]=useState(0)
  const [afficherDateExpiration, setAfficherDateExpiration]=useState(false)
  const [quantite, setQuantiteVente]=useState(0)
  const [prixVente, setPrixVente]=useState(0)
  const [IdListe, setIdListe]=useState(1)

  const [_ListeProduits, setResultsProduits] = useState([]);
  const [_ListeDatesExpiration, setResultsDateExpiration] = useState([]);
  
//Changement texte recherche produit, actualiser liste des produits avec filtre
useEffect
( () => 
  {
    try
    {
      if(rechercheProduit.length>1)
      {
        const _listeProduitsFiltre=Variables['listeProduits'].
        filter((Pr) => String(Pr.value).toLowerCase().includes(rechercheProduit.toLowerCase()));
        setResultsProduits(_listeProduitsFiltre.sort((a,b)=> a.value.localeCompare(b.value))  )
      }
    }
    catch(e)
    {
      console.log("Erreur "+e)
    }
  },[rechercheProduit]
)

//Selectionner produit ou stock, actualiesr liste des disponibilités
useEffect
( () => 
  {
    SetListeDatesPeremption();
    if(SelectedProduit!=null)
    {
      setPrixVente(SelectedProduit.PrixVenteDetail)
    }
    
  },[SelectedStock, SelectedProduit]
)

//Changer date expiration, actualiser liste dates expiration produit
useEffect
( () => 
  {
    try
    {
      if(true)
      {
        setQuantiteVente(0)
        const _listeDEProduit=Variables['listeProduitsStock'].filter((Pr) => 
          Pr.IdProduit===(SelectedProduit.Identifiant) 
          && Pr.DatePeremption===SelectedDateExpiration
          && Pr.IdStock === SelectedStock.Identifiant
        );
        //if(_listeDEProduit.length>0)
          //setQuantiteDisponible(0)
          setQuantiteDisponible(_listeDEProduit[0].Quantite)
      }
    }
    catch(e)
    {
      console.log("Erreur "+e)
    }
  },[SelectedDateExpiration, SelectedStock, SelectedProduit]
)

//Changer quantite saisie
useEffect
( () => 
  {
    try
    {
      if(quantite>quantiteDisponible)
      {
        setQuantiteVente(quantiteDisponible)
      }
    }
    catch(e)
    {
      console.log("Erreur "+e)
    }
  },[quantite]
)

//Ajouter un produit à la liste des prodtuits du bon
const AjouterProduit=()=> {
  if(quantite<=0)
  {
    AlerteMessage('Veuillez saisir une quantité positive')
    return;
  }

  _ClasseProduitStock=Variables['listeProduitsStock'].
  filter((Pr) => Pr.IdProduit==SelectedProduit.Identifiant);
  
  if(_ClasseProduitStock!=null && _ClasseProduitStock.length>0)
  {
    _CLP=_ClasseProduitStock[0]

    if(prixVente<_CLP.PrixAchat)
    {
      AlerteMessage('Veuillez saisir un prix de vente valide')
      return;
    }

    Prod=Variables['listeProduitsAjoutes'].filter((Pr) => 
          Pr.IdProduit===SelectedProduit.Identifiant &&
          Pr.IdStock==SelectedStock.Identifiant 
        );

        
    if(Prod.length>0)
    {
      AlerteMessage('Produit déjà ajouté')
      return;
    }

    _ProduitStock=_CLP.DupliquerObjet()
    
    _ProduitStock.Quantite=quantite;
    _ProduitStock.IdListe=IdListe;
    _ProduitStock.PrixVente=prixVente;
    _ProduitStock.IdStock=SelectedStock.Identifiant;
    setIdListe(IdListe+1)
    
    Variables['listeProduitsAjoutes'].push(_ProduitStock)
    Variables['totalFacture']=Variables['totalFacture']+(quantite*prixVente)

    //console.warn("Produit ajouté avec succés");
    ToastAndroid.show("Produit ajouté avec succés", ToastAndroid.SHORT);

    // ToastAndroid.showWithGravity( 'showWithGravity', ToastAndroid.SHORT, ToastAndroid.CENTER, );

    // ToastAndroid.showWithGravityAndOffset( 'showWithGravityAndOffset', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
  }
}

const AlerteMessage=(Message)=> {
  Alert.alert(  
    'Information',  
    Message,  
    [  
        {text: 'OK', onPress: () => {}},  
    ]  
  );  
}

//Actualiser la liste des dates de péremption
const SetListeDatesPeremption=()=> {
  try
    {
      if(SelectedStock!=null && SelectedProduit!=null)
      {
        setAfficherDateExpiration(false)
        setQuantiteDisponible(0)  
        setQuantiteVente(0)
        
        const _listeDEProduit=Variables['listeProduitsStock'].filter((Pr) => 
          String(Pr.value).toLowerCase()===(SelectedProduit.value.toLowerCase()) &&
          Pr.IdStock==SelectedStock.Identifiant
        );
        let _listeDates=[]

        if(_listeDEProduit.length>0)
        {
          if(_listeDEProduit[0].DatePeremption!=null)
          {
            setAfficherDateExpiration(true)
            _listeDates=_listeDEProduit.map(pr => pr.DatePeremption)
          }
          else
          {
            setQuantiteDisponible(_listeDEProduit[0].Quantite)  
          }
        }
          
        setResultsDateExpiration(_listeDates)
        
        if(_listeDates.length>0)
        {
          //console.log("dates expiration  "+_listeDates[0])
          //setSelectedDateExpiration(_listeDates[0])
        }
      }
    }
    catch(e)
    {
      console.log("Erreur "+e)
    }
}
  
  return (
  
      <ImageBackground
        source={require('../assets/prod3.png')} style={customStyle.backg}
        imageStyle={{ opacity: 0.5}}
      >
        
        <ScrollView contentContainerStyle={customStyle.scrollView}>

          <View style={customStyle.container}>

            <Text style={customStyle.text}>Stock</Text>
            <SelectList 
            boxStyles={customStyle.selectList}
            setSelected={
                (val) => 
                {
                  _selectedStock=Variables['listeStocks'].filter((St) => St.value==val);
                  if(_selectedStock!=null && _selectedStock.length > 0)
                    setSelectedStock(_selectedStock[0])
                }
              }
              data={Variables['listeStocks']}  
              save="value"
            />

            <Text style={customStyle.text}>Produit</Text>
            <TextInput style={customStyle.input} placeholder="Au moins 2 lettres" value={rechercheProduit} onChangeText={setRechercheProduit}/>  

              <SelectList 
                boxStyles={customStyle.selectList}
                setSelected=
                {
                  (val) => 
                  {
                    _selectedProduit=_ListeProduits.filter((Pr) => Pr.value==val);
                    if(_selectedProduit!=null && _selectedProduit.length > 0)
                    {
                      setSelectedProduits(_selectedProduit[0])
                    }
                  }
                }
                data={_ListeProduits}
                save="value"
              />

            {
              afficherDateExpiration && 
              (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >          
                
                  <Text style={customStyle.text}>Date expiration</Text>
                  <SelectList 
                    boxStyles={customStyle.selectList}
                    setSelected=
                    {
                      (val) => 
                      {
                        setSelectedDateExpiration(val)
                      }
                    }
                    data={_ListeDatesExpiration}
                    save="value"
                  />
                </View>
              )
            }

            <Text style={customStyle.text}>Quantité disponible: {quantiteDisponible}</Text>

            <Text style={customStyle.label} >Quantité:</Text>
            <TextInput 
              style={customStyle.input} placeholder="Quantite" 
              value={quantite.toString()} onChangeText={setQuantiteVente}
              keyboardType='numeric'
          />
            
            <Text style={customStyle.label} >Prix (DA):</Text>
            <TextInput 
              style={customStyle.input} placeholder="Prix" 
              value={prixVente.toString()} onChangeText={setPrixVente}
              keyboardType='numeric'
            />

            <Pressable   style={customStyle.button2}  onPress={() => AjouterProduit()}  >
              <Text style={customStyle.text}>Ajouter</Text>
            </Pressable>

            <Pressable   style={customStyle.button}  onPress={() => {navigation.navigate('Liste des Produits')}}  >
              <Text style={customStyle.text}>Liste des produits</Text>
            </Pressable>      

          </View>
        </ScrollView>
      </ImageBackground>

  );
};

export default AjouterProduits;