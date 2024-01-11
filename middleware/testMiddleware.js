const jwt = require('jsonwebtoken');
const UserList = require("../models/userSchema")


function testMiddleware(req,res,next){
    // console.log('ami middleware')
    // next()
    // if(req.headers.authorization == 12345){
    //     next()
    // }else{
    //     res.send({error: "AUTHORIZATION NOT FOUND"})
    // }
    jwt.verify(req.headers.authorization, 'sk',async function(err, decoded) {
        if(err){
            res.json({error: "AUTHORIZATION NOT FOUND"})
        }else{
            const user = await UserList.find({email: decoded.id})
            if(user){
                next()
            }else{
                res.json({error: "AUTHORIZATION NOT FOUND"})
            }
        }
      });
}
module.exports = testMiddleware