// ici, on créer notre propre modèle utlisateur
//

const mongoose = require('mongoose');

//cette const s'assure que 2 utr ne puissent pas avoir la mm ad mail
// mongoose-unique-validator améliore les msg d'err lors de l'enregistrement de données uniques
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);