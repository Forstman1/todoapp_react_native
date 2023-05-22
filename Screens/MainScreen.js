import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Platform, ScrollView, TextInput,Pressable , Button , Text} from 'react-native'
import { useForm, Controller } from "react-hook-form";

// import { Button, Text, Input } from 'native-base';
import { NativeBaseProvider, Box } from "native-base";



export default function MainScreen() {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      noteSs: ''
    }
  })

  const [todoList, setTodoList] = useState([]);

  const [text, setText] = useState('');
  let key = -1;




  const handleInputChange = (inputText) => {
    setText(inputText);
  }



  const handleButtonPress = () => {
    console.log(`Input text: ${text}`);
    if (text != "") {
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
      if (i == 0 && item === element) {
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
    i = 0

    setTodoList(newData)
    console.log(todoList, key)

  }


  const onSubmit = (data) => {
    if (data.noteSs != "") {
      let newArray = todoList
      newArray.push(data.noteSs)
      console.log(newArray)
      
      setTodoList(newArray)
    }
    console.log("ana hna")
  }



  {/* <View style={styles.input}>
        <TextInput
          placeholder="Add your Todos"
          value={text}
          onChangeText={handleInputChange}
          style={styles.textinput}
        />
        <Button title="Submit" onPress={handleButtonPress} />
      </View> */}



      
  return (
    <SafeAreaView style={styles.container}>
      {/* <NativeBaseProvider> */}

        <View style={styles.navbar}>
          <Text style={styles.navbar_text}>Notes App</Text>
        </View>

 
  


        {/* <Box style={{height: 80}}>
          <Controller 
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input  placeholder="note"  onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="noteSs"
          />
          <Button  onPress={handleSubmit(onSubmit)}>Submit</Button>
        </Box>  */}


      <View style={styles.input}>
        {/* <TextInput
          placeholder="Add your Todos"
          value={text}
          onChangeText={handleInputChange}
          style={styles.textinput}
        /> */}
          <Controller 
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput  placeholder="note"  onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="noteSs"
          />

        <Button title="Submit" onPress={handleButtonPress} />
      </View>
 
 

        <View style={styles.container2}>


          <ScrollView style={styles.sub_container}>
            {
              todoList.map(element => {

                console.log(element)
                key++
                return (
                  <View style={styles.todo}>
                    <View style={styles.nodes}>
                      <Text style={styles.text}>{element}</Text>
                    </View>
                    <Pressable style={styles.button} onPress={() => handelDelete(element)}>
                      <Text>Done</Text>
                    </Pressable>

                  </View>

                )
              })
            }
          </ScrollView>
        </View>




      {/* </NativeBaseProvider> */}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Platform.OS === "android" ? 40 : 0,
  },

  
  navbar: {
    color: "black",
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
    width: '100%',
    height: 70,
    alignItems: "center",
    justifyContent: "center"
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
    // flex: 1,
    width: '100%',
    marginTop: 20,
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
