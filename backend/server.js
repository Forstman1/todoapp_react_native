

const express = require('express')
const { PrismaClient } = require('@prisma/client');


const app = express()
const prisma = new PrismaClient();

app.use(express.json())



app.get('/api/todolist', async (req, res) => {
    setTimeout(async () => {
      try {
        const todoList = await prisma.Todo.findMany();
          res.json(todoList);
          res.end()
        } catch (error) {
          console.log(error);
          res.end();
        }
    }, 1000);
    
})



app.post('/api/addtodo', async (req, res) => {
  
    let { content } = req.body;

    try {
      const newTodo = await prisma.Todo.create({
        data: {
          content: content, 
        },
      });
      res.json(newTodo);
    } catch (error) {
      console.log(error);
      res.end()
    }
});



app.delete('/api/deletetodo/:id' , async (req, res) => {

  const {id } = req.params;
  let id_num = parseInt(id)
  try {
    const todo = await prisma.todo.delete({
      where: {
        id: id_num,
      }
    })
    res.json(todo)
  }
    catch (error)
    {
      console.log(error)
      res.end()
    }
})


app.listen(6000, () => {
    console.log("server running on port 6000")
})
