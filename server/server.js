const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

// Create a model
// A model refers to the structure and layout of a database 
// and how the data will be stored
// The mongoose model tells it how to store the data

// Why is Todo capitalised
// mongoose.model must return a constructor function
// The model, models the document structure
// Mongoose will create the collection by taking the model name, pluralising it and making it all lowercase
var Todo = mongoose.model('Todo', {
    // Properties of the model
    text: {
        // This is a String constructor
        type: String
    },
    completed: {
        type: Boolean
    },
    completeAt: {
        type: Number
    }
});

// What is this?
// This is creating a new instance of the Todo model to create a new document based
// on this model
// The argumnet is an object where we can specify the document properties

var newTodo = new Todo({
    text: 'Cook dinner',
    completed: false
});

// This will save the instance of Todo to the database
// This returns a promise, the success callback is passed the document that is saved
newTodo.save()
    .then((doc) => {
        console.log('Saved todo', JSON.stringify(doc, undefined, 2));
    }, (e) => {
        console.log('Unable to save todo');
    });

// The _v is the version number for changes to the model over time

// Challenge
newTodo = new Todo({
    text: 'Eat my shorts',
    completed: true,
    completeAt: 0
});

newTodo.save()
    .then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        console.log(err);
    });

