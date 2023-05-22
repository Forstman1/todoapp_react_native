import React, { useEffect, useState } from 'react'
import { Dimensions, Display, View, SafeAreaView, Text, Button, StyleSheet, Platform, TextInput, ScrollView, Pressable } from 'react-native'
import { useForm } from "react-hook-form";



export default function MainScreen() {

  const [todoList, setTodoList] = useState([]); 

  const [text, setText] = useState('');
  let key = -1;




  const handleInputChange = (inputText) => {
    setText(inputText);
  }


  const handleButtonPress = () => {
    console.log(`Input text: ${text}`);
    if (text != "")
    {
      let newArray = todoList
      newArray.push(text)
      setTodoList(newArray)
    }
    setText("")
    console.log(todoList)
  }



  const handelDelete = (element) => {
    let newData = todoList
    let i = 0;

    newData = newData.filter(item => {
      if (i == 0 && item === element)
      {
        i = 1
        return 0
      }
      else if (i == 1 && item === element)
        return 1;
      else
        return item !== element;
    })
    newData = newData.filter(item => {
      return item !== "";
    })
    i =  0
    setTodoList(newData)          
    console.log(todoList, key)

  }


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
            <Text style={styles.navbar_text}>Notes App</Text>
            <Pressable onPress={deleteEveryTodo}><Text>Reset </Text></Pressable>
        </View>

        // handling input
        <View style={styles.input}>
            <TextInput
              placeholder="Add your Todos"
              value={text}
              onChangeText={handleInputChange}
              style={styles.textinput}
            />
            <Button title="Submit" onPress={handleButtonPress} />
        </View>




        <View style={styles.container2}>
          <ScrollView style={styles.sub_container}>
          {
            todoList.map(element => {
                key++
                return <View key={key} style={styles.todo}><View style={styles.nodes}>
                  <Text style={styles.text}>{element}</Text>
                  </View>
                <Pressable style={styles.button}  onPress={() => handelDelete(element)}>
                  <Text>Done</Text>
                 </Pressable>
                </View>
          } )
          }
          </ScrollView>
        </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: Platform.OS === "android" ? 40 : 0,
    },
    navbar: {
        color: "black",
        borderBottomColor: "lightgray",
        borderBottomWidth: 2,
        width: '100%',
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    navbar_text: {
        color: "black",
        fontSize: 25,
        fontWeight: 700,
    },


    input: {
      flexDirection: "row",
      height: 40,
      margin: 10,
      justifyContent: "space-between",
    },
    textinput: {
      width: '50%',
      backgroundColor: "lightgray",
    },
    delete: {
    },

    container2: {
      flex: 1,
      width: '100%',
      marginTop: 20,
    },
    todo: {
      flexDirection: "row",
    },
    text : {
        color: "black",
        fontSize: 20,
    },
    nodes : {
        // backgroundColor: "lightgray",
        borderColor: "lightgray",
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
      backgroundColor: "lightblue",

    }

  });
  