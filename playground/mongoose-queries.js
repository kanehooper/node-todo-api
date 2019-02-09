 const {ObjectID} = require('MongoDB');
 
 const {mongoose} = require('./../server/db/mongoose');
 const {User} = require('./../server/models/user');

let id = '5c5c14a38ffae4553a6c95d9';

// Add to MongoDB section
if (!ObjectID.isValid(id)) {
    console.log('Invalid ID');
}

// Add to Mongoose find
User.find({
    _id: '5c5c14a38ffae4553a6c95d9'
}).then((user) => {
    if (!user) {
        return console.log('User ID not found');
    }
    console.log(user);
})

// Add to Mongoose findByID
 User.findById(id)
    .then((user) => {
        if (!user) {
            return console.log('User ID not found');
        }
        console.log(user);
    }).catch((err) => {
        console.log(err);
    })