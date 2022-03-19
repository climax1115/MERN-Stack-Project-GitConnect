const jwt = require('jsonwebtoken'); 
const config = require('config'); 

//access to the req, res cycle, next is the next callback so it can move on to the next middle ware 
module.exports = function(req, res, next) {
    //retrieve token from the client header 
    const token = req.header('x-auth-token'); 
    //check to see if there is no token in header 
    if(!token) {
        return res.status(401).json({ msg: 'Authorization denied, no token existed' }); 
    }
    //verify token and decode token 
    try {
        const decodedToken = jwt.verify(token, config.get('jwtSecret'))

        req.user = decodedToken.user; 
        next(); 
    } catch(err) {
        res.status(401).json({ msg: 'Invalid Token' })
    }
}