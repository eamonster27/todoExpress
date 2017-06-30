const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mustache = require("mustache-express");

app.engine('mustache', mustache());

app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

const todos = [
  {task: "Wash the car" },
  {task: "Do the laundry"}
];

const completed = [
  {complete: "Clean room" },
  {complete: "This"}
];

app.get("/", function (req, res) {
  res.render('index', { completed: completed, todos: todos });
});

app.post("/", function (req, res) {
  if(req.body.task !== ""){
    todos.push({task: req.body.task});
  }
  res.redirect("/");
});

app.post("/completed", function (req, res) {
  console.log(req.body.complete);
  for(let i = 0; i < todos.length; ++i){
    if(todos[i].task === req.body.complete){
      todos.splice(i, 1);
    }
  }
  completed.push({complete: req.body.complete});
  res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server launch on 3000 successful!");
});
