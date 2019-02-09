console.clear();

// Third party modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('Mongodb');

// Internal modules
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Express Middleware
app.use(bodyParser.json());

// Routes:
// POST /todos route
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

// GET /todos route
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

// GET /todos/:id route
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            error: 'Not a valid ID'
        });
    };

    Todo.findById(id)
        .then((todo) => {
            if (todo) {
                res.send({todo});
            } else {
                res.status(404).send({
                    error: 'That ID does not exist'
                });
            }
        }, (err) => {
            res.status(400).send({});
            console.log(err);
        });

});

// DELETE /todos/:id route
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            error: 'Not a valid ID'
        });
    };

    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (todo) {
                res.status(200).send({
                    todo,
                    status: 'Todo deleted'
                });
            } else {
                res.status(404).send({
                    error: 'Todo not found'
                })
            };
        })
        .catch((err) => {
            res.status(400).send({
                error: 'Invalid request'
            });
        });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// Export app for testing
module.exports = {
    app
}