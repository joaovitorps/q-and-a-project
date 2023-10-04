const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const AskModel = require("./database/Ask");
const ReplyModel = require("./database/Reply");

connection
  .authenticate()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
// var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  var name = req.params.name;
  var age = 22;
  var products = [
    { name: "Mamao", price: 2.5 },
    { name: "Egg", price: 12 },
    { name: "Whey", price: 60 },
  ];

  AskModel.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    res.render("index", {
      questions: questions,
      title: "Welcome",
      name: name,
      age: age,
      products: products,
    });
  });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/ask", urlencodedParser, (req, res) => {
  var question = { title: req.body.title, description: req.body.description };

  AskModel.create(question).then(() => {
    res.redirect("/");
  });
});

app.get("/question/:id", (req, res) => {
  var id = req.params.id;

  AskModel.findOne({ raw: true, where: { id: id } }).then((question) => {
    if (question != undefined) {
      ReplyModel.findAll({
        raw: true,
        where: { ask_id: id },
        order: [["id", "DESC"]],
      }).then((replies) => {
        res.render("question", {
          question: question,
          replies: replies,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/reply", urlencodedParser, (req, res) => {
  var reply = { body: req.body.body, ask_id: req.body.ask_id };

  ReplyModel.create(reply).then(() => {
    res.redirect("/question/" + reply.ask_id);
  });
});

app.listen(8000, (err) => {
  if (err) {
    console.log(err + " Error");
  } else {
    console.log("Running");
  }
});
