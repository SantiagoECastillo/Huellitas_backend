const jwt = require("jsonwebtoken");

/*Esto sera para proteger las rutas de los usarios, tengo que comprobar esto antes de pedir turno  */
const valicadionToken = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({
            message: "NO token, autorizacion denegada"
        })
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { /*decodec es el usuario que tiene ese token */
        if(err) return res.status(401).json({message: "Token invalido"});
        req.user = decoded;
        next();
    })
}

module.exports = valicadionToken;