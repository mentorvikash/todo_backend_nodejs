const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 4000

let todo = [{ id: 1, task: "buy 1kg milk" }, { id: 2, task: "buy fruits" }]

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("welcome to todo")
})

app.get("/todo", (req, res) => {
    res.json(todo)
})

app.post("/todo", (req, res) => {
    const data = req.body
    const newTodo = {
        id: todo.length + 1,
        todo: data.task
    }
    todo.push(newTodo)
    console.log({ todo })
    res.json({ message: "new todo created", data: newTodo })
})

app.put("/todo/:id", (req, res) => {
    const id = req.params.id
    const index = todo.findIndex(singleTodo => singleTodo.id == id)
    const task = req.body.task
    const newTodo = { id: id, task: task }
    todo[index] = newTodo
    res.json({ message: "todo list updated", data: newTodo })
})

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id
    const index = todo.findIndex(singleTodo => singleTodo.id == id)
    const task = req.body.task
    todo[index].task = task
    res.json({ message: "todo list updated", data: todo[index] })
})

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id
    console.log({ id })
    const newodso = todo.filter(singletodo => singletodo.id != id)
    console.log({ newodso })
    todo = newodso
    res.json({ message: "your task with id " + id + " is deleted" })
})

app.get("*", (req, res) => {
    res.send("page not found")
})

app.listen(port, () => {
    console.log("listening on port " + port)
})
