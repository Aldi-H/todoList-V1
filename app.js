//Import library
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food"];
let workItems = [];

app.get("/", function (req, res) {
  const day = date.getDate();

  //Send result to list.ejs
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  /* console.log(req.body); */
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

//Log if server running
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
