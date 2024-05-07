import { StyleSheet} from 'react-native';


export const customStyle = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width:200,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },image: {
      flex: 1,
      justifyContent: 'center',
    },
    backg: {
      flex: 1,
      //opacity: 0.5,
      resizeMode: 'cover',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', 
      height: '100%'
    },
    container: {
      flex: 1,
      width:"100%",
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrolview: {
      flex: 1,
      width:"100%",
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: 60, 
      marginTop: 4,
      width: 200,
      opacity:0.7,
      backgroundColor: '#A0A0A0',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
    },
    button2: {
        width: 120, height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor:"#909090",
    },
    form: {
  backgroundColor: "white",
  marginTop: 50,
  padding: 20,
  margin: 10,
  borderRadius: 10,
  shadowColor: "black",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity : 0.25,
  shadowRadius: 4,
  elevation : 5
  },
  label: {
    fontSize: 12,
    margin: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    margin: 5,
    fontWeight: "bold",
  },
  textTitre: {
    fontSize: 16,
    margin: 5,
  },
  input: {
    color:"#444",
    //width: 150,
    width: "70%",
    height: 40,
    borderColor:"#777",
    borderWidth:1,
    marginBottom: 15,
    marginTop:10,
    padding: 10,
    borderRadius: 5,
  },
  selectList: {
    color:"#444",
    //width: 150,
    width: "70%",
    height: 50,
    borderColor:"#777",
    borderWidth:1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  }
  ,
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50,
  }
  ,
  errorText:
  {
  color: "red",
  marginBottom: 10,
  },
  datePicker:
  {
    height: 120,
    marginTop:-10,
  },
  pickButton:{
    paddingHorizontal:20,
  }
  
  ,
  });