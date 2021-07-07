const { connect } = require("mongoose");



const DBConnection = () => {
    return connect("mongodb+srv://priya:root@cluster0.sbi2t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

module.exports = {
    DBConnection
}


