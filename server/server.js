console.clear();

const express = require('express');
// What is body parser
const bodyParser = require('body-parser');

// Desctructuring here to get directly at the properties
let {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

// What happens when we call express as a method here?
// express() function is a top-level function exported by the express module
// A top level function is one associated with the global object, not a sub object
// Creates an Express application
// The app object has methods for:
// Routing HTTP requests
// Configuring middleware
// Rendering HTML
// Registering a template engine
// It also has settings properties
const app = express();

// Need to understand this better
app.use(bodyParser.json());

// What is the post method
// The post method sends data to the server to create/update a resource
// What is a REST API - stateless, client-server protocol using HTTP
//                    - treats server objects as resources that can be created or destroyed
//                    - works based on HTTP methods
// What are web APIs - a contract between a req and response specifies the request format
// Representational - It sends a representation of the resource, such as HTML, the image data, JSON etc.
// State - Each time we request a new resource within an app we get a new state
// Trasfer - Coming from the server to the client
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    })
    
    todo.save()
        .then((doc) => {
            // This returns the completed doc to teh user
            res.send(doc);
        }, (err) => {
            // Sends back the error
            // Status returns the HTTP code
            res.status(400).send(err);
        })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})
