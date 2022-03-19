var jwt = require('jsonwebtoken');
const secret='boyisgood';

const Fetchuser=(req,res,next)=>{

    // get user from jwt token and add id to req obj
    const token=req.header('authtoken');
    if(!token){
        res.status(401).send("Please authenticate using valid token");
    }
    try {
        const data=jwt.verify(token,secret);
        req.user =data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate using valid token");
    }
}

module.exports=Fetchuser;