console.clear();

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('Mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    })
    
    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

// GST /todos/12345
// :id this creates an id variable on the request object
app.get('/todos/:id', (req, res) => {
    // the paramas property holds an object of paramaters sent through the route
    // This id paramater can be set
    let id = req.params.id;
    
    // Firstly check that the ObjectID is valid
    if (!ObjectID.isValid(id)) {
        res.status(404).send({
            error: 'Not a valid ID'
        });
    }

    Todo.findById(id)
        .then((todo) => {
            if (todo) {
                // Wrap it in an object to be able to add customer properties later
                res.send({todo});
            } else {
                // Return a 404 as not found
                res.status(404).send({
                    error: 'That ID does not exist'
                });
            }
        }, (err) => {
            //Return a 400 as an invalid request
            // We don't want to return the error object to the client
            res.status(400).send({});
        });

});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {
    app
}