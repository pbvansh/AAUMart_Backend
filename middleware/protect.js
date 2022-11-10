
const JWT = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).send('Access denied. Not Authenticated...');
        }

        try {
            const secret = process.env.JWTSECRET;
            console.log(secret);
            const user = JWT.verify(token, secret);
            console.log(user)
            req.user = user;
            next();
        } catch (ex) {
            console.log(ex);
            res.status(400).send('Access denied. Invalid auth token...');
        }
    }else{
        res.status(400).send('Not Authorze')
    }
}


const isAdmin = (req, res, next) => {
    protect(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send('Access denied. Not Authenticated...');
        }
    })
}


module.exports = {
    protect,
    isAdmin,
}