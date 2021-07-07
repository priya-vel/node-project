const { app } = require("./main")
const PORT = 3000;
app.listen (PORT,()=>{
    console.log("server started at port" + PORT);
})