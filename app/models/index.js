const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.comerciales = require("./comercial.model.js")(mongoose);
db.oficinas = require("./oficinas.model.js")(mongoose);
db.emailcontact = require("./emailcontact.model.js")(mongoose);

module.exports = db;
