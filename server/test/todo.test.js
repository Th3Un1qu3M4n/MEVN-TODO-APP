// test/todo.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server'); // Assuming your Express app is in app.js
const Todo = require('../schemas/todo.schema'); // Assuming your Todo model is in models/todo.js

// Configure Chai
chai.use(chaiHttp);
chai.should();
mongoose.set('debug', false);


// Clear the Todo collection before running the tests
beforeEach(async () => {
  await Todo.deleteMany({});
});

// Test the GET /todo endpoint
describe('GET /todo', () => {
  it('should return all todo', async () => {
    // Create some dummy todo
    const todo1 = new Todo({ content: 'Task 1' });
    await todo1.save();

    const todo2 = new Todo({ content: 'Task 2' });
    await todo2.save();

    // Make the request to the endpoint
    const res = await chai.request(app).get('/todo');

    // Assert the response
    res.should.have.status(200);
    res.body.todoList.should.be.an('array');
    res.body.todoList.should.have.lengthOf(2);
    res.body.todoList[0].should.have.property('content').equal('Task 2');
    res.body.todoList[1].should.have.property('content').equal('Task 1');
  });
});

// Test the POST /todo endpoint
describe('POST /todo', () => {
  it('should create a new todo', async () => {
    const todoData = { content: 'New Task' };

    // Make the request to the endpoint
    const res = await chai.request(app).post('/todo').send(todoData);

    // Assert the response
    res.should.have.status(201);
    res.body.newTodo.should.be.an('object');
    res.body.newTodo.should.have.property('content').equal('New Task');
    res.body.newTodo.should.have.property('is_completed').equal(false);
    res.body.newTodo.should.have.property('completed_time').equal(null);
    res.body.newTodo.should.have.property('creation_time');

    // Assert that the todo was saved in the database
    const todo = await Todo.findOne({ content: 'New Task' });
    todo.should.exist;
  });

  it('should return an error if content is not provided', async () => {
    const todoData = { content1: 'New Task' };

    // Make the request to the endpoint
    const res = await chai.request(app).post('/todo').send(todoData);

    /// Assert the response
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.should.have.property('error');
  });

  it('should return an error if content is empty', async () => {
    const todoData = { content: '' };

    // Make the request to the endpoint
    const res = await chai.request(app).post('/todo').send(todoData);

    /// Assert the response
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.should.have.property('error');
  });
});

// Test the POST /todo/complete/:id endpoint
describe('POST /todo/complete/:id', () => {
  it('should complete a todo', async () => {
    // Create a todo to complete
    const todo = new Todo({
      content: 'Task',
      is_completed: false,
      completed_time: null,
    });
    await todo.save();

    // Make the request to the endpoint
    const res = await chai.request(app).post(`/todo/complete/${todo._id}`);

    // Assert the response
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.should.have.property('completedTodo');
    res.body.completedTodo.should.be.an('object');
    res.body.completedTodo.should.have.property('is_completed').equal(true);
    res.body.completedTodo.should.have.property('completed_time').not.equal(null);

    // Assert that the todo was updated in the database
    const updatedTodo = await Todo.findById(todo._id);
    updatedTodo.is_completed.should.equal(true);
    updatedTodo.completed_time.should.not.equal(null);
  });

  it('should return an error if todo ID is invalid', async () => {
    // Make the request to the endpoint with an invalid ID
    const res = await chai.request(app).post('/todo/complete/invalid-id');

    // Assert the response
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.should.have.property('error');
  });
});

// Test the DELETE /todo/:id endpoint
describe('DELETE /todo/:id', () => {
  it('should delete an existing todo', async () => {
    // Create a todo to delete
    const todo = new Todo({ content: 'Task' });
    await todo.save();

    // Make the request to the endpoint
    const res = await chai.request(app).delete(`/todo/${todo._id}`);

    // Assert the response
    res.should.have.status(200);

    // Assert that the todo was deleted from the database
    const deletedTodo = await Todo.findById(todo._id);
    chai.expect(deletedTodo).to.be.null;
  });

  it('should return an error if todo ID is invalid', async () => {
    // Make the request to the endpoint with an invalid ID
    const res = await chai.request(app).delete('/todo/invalid-id');

    // Assert the response
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.should.have.property('error');
  });
});

// Test the DELETE /todo endpoint
describe('DELETE /todo', () => {
    it('should delete all tasks', async () => {
      // Create some dummy tasks
      const task1 = new Todo({ content: 'Task 1' });
      const task2 = new Todo({ content: 'Task 2' });
      await task1.save();
      await task2.save();
  
      // Make the request to the endpoint
      const res = await chai.request(app).delete('/todo');
  
      // Assert the response
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('deletedTodos');
  
      // Assert that all tasks were deleted from the database
      const remainingTasks = await Todo.find();
      remainingTasks.should.have.lengthOf(0);
    });
  });

after(() => {
    process.exit(0);
  });