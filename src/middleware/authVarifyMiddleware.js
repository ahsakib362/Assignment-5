var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    let token = req.headers['token-key'];

    jwt.verify(token,"secretKey54321",function(err,decoded){
        if(err){
            res.status(401).json({status:"Unauthorized Login"})
        }
        else{

            // Get Username from decoded token And add with request header.
            let username = decoded['data']['Username'];
            req.headers.username = username;

            //Get Uername from URL autentication.
            next();
        }
    })
}