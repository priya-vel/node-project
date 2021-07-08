const jwt = require("jsonwebtoken");
const { UserService } = require("../users/users.service");


const Authorization = async (req,res,next) =>{
    try{
        let auth = req.headers.Authorization;
        let arr = String(auth).split(" ")
        console.log(arr, req.headers)
        if (arr.length != 2) {
            console.log("wrong length")
            throw "token not valid"
        }
        if (arr[0] !== "Barear"){
            console.log("spelling mistake in first")
            throw "token not valid"
        }
        
        const verify = jwt.verify(arr[1], 'shhhhh')
        let id = verify.sessionId;
        let dbUser = await UserService.getOneUser({_id:id})

        if(!dbuser){
            console.log("user not found in db")
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

