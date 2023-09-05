const jwt = require("jsonwebtoken");


const authencateToken = (req, res, next) => {
    const authHeader = req.header("authorization");

    if(!authHeader) {
        return res.status(401).json({message: 'Unothorized'});
    }
    
    const token = authHeader.split(' ')[1];

    if(!token) {
        res.status(401).json({message: 'Unothorized'});
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                res.status(401).json({message: 'Unothorized 2'});
            }
            else {
                req.user = user;
                next();
            }
        });
    }
};

module.exports = authencateToken;