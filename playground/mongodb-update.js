console.clear();
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.log('Could not connect to the database');
    }
    console.log('Connected to the MongoDB server');
    var db = client.db('TodoApp');

    // // findOneAndUpdate
    // db.collection('Todos')
    //     .findOneAndUpdate({
    //         _id: new ObjectID('5c597838cc7d93077e8dde11')
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     })
    //     .then((result) => {
    //         console.log(JSON.stringify(result, undefined, 2));
    //     })

    // client.close();
    db.collection('users')
        .findOneAndUpdate({
            _id: new ObjectID('5c5a9eaa8c5d161a4ed9a955')
        }, {
            $set: {
                name: 'Jimbo'
            },
            $inc: {
               age: 1 
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(JSON.stringify(result, undefined, 2));
        })

})