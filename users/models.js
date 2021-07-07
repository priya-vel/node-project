const { model, Schema } = require("mongoose");


const UserModel = model("Users", Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    Password: {
        type : String,
        required : true
    },

}))


module.exports = {
    UserModel
}
