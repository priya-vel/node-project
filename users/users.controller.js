const { UserService } = require("./users.service");
const jwt = require ('jsonwebtoken');
const bcrypt = require("bcryptjs");


const UserController = {
    async register(req, res, next) {
        try{
          const body = req.body;
            console.log(body);
            const dbUser = await UserService.getOneUser({
                name: body.name
            })
            if(dbUser){
                throw new Error("user with same name already exixts ")
            }


            const dbUserEmail = await UserService.getOneUser({
                email: body.email
            })
            if(dbUserEmail){
                throw new Error("user with same email already exists")
            }

            const response = UserService.createUser(body)
            res.status(201).json({
                data:response 
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
                error:{
                    message:error
                }
            })
        }
    },
    async login(req, res, next) {
        try{
            
            let body = req.body;
            console.log(body);

            let dbUser = await UserService.getOneUser({email: body.email});

            if(!dbUser){
                throw "user not found";
            }
            const comparePassword = await bcrypt.compare(body.password,dbUser.password);

            if(!comparePassword){
                throw "invalid credential"
            }
            
            const token = jwt.sign({ sessionId: dbUser._id},'shhhhh', { expiresIn: '12h'});
            
            res.status(200).json({
                token: token,
            })
            
        }catch (err){
            console.log(err);
            res.status(500).json({
                error: {
                    message:err
                }
            })
        }
    },

    async getAll(req, res, next){
        try {
            console.log("get all user controller", req.user);
            const data = await UserService.getAllUser();
            res.status(200).json({
                users: data,
            })

        }catch (error){
            res.status(500).json({
                error: {
                    message: error
                }
            })
        }
    },
    getMyDate(req, res, next){
        let id = req.user._id;
        UserService.getOneUser({
            _id: id
        }).then(data =>{
            res.status(200).json({
                data
            })
        }).catch(err => {
            res.status(500).json({
                error: {
                    message: err
                }
            })
        })
    }
    
    
}
module.exports = {
    UserController
}