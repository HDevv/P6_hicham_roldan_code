const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const saucesRoutes = require('./Routes/sauces');

const userRoutes = require('./Routes/Users');

const path = require('path');

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Hicham017:3bYLVYFdKfbivNq@cluster0.nx6lf.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


module.exports = app;
