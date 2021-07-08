const { connect } = require("mongoose");


const mongoURI = process.env.MONGO_URI

const DBConnection = () => {
    return connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

module.exports = {
    DBConnection
}


