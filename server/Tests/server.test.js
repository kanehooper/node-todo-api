const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


// This is a Mocha function that is run before each test and async
beforeEach((done) => {
    // The remove method with {} removes all documents from the database
    Todo.remove({})
        .then(() => {done()});
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            // This sends data to the post route
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            // This callback function will
            // Handle any errors up above
            // 
            .end((err, res) => {
                if (err) {
                    // This will return an error to the screen and complete the test
                    return done(err);
                } 

                // The following checks that the document was created in the database
                // .find() returns all of the todos in the collection
                // .find() returns a promise
                Todo.find().then((todos) => {
                    // Only one record will be in this test database so length should be 1
                    expect(todos.length).toBe(1);
                    // We take the first record and and check it's text against the text variable above
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err)); // Catch at the end of the promise catches all errors and will print the error in the done method
            });
    });
    
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
})