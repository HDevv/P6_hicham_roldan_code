const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const saucesRoutes = require('./Routes/sauces');

const userRoutes = require('./Routes/Users');

const path = require('path'); 

// on implémente CORS pour assurer que le front puisse effectuer 
//des appels vers l'API en toute sécurité
app.use(cors());

//la méthode app.use() permet d'attribuer un middleware à une route spécifique 
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


// les setHeader servent à :
// accéder à notre API depuis n'importe quelle origine '*'
// ajouter les headers "Access-Control ect.." aux requ^tes envoyées vers notre API
// envoyer des req avec les méthodes mentionnées (GET, POST, ect)
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
