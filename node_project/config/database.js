const mongoose = require("mongoose");

// let url ="mongodb+srv://ramojha:BJIIfn3quLMPcBla@realmcluster.f8qkz.mongodb.net/?retryWrites=true&w=majority&appName=RealmCluster"
let url = "mongodb+srv://ramojha:CLU2SKy7M1OPnjzU@realmcluster.f8qkz.mongodb.net/ojha?retryWrites=true&w=majority"
 
mongoose.connect(url,{
//    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(()=>{
        console.log("successfully connected with server");
        
    }).catch((err)=>{
        console.log("geting error",err);
        
    })
module.exports = mongoose
