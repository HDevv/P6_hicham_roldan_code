const bcrypt = require('bcrypt');

const User = require('../Models/User');

const jwt = require('jsonwebtoken');

// la méthode HASH de bcrypt crée un hash crypté de mdp 
// de nos utr pour les enregistrer de manière sécurisée dans la b. de données


exports.signup = (req, res, next) => {
  console.log(req.body);
  //on appelle la f° de hashage bcrypt
  //on lui demande de "saler" le mdp 10 fois
  // + la valeur sera élevée, + l'exécution de la fonction sera longue
  // et + le hashage sera sécurisé
    bcrypt.hash(req.body.password, 10)

    // c'est une f° asynchrone qui renvoie une Promise dans laquelle nous
    // recevons le hash généré
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
        // dans le bloc THEN, on créer un utilisateur et l'enregistrons
        // dans la b. de données
        // en renvoyant un rep réussie en cas de succès
        // et des err en cas d'échec
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };