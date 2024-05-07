import { useState } from 'react';
import Variables from '../Variables.js';
import { Text, View, ScrollView, TextInput, Pressable, Image, KeyboardAvoidingView, Alert} from 'react-native';

import ClasseUtilisateur from '../ClassesObjets/ClasseUtilisateur.js';
import {customStyle} from '../stylesfile.js';

export default function ConnexionPage({navigation}) {
  // const [username, setUserName]=useState("Brahim")
  // const [password, setPassword]=useState("Brahim01")
  const [username, setUserName]=useState("") 
  const [password, setPassword]=useState("")
  const [errors, setErrors]=useState({})
  const [ConnexionEnCours, setConnexionEnCours]=useState(false)


const connexionEffectuee=()=>
{
  setConnexionEnCours(false)
  navigation.navigate('Menu Principal')
}

const validationForm=()=> {
  let errors  ={}
  if(username.length<4) errors.username="Veuillez saisir un nom d'utilisateur"
  if(password.length<4) errors.password="Veuillez saisir un mot de passe"

  setErrors(errors)
  return (Object.keys(errors).length === 0);
}

//Connecter l'application
const validerConnexion= async()=> {
  if(ConnexionEnCours)
    return;
  if(validationForm())
  {
    setErrors({})
    setConnexionEnCours(true)
    _utilisateur=new ClasseUtilisateur();
    _u= await _utilisateur.getUtilisateur(username, password);
    
    if(_u.Etat !== null && _u.Identifiant!==undefined)
    {
      etat=_u.Etat
      
      switch(etat)
      {
        //Compte bloqué
        case 0:
          {
            Alert.alert(  
              'Information',  
              'Votre compte a été bloqué',  
              [  
                  {text: 'OK', onPress: () => console.log('OK Pressed')},  
              ]  
              );  
            break;
          }
          //Connexion
          case 1:
          {

            console.log("||Connected ");
            Variables['utilisateur']=_u;

            setUserName("")
            setPassword("")
            connexionEffectuee();
            break;
          }
          default:
          {
            console.log("||default ");
            Alert.alert(  
              'Information',  
              'Veuillez vérifier vos coordonnées et votre connexion',  
              [  
                  {text: 'OK', onPress: () => console.log('OK Pressed')},  
              ]  
              );  
            break; 
          }
      }
    }
    else
    {
      Alert.alert(  
        'Information',  
        'Veuillez vérifier vos coordonnées',  
        [  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
    );  
    }
    
    //_utilisateur=getUtilisateur(username, password);
    //console.warn(_utilisateur);
  }
  console.log("setConnexionEnCours true ");
  setConnexionEnCours(false)
}

  return (

    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} >

    <ScrollView contentContainerStyle={customStyle.scrollView}>
        
      <View style={customStyle.form}>
              <Image source={require("../assets/logo.png")} style={customStyle.image}
              ></Image>

            <View style={customStyle.container}>

              <Text style={customStyle.label} >Utilisateur</Text>
              <TextInput style={customStyle.input} placeholder="Nom d'utilisateur " value={username} onChangeText={setUserName}/>  
              {
                errors.username?<Text style={customStyle.errorText}>{errors.username}</Text>:null
              }
              <Text style={customStyle.label}> Mot de passe </Text>
              <TextInput style={customStyle.input} placeholder="Mot de passe" secureTextEntry  value={password} onChangeText={setPassword}/>
              {
                errors.password?<Text style={customStyle.errorText}>{errors.password}</Text>:null
              }


        <Pressable   style={customStyle.button}  onPress={() => validerConnexion()}  >
          <Text style={customStyle.text}>Connexion</Text>
        </Pressable>

        </View>
      </View>

      </ScrollView>

</KeyboardAvoidingView>

  );
}
