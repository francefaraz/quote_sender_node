const jwt=require('jsonwebtoken')



const isAuthorized=async(req,res,next)=>{

    const authHeader=req.headers['authorization']
    console.log(authHeader,"auth is ")
    const token=authHeader.split(' ')

    if (token==null){
        return res.status(401).json({success:false,"error":"UNAUTHORIZED USER"})

    }
    jwt.verify(token[1],process.env.QUOTE_SECRET_KEY,(err,user)=>{
        if(err)
          return res.status(401).json({success:false,"error":"unable to verify access token please login"})
        req.user=user
        console.log("USER IS ",user)
        next()
    })
}


module.exports = {isAuthorized}