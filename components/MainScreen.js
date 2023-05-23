import React, { useState } from 'react'
import styles from "./styles"
import {
  SafeAreaView,
  View,
  ScrollView,
  // Pressable,
  Text
} from 'react-native'

import { useForm, Controller } from "react-hook-form";

import { Pressable,Flex, Input, Button, NativeBaseProvider } from 'native-base';

import * as yup from 'yup';



export default function MainScreen() {

  console.log("ana hna")

  const validationSchema = yup.object().shape({
    noteSs: yup.string(),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    // defaultValues: {
    //   noteSs: ''
    // }
  })

  const [todoList, setTodoList] = useState([]);

  let key = -1;


  const validateField = async (fieldValue) => {
    try {
      await validationSchema.validate(fieldValue);
      return true;
    } catch (error) {
      return error.message;
    }
  };



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
    console.log("ana hna")

    if (!data.noteSs.empty) {
      let newArray = todoList;
      newArray.push(data.noteSs);
      console.log(newArray);
      data.noteSs = "";
      
      setTodoList(newArray)
    }
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {/* Title */}
        <View style={styles.navbar}>
          <Text style={styles.navbar_text}>Notes App</Text>
        </View>





        {/* Inpuut */}

        <View style={styles.input}>

          <Controller
            control={control}
            rules={{
              required: true,
              // minLength: 5,
              // validate: validateField,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input w="100%" h="100%" style={styles.textinput} placeholder="Add Your Note"  onChangeText={onChange} value={value} />
            )}
            name="noteSs"
          />
          {/* {errors.noteSs && <Text>{errors.noteSs.message}</Text>} */}
          <Button style={styles.submit} onPress={handleSubmit(onSubmit)} >Submit</Button>
        </View>




        {/* All todos */}

        <Flex style={styles.container2}>

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
        </Flex>

      </SafeAreaView>
    </NativeBaseProvider>
  )
}






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
