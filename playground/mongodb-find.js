console.clear();

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Error connection to the MongoDB server');
    }
    console.log('Connected to MongoDB server');
    let db = client.db('TodoApp');

    // db.collection('Todos')
    //     .find({
    //         _id: new ObjectID('5c5979a09d2d1d07965f10a0')
    //     })
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err);
    //     }
    // );

    db.collection('Todos')
        .find()
        .count()
        .then((count) => {
            console.log(`Todos count: ${count} `);
        }, (err) => {
            console.log('Unable to fetch todos', err);
        }
    );

    db.collection('users')
        .find({
            name: 'Kane'
        })
        .toArray()
        .then((doc) => {
            console.log(JSON.stringify(doc, undefined, 2));
        }, (err) => {
            console.log(err);
        }
    );

    client.close();
} )