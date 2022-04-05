const express = require("express");
const path = require('path');
const cors = require("cors");

const app = express();
const { checkToken } = require('./app/routes/middlewares');

var corsOptions = {
  origin: "http://localhost:8082"
};

//app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TFGEdix application." });
});


require("./app/routes/comercial.routes")(app);
require("./app/routes/oficinas.routes")(app);

//Static Files
var public = path.join(__dirname, '/app/imagenes');
//Con autorizacion
//app.use('/imagenes', checkToken ,express.static(public));
//Sin autorizacion
app.use('/imagenes' ,express.static(public));
// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
