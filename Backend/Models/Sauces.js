const mongoose = require('mongoose');


//on créer un schéma de données contenant les champs souhaités pour chaque SAUCE
//avec la méthode Schéma mise à disposition par mongoose
//
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: String, required:true},
  usersDisliked: { type: String, required:true},
});


// on exporte ce schéma en tant que modèle Mongoose appelé 'Sauces'
//le rendant par la même occasion disponible pour notre application Express
module.exports = mongoose.model('Sauces', sauceSchema);