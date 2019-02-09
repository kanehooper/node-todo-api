console.clear();

// Add configuration information
require('./config/config');

// Third party modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

// Internal modules
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


// Create an Express app
const app = express();
const port = process.env.PORT;

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

// PATCH /todos
// Patch allows us to update a resource
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // _.pick pulls off properties of req.body and adds them to the body variable
    // req.body holds the data from the body sent with the PATCH request
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            error: 'Not a valid ID'
        });
    };

    // _.siBoolean checks if a value is a boolean and returns true or false
    if (_.isBoolean(body.completed) && body.completed) {
        body.completeAt = new Date().getTime();
    } else {
        body.complete = false;
        body.completeAt = null;
    }

    // This is the Mongoose update method
    Todo.findByIdAndUpdate(id, {
        $set: body
    },
    {
        new: true
    }).then((todo) => {
        if (todo) {
            res.status(200).send({
                todo,
                status: 'Todo updated'
            });
        } else {
            res.status(404).send({
                error: "No Todo found"
            })
        }
    }).catch((err) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// Export app for testing
module.exports = {
    app
}