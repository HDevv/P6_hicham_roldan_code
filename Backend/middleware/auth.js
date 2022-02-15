



const jwt = require('jsonwebtoken');


// on insère à 'intérieur try catch vu que de nbeux pb peuvent se produire
module.exports = (req, res, next) => {
  try {
    // ici on extrait le token du header Authorization de la req entrante 
    // et on utilise la f° SPLIT pour tout récupérer après l'espace dans le header 
    const token = req.headers.authorization.split(' ')[1];

    // on utlise la f° VERIFY pour décoder le token, s'il n'est pas valide, une err sera générée 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // on extrait l'ID utilisateur du token
    const userId = decodedToken.userId;

    // si il y a un userID, on le compare à celui extrait du token 
    // si les 2 sont différents, on renvoi une err
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {

    // une fois l'utilisateur authentifié, on passe à l'éxécution avec la f° NEXT()
      next();
    }

    //les err générées s'afficheront dans le bloc CATCH
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};