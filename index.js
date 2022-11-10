
const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Node user API is running on port: ${port}`)
})

const users = [
    { id: 1, email: "nethog@hot.ee", username:"hogwards", password:"AssaVana112!@"},
    { id: 2, email: "rusty@hot.ee", username:"rustycar", password:"AssaVana911!@"},
    { id: 3, email: "laulumiis@hot.ee", username:"laulumiis", password:"AssaVana007!@"},
    { id: 4, email: "apple@hot.ee", username:"applejuice", password:"AssaVana003!@"},
    { id: 5, email: "animatrix@hot.ee", username:"animan", password:"AssaVana005!@"},
    { id: 6, email: "rockyb@hot.ee", username:"balboa", password:"AssaVana123!@"},
]


app.get('/users', function (req, res) {
    return res.send(users)
});

app.get('/users/:id', function (req, res) {
    const id = req.params.id;
    let result = null
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.id == id) { // using == instead of === because id is a string.
            result = user;
        }
    }
    return res.send(result);
});

app.post('/users/', function (req, res) {
    const newId = users.length + 1;
    const newuser = {
        id: newId,
        user: req.body.user,
        completed: false
    }
    users.push(newuser)

    return res.send(users);
});

app.put('/users/', function (req, res) {

    //  Find the user to update by ID

    let userToUpdate = users.find((user) => {
        return user.id == req.body.id
    })

    userToUpdate = {
        id: req.body.id,
        user: req.body.user,
        completed: req.body.completed
    };


    //  Find the index of that user to update.

    let index = users.findIndex((user) => {
        return user.id == req.body.id
    });


    // Update the user in the list

    users[index] = userToUpdate;


    //  Return the response

    return res.send(users);
});

app.delete('/users/:id', function (req, res) {

    //  Find the index of that user to update.
    let index = users.findIndex((user) => {
        return user.id == req.params.id
    });


    users.splice(index, 1);

    //  Return the response
    return res.send(users);
});
