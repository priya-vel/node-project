const jwt = require("jsonwebtoken");
const { UserService } = require("../users/users.service");


const Authorization = async (req,res,next) =>{
    try{
        let auth = req.header.Authorization;
        let arr = String(auth).split(" ")
        if (arr.length != 2) {
            throw "token not valid"
        }
        if (arr[0]!=="Barear"){
            throw "token not valid"
        }
        
        const verify = jwt.verify(arr[1], 'shhhhh')
        let id = verify.sessionId;
        let dbUser = await UserService.getOneUser({_id:id})

        if(!dbuser){
            throw "invalid token"
        }

        req["user"] = {
            _id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email
        };
        next()
    } catch (error){
        res.status(403).json({
            error: {
                message: error
            }
        })
    }
}

module.exports = {
    Authorization
}

