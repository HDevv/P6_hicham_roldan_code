//création d'un router Express
const express = require('express');
const router = express.Router();
//---------------------------------



const auth = require('../middleware/auth');

//on ajoute le middleware MULTER
//veiller à placer M après AUTH, m'orde des middlewares est important !
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../Controllers/sauces');

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;

// ici on importe le middleware de d'authentification 