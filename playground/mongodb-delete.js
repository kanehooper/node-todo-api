 console.clear();

 const {MongoClient, ObjectID} = require('mongodb');

 MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
     if (err) {
         console.log('Cannot connect to the database', err);
     }
     console.log('Connected to MongoDB server');
     var db = client.db('TodoApp');

     // deleteMany
    //  db.collection('Todos')
    //     .deleteMany({
    //         text: 'Eat lunch'
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }
    // );

     // deleteOne
    //  db.collection('Todos')
    //     .deleteOne({
    //         text: 'Eat lunch'
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }
    // );
        
    // findOneAndDelete
    db.collection('Todos')
        .findOneAndDelete({
            completed: false
        })
        .then((result) => {
            console.log(result);
        }, (err) => {
            console.log(err);
        })

    //  client.close();
 })