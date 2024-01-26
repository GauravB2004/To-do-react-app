const mongoose = require ("mongoose");
const { string } = require("zod");


mongoose.connect("mongodb+srv://cdab89565:nM5xAq37xGZdyGrH@cluster0.hzcbgvl.mongodb.net/todos")
const todoSchema = mongoose.Schema({
 title: string,
 description: string,
 completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);
module.exports = {
    todo
}