import { StyleSheet } from "react-native";

const COLORS = {Primary: "lightgray", Secondary: "lightblue"}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: Platform.OS === "android" ? 40 : 0,
    },
  
    
    navbar: {
      color: "black",
      borderBottomColor: COLORS.Primary,
      borderBottomWidth: 2,
      width: '100%',
      height: 60,
      alignItems: "center",
      justifyContent: "center"
    },
    
    navbar_text: {
      color: "black",
      fontSize: 25,
      fontWeight: 700,
    },
  
  
    input: {
      flexDirection: "column",
      width: '80%',
      height: 50,
      marginTop: 50,
      justifyContent: "center",
      alignItems: 'center',
    },
  
    textinput: {
      height: '100%',
      width: '80%',
      textAlign: 'center',
    },
    submit: {
        width: '50%',
        margin: 5,
    },  
  
  
    container2: {
      // flex: 1,
      width: '100%',
      marginTop: 40,
    },
    todo: {
      flexDirection: "row",
    },
    text: {
      color: "black",
      fontSize: 20,
    },
    nodes: {
      // backgroundColor: "lightgray",
      borderColor: COLORS.Primary,
      borderWidth: 2,
      width: '80%',
      // alignItems: "center",
      padding: 30,
      marginBottom: 20,
    },
    sub_container: {
      width: '100%',
    },
  
    button: {
      width: '20%',
      padding: 6,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      marginBottom: 20,
      backgroundColor: COLORS.Secondary,
  
    }
  
  });
  

export default styles;