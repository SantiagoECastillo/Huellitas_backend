const jwt = require("jsonwebtoken");

const comprobacionJWT = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        return res.status(400).json("Acesso denegado");
    }
    try {
        const verificacionToken  = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = verificacionToken;
        next();
    } catch (error) {
        res.status(400).json("Token no valido");
        console.log(error);
    }
}

module.exports = comprobacionJWT;