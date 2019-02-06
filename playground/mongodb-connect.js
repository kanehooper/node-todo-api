const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     test: "Something to do",
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todo');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // db.collection('users').insertOne({
    //     name: 'Kane',
    //     age: 39,
    //     location: 'Melbourne'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert data');
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    // })

    client.close();
});