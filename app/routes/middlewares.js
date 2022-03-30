const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');


const checkToken = (req, res, next) => {

    // 1 - Comprobamos si la cabecera existe
    if (!req.headers['authorization']) {
        // Si la cabecera no existe, devolvemos el error
        return res.json({ error: 'Necesitas la cabecera de autorización'})
    }
    // 2 - Comprobamos si el token enviado es correcto
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
         bearerToken = bearerHeader.split(" ")[1];
    }
    try {
        payload = jwt.verify(bearerToken, 'EdixSecretKey');
    } catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }
    // 3 - Comprobamos la fecha de caducidad
    if (dayjs().unix() > payload.exp) {
        return res.json({ error: 'El token está caducado, pide otro' })
        }
    // Las comprobaciones pasan
    req.token  = bearerToken;
    next(); 
}

module.exports = {
    checkToken
}
