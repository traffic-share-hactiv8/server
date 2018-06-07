const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    let token = req.headers.authorization;
    if (token) {
        try{
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;
            next();
        }catch(err){
            res.status(400).send({error:err})
        }
    } else {
        res.status(500).send({ error: 'empty token!' })
    }
}

module.exports = isAuthenticated;