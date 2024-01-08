const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      incrementedIndex: function (index) {
        return index + 1;
      },
      checkInputValue: function (input, value, options) {
        var fnTrue = options.fn,
          fnFalse = options.inverse;
        if (input == value) {
          return fnTrue();
        } else {
          return fnFalse();
        }
      },
    },
  })
);
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000);
