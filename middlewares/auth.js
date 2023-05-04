const jwt = require("jsonwebtoken")

exports.auth = (req,res,next)=>{
const token = req.header("x-api-key");
if (!token){
    return res.status(401).json({msg:"You need send token"})
}
try{
    const decodeToken = jwt.verify(token,"basmahSecret")
    req.tokenData = decodeToken;
    next()
}
catch(err){
    console.log(err);
    res.status(401).json({err:"token invalid or expired"})
}

} 