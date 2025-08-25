const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/database");
const StudentSchema = require("./config/studentschema");
const studentschema = require("./config/studentschema");

// Enable CORS
app.use(cors());
app.use(express.json())
// Define route
app.get("/api", async (req, res) => {
  try {
    const students = await StudentSchema.find();
    // console.log(students);
    res.json({status:200, message: 'student data found', data:students});
    // res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/:id", async (req, res) => {
  try {
    const students = await StudentSchema.findById(req.params.id);
    res.json({status:200, message: 'student data found', data:students});
    // res.status(200).json(students);
  } catch (error) {
    res.json({status:404,message:'not Found',data:'null'})
  }
});

app.post("/api/studentrecord", async (req,res)=>{
  try{
      
     const post = new studentschema({
     firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    password: req.body.password
    });
      console.log(post);
     await post.save() 
     res.json({status:200,message:'successfully data save',data:''})  
  }catch(err){
    console.log("student error ------",err);
    res.json({status:404,message:'data not saved',data:'null'})
  }
})



app.put('/api/student/:id', async(req,res)=>{
  try{
    let _id= req.params.id
     const updatedUser = await StudentSchema.findByIdAndUpdate({_id:_id},req.body);
       res.json({status:200, message: 'student data successfully updated', data:updatedUser});
  }catch(err){
    res.json({statu:404,message:"not found" ,data:updatedUser})
console.log("geting error in student",err);
  }
})

app.delete('/api/users/:id', async (req, res) => {
    try {
      let _id =req.params.id
      console.log(_id);
      
        const result = await StudentSchema.findByIdAndDelete({_id:_id});
        console.log(result);
        
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", user: result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});



// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
