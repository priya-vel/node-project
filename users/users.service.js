const { UserModel } = require("./models")
const bcrypt = require('bcryptjs');

const UserService =  {
    createUser(user) {
        
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(user.password, salt);
        let newUser = new UserModel();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = hash;
        newUser.save();
        return "user saved";
    },
   async getOneUser(condition){
        return UserModel.findOne(condition)

    },
    

    async getAllUser(){
        return UserModel.find({})
    },
    
    async  updateOneUser(condition, newValue){
        return UserModel.updateOne(condition,{
            $set :newValue,
        })
    },

        
    }

    module.exports = {
        UserService
    }

   
    
