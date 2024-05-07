import React, { useEffect, useState } from 'react';
import requeteHTTPS from '../requete';

import {Text, View, ScrollView, Pressable, TextInput, Platform, ImageBackground, Alert} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

import DateTimePicker from "@react-native-community/datetimepicker"

import ClasseClient from '../ClassesObjets/ClasseClient.js';
import ClasseStock from '../ClassesObjets/ClasseStock.js';
import ClasseProduit from '../ClassesObjets/ClasseProduit.js';
import ClasseProduitStock  from '../ClassesObjets/ClasseProduitStock.js';
import Variables from '../Variables.js';
import {customStyle} from '../stylesfile.js';

const NouvelleVente = ({navigation}) => 
{  
  const [rechercheClient, setRechercheClient]=useState("")
  const [_ListeClients, setResults] = useState([]);
  const [versement, setVersement]=useState(0)
  const [totalFacture, setTotalFacture]=useState(0)
  
  const [_DetteClient, setDette] = useState(0);
  const [SelectedClient, setSelected] = useState("");
  const [TexteChargement, setTexteChargement] = useState("");

  const [date, setDate] = useState(new Date())
  const [anneeFacture, setAnneeFacture] = useState(0)
  const [dateFacture, setDateOfFacture] = useState("")
  const [showPicker, setShowPicker] = useState(false)
  
  const toggleDatePicker = ()=> {
     setShowPicker(!showPicker)
  }

  const onChange= ({type}, selectedDate)=> {
    if(type=="set")
    {
      const currentDate=selectedDate
      setDate(currentDate)

      if(Platform.OS==="android") 
      {
        toggleDatePicker();
        setDateOfFacture(formatDate(currentDate))
      }
    }
    else
    toggleDatePicker()
  }

  const confirmIOSDate= ()=> {
    setDateOfFacture(formatDate(date))
    toggleDatePicker()
  }

  const formatDate= (rawDate)=> {
    let date=new Date(rawDate)

    let year=date.getFullYear()
    let month=date.getMonth()+1
    let day=date.getDate()
    setAnneeFacture(year)
    
    return day+"-"+month+"-"+year 
  }

  //Vérifier les conditions avant de valider la vente
  const valider= async ()=> 
  {
    if(Variables['listeProduitsAjoutes'].length==0)
    {
      AlerteMessage('Veuillez ajouter des produits à votre facture')
      return;
    }
    
    if(Variables['selectedClient']==null)
    {
      AlerteMessage('Veuillez selectionner un client')
      return;
    }
    
    if(dateFacture==='')
    {
      AlerteMessage('Veuillez saisir la date de la facture')
      return;
    }

    Alert.alert(  
      'Information',  
      'Voulez vous confirmer cette opération?',  
      [  
          {text: 'OK', onPress: () => {ValidationVente()}},  
          {text: 'Annuler', onPress: () => {return}},  
      ]  
    );  
  }

  //Valider la vente
  const ValidationVente= async()=> 
  {    
    const parametres=
    {
        Appel : 3,
        IdUser : Variables['utilisateur'].Identifiant,
        Utilisateur : Variables['utilisateur'].NomUtilisateur,
        TotalFacture: Variables['totalFacture'],
        Versement: versement,
        IdStock: 0,
        Stock:'',
        DateFacture:dateFacture,
        AnneeFacture: anneeFacture,
        TypeFacture:1,
        IdClient: Variables['selectedClient'].Identifiant,
        ListeProduits: Variables['listeProduitsAjoutes'],
    }
    
    _facture=await requeteHTTPS(Variables['urlFactureClient'], parametres)
    
    if(_facture['etat'] !== null && _facture['etat'] === "ok")
    {
      AlerteMessage('Opération effecturée avec succès')
      reafrichir();
    }
  }

  //Remettre à 0 les variables
  const reafrichir=() => 
  {
    Variables['totalFacture']=0
    Variables['versement']=0
    Variables['listeProduitsAjoutes']=[]
    setTotalFacture(Variables['totalFacture'])
  }

  //changer selected client
  useEffect
  ( () => 
    {
      try
      {
        const result = _ListeClients.filter((Cli) => Cli.value === SelectedClient);
        setDette(result[0].Dette)
        Variables['selectedClient']=result[0]
      }
      catch(e)
      {
      }
    },[SelectedClient]
  )

  //Filtrer clients
  useEffect
  ( () => 
    {
      try
      {
          const _listeClientsFiltre=Variables['listeClients'].filter((Cl) => String(Cl.value).toLowerCase().includes(rechercheClient.toLowerCase()));
          setResults(_listeClientsFiltre)
      }
      catch(e)
      {
        console.log("Erreur "+e)
      }
    },[rechercheClient]
  )

  //Calculer la nouvelle dette
  useEffect
  ( () => 
    {
      try
      {
        var montantVersement=0
        try
        {
          montantVersement=parseFloat(versement)
        }
        catch(e){}
        if(isNaN(montantVersement))
          montantVersement=0

        if(montantVersement>(_DetteClient+totalFacture))
          montantVersement=_DetteClient+totalFacture

          setVersement(montantVersement)
          Variables['versement']=versement
      }
      catch(e)
      {
        console.log("Erreur "+e)
      }
    },[versement, SelectedClient, totalFacture]
  )
  
  //Afficher un message d'informations
  const AlerteMessage=(Message)=> {
    Alert.alert(  
      'Information',  
      Message,  
      [  
          {text: 'OK', onPress: () => {}},  
      ]  
    );  
  }

  //Actualiser la liste des clients
  ActualiserClients =async()=>
  {
    _Cclients=new ClasseClient();
    _LC= await _Cclients.getClients();
    Variables['listeClients']=_LC
    setResults(_LC)
    
    if(_LC !== null)
    {
    }
    else
    {
      Alert.alert(  
        'Information',  
        'Veuillez vérifier votre connexion',  
        [  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
      );  
    }
  }

  //Actualiser la liste des stocks
  ActualiserStocks =async()=>
  {
    _Cstocks=new ClasseStock();
    _ListeStocks= await _Cstocks.getStocks();
    Variables['listeStocks']=_ListeStocks
    
    if(_ListeStocks !== null)
    {
    }
    else
    {
      Alert.alert(  
        'Information',  
        'Veuillez vérifier votre connexion',  
        [  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
      );  
    }
  }

  //Actualiser la liste des produits 
  ActualiserProduits =async()=>
  {
    _CProduits=new ClasseProduit();
    _ListeProduits= await _CProduits.getProduits();
    Variables['listeProduits']=_ListeProduits
    
    if(_ListeProduits !== null)
    {
    }
    else
    {
      Alert.alert(  
        'Information',  
        'Veuillez vérifier votre connexion',  
        [  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
      );  
    }
  }

  //Actualiser la liste des produits en stock
  ActualiserProduitsStock =async()=>
  {
    _CProduitsStock=new ClasseProduitStock();
    _ListeProduitsStock= await _CProduitsStock.getProduitsStock();
    Variables['listeProduitsStock']=_ListeProduitsStock
    
    if(_ListeProduitsStock !== null)
    {
    }
    else
    {
      Alert.alert(  
        'Information',  
        'Veuillez vérifier votre connexion',  
        [  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
      );  
    }
  }

  //Actualiser les différentes données
  const Actualiser= async()=> 
  {
    setTexteChargement("0%")
    await ActualiserProduits();
    setTexteChargement("30%")
    await ActualiserStocks();
    setTexteChargement("40%")
    await ActualiserProduitsStock();
    setTexteChargement("75%")
    await ActualiserClients();
    setTexteChargement("100%")
  }
  
  
  //On Resume
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTotalFacture(Variables['totalFacture'])
    });
  
      return unsubscribe;
    }, [navigation]);


  return (
    <ScrollView contentContainerStyle={customStyle.scrollView}>
  
      <ImageBackground
        source={require('../assets/prod6.jpg')} style={customStyle.backg}
        imageStyle={{ opacity: 0.6}}
      >
        
        <View style={customStyle.container}>

        <Pressable   style={customStyle.button}  onPress={() => Actualiser()}  >
          <Text style={customStyle.text}>Actualiser  </Text>
        </Pressable>

        <Pressable   style={customStyle.button}  onPress={() => 
            {
              if(_ListeClients.length>0)
                navigation.navigate('Ajouter des Produits')
              else
              {
                
                Alert.alert(  
                  'Information',  
                  'Veuillez actualiser les données',  
                  [  
                      {text: 'OK', onPress: () => console.log('OK Pressed')},  
                  ]  
                  ); 
              }
            }
          
          }  >
        <Text style={customStyle.text}>Ajouter des produits  </Text>
        </Pressable>

        <Pressable   style={customStyle.button}  onPress={() => valider()}  >
      <Text style={customStyle.text}>Valider</Text>
        </Pressable>

        <Pressable   style={customStyle.button}  onPress={() => navigation.goBack()}  >
      <Text style={customStyle.text}>Menu principal</Text>
        </Pressable>

        <Text style={customStyle.text}>{TexteChargement}</Text>
    
        <TextInput style={customStyle.input} placeholder="Recherche..." value={rechercheClient} onChangeText={setRechercheClient}/>  
        <Text style={customStyle.text}>{_ListeClients.length} Client(s) </Text>

        <SelectList 
          boxStyles={customStyle.selectList}
          setSelected={(val) => 
            {
              setSelected(val)
              if(SelectedClient!==null)
              {

              }
            }
          } 
          data={_ListeClients} 
          save="value"
        />

        <Text style={customStyle.text}>Dette du Client: {_DetteClient}  DA</Text>
        <Text style={customStyle.text}>Totale facture: {totalFacture}  DA</Text>
        <Text style={customStyle.text}>Totale: {(totalFacture+_DetteClient)}  DA</Text>

        <Text style={customStyle.text}>Date facture </Text>

        {showPicker &&
        (
          <DateTimePicker
          style={{width: '90%',}}
          //maximumDate={new Date(2024-1-1)}
          //minimumDate={new Date(2025-1-1)}
          mode='date'
          display='spinner'
          value={date}
          onChange={onChange}
          />
        )}


        {!showPicker &&
        (
        <Pressable style={{width: '70%', alignItems: 'center',}}
          onPress={toggleDatePicker}
        >
        <TextInput style={customStyle.input}
          placeholder=''
          
          value={dateFacture}
          onChangeText={setDateOfFacture}
          placeholderTextColor="#11182744"
          editable={false}
          onPressIn={toggleDatePicker}
        />
        </Pressable>
        )}

        
        <Text style={customStyle.label} >Versement (DA):</Text>
        <TextInput 
          style={customStyle.input} placeholder="Versement" 
          value={versement.toString()} onChangeText=
          {
            setVersement
          }
          keyboardType='numeric'
        />

        <Text style={customStyle.text}>Nouvelle dette: {(Variables['totalFacture']+_DetteClient-versement)}  DA</Text>

      </View>

      </ImageBackground>

    </ScrollView>
  );

};

export default NouvelleVente;