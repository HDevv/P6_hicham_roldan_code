const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");

const app = express();

const mongoose = require("mongoose");

//on importe le fichier Sauces
const saucesRoutes = require('./Routes/sauces');

const userRoutes = require('./Routes/Users');

// importation pour accéder au PATH de notre serveur
const path = require('path'); 

//la méthode app.use() permet d'attribuer un middleware à une route spécifique 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// on implémente CORS pour assurer que le front puisse effectuer 
// des appels vers l'API en toute sécurité
app.use(cors());

// ajoute le gestionnaire de routage 
// indique à Express qu'il faut gérer de manière statique la ressource 'images'
// à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

//nous enregistrons notre router pour toutes les demandes éffecutées 
//vers api/sauces
app.use('/api/sauces', saucesRoutes);



app.use('/api/auth', userRoutes);



mongoose
  .connect(
    "mongodb+srv://Hicham017:3bYLVYFdKfbivNq@cluster0.nx6lf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


// les setHeader servent à :

app.use((req, res, next) => {
  
  // accéder à notre API depuis n'importe quelle origine '*'
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    // ajouter les headers "Access-Control ect.." aux requ^tes envoyées vers notre API
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    // envoyer des req avec les méthodes mentionnées (GET, POST, ect)
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


module.exports = app;
