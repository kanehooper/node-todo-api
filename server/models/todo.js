// Add the mongoose library
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    // Properties of the model
    text: {
        // This is a String constructor
        type: String,
        // Validators
        required: true, // The value must exist
        minlength: 1, // Sets the minimum length
        trim: true // Removes leading or trailing whitespace
    },
    completed: {
        type: Boolean,
        default: false // Sets the default value
    },
    completeAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};