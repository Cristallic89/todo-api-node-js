
const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Node Todo API is running on port: ${port}`)
})

const todos = [
    { id: 1, email: "nethog@hot.ee", username:"hogwards", password:"AssaVana112!@"},
    { id: 2, email: "rusty@hot.ee", username:"rustycar", password:"AssaVana911!@"},
    { id: 3, email: "laulumiis@hot.ee", username:"laulumiis", password:"AssaVana007!@"},
    { id: 4, email: "apple@hot.ee", username:"applejuice", password:"AssaVana003!@"},
    { id: 5, email: "animatrix@hot.ee", username:"animan", password:"AssaVana005!@"},
    { id: 6, email: "rockyb@hot.ee", username:"balboa", password:"AssaVana123!@"},
]


app.get('/todos', function (req, res) {
    return res.send(todos)
});

app.get('/todos/:id', function (req, res) {
    const id = req.params.id;
    let result = null
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.id == id) { // using == instead of === because id is a string.
            result = todo;
        }
    }
    return res.send(result);
});

app.post('/todos/', function (req, res) {
    const newId = todos.length + 1;
    const newTodo = {
        id: newId,
        todo: req.body.todo,
        completed: false
    }
    todos.push(newTodo)

    return res.send(todos);
});

app.put('/todos/', function (req, res) {

    //  Find the todo to update by ID

    let todoToUpdate = todos.find((todo) => {
        return todo.id == req.body.id
    })

    todoToUpdate = {
        id: req.body.id,
        todo: req.body.todo,
        completed: req.body.completed
    };


    //  Find the index of that todo to update.

    let index = todos.findIndex((todo) => {
        return todo.id == req.body.id
    });


    // Update the todo in the list

    todos[index] = todoToUpdate;


    //  Return the response

    return res.send(todos);
});

app.delete('/todos/:id', function (req, res) {

    //  Find the index of that todo to update.
    let index = todos.findIndex((todo) => {
        return todo.id == req.params.id
    });


    todos.splice(index, 1);

    //  Return the response
    return res.send(todos);
});
