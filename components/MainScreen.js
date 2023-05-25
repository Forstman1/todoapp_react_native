import React, { useState } from 'react';
import styles from "./styles"
import { SafeAreaView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Pressable, Flex, Input, Button, NativeBaseProvider, Text, Spinner, ScrollView } from 'native-base';
import * as yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';



const validationSchema = yup.object().shape({
  noteSs: yup.string().required('Note is required').min(5, 'Note must be at least 5 characters'),
});



const fetchTodoList = async () => {
  const response = await fetch('http://localhost:4000/api/todolist');
  const data = await response.json();
  return data;
};



const addTodo = async (content) => {
  const response = await fetch('http://localhost:4000/api/addtodo', {
    method: 'POST',
    body: JSON.stringify({content}),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  return data;
};
 
 
const deleteTodo = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/api/deletetodo/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the todo.');
  }
};




const MainScreen = () => {

  const [todoList, setTodoList] = useState([]);

  const { control, handleSubmit, formState: { errors } } = useForm();


  const { isLoading, isError } = useQuery(['todoList'], fetchTodoList, {
    onSuccess: (data) => {
      setTodoList(data);
    },
  });


  const addTodoMutation = useMutation(addTodo, {
    onSuccess: (data) => {
      setTodoList((prevList) => [...prevList, data]);
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: (_, id) => {
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {

    try {
      const isValid = await validationSchema.validate(data);
      if (isValid) {
          await addTodoMutation.mutateAsync(data.noteSs);
          data.noteSs = '';
      }
    } catch (error) {
      console.error(error);
      return error
    }
  };




  return (
    <NativeBaseProvider>

      <SafeAreaView style={styles.container}>


        {/* Title */}
        
        <View style={styles.navbar}>
          <Text style={styles.navbar_text}>Notes App</Text>
        </View>






        {/* Input */}

        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                w="100%"
                h="100%"
                style={styles.textinput}
                placeholder="Add Your Note"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="noteSs"
          />
          {errors.noteSs && <Text>{errors.noteSs.message}</Text>}
          <Button style={styles.submit} onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </View>


 
 


        {/* All todos */}
 
 
        <Flex style={styles.container2}>


          <ScrollView style={styles.sub_container}>
            {isLoading ? (
              <Spinner accessibilityLabel="Loading posts" />
            ) : isError ? (
              <Text>Error occurred while fetching data.</Text>
            ) : (
              todoList.map((element) => {
                return (
                  <View key={element.id} style={styles.todo}>
                    <View style={styles.nodes}>
                      <Text style={styles.text}>{element.content}</Text>
                    </View>
                    <Pressable style={styles.button} onPress={() => handleDelete(element.id)}>
                      <Text color={"white"}>Done</Text>
                    </Pressable>
                  </View>
                );
              })
            )}
          </ScrollView>


          
        </Flex>
      </SafeAreaView>
     </NativeBaseProvider>

  );
};

export default MainScreen;

