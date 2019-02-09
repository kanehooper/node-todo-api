const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Creating seed data to the database
const todos = [{
    // Create new object IDs
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}]

// Set up the test database
beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            Todo.insertMany(todos);
        })
        .then(() => done());
});

// Route tests
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } 

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err)); 
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
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo by ID', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('That ID does not exist');
            })
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/1234')
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('Not a valid ID');
            })
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a document by id', (done) => {
        let id = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
                expect(res.body.status).toBe('Todo deleted');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(id)
                    .then((todo) => {
                        expect(todo).toBeNull();
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
    });

    it('should return a 404 for invalid record', (done) => {
        request(app)
            .delete('/todos/124abc')
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('Not a valid ID');
            })
            .end(done);
    });

    it('should return a 404 for no document found', (done) => {
        let id = new ObjectID().toHexString();
        
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('Todo not found');
            })
            .end(done);
    });
});