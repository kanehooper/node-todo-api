const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// This will remove all the documents from the collection
// Todo.delete({}).then((result) => {
//     console.log(result);
// });

// This will find one and remove the first document found and return
// the document
// Todo.findOneAndDelete();

// This will find the document by the ID, remove it and return the document
Todo.findByIdAndDelete('5c5e63c62154b370bbd667df')
    .then((doc) => {
        console.log(doc);
    });