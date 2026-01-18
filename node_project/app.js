const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/database");
const StudentSchema = require("./config/studentschema");
const studentschema = require("./config/studentschema");
const axios = require('axios');

// Enable CORS
app.use(cors());
app.use(express.json())
// Define route


const NSE_BASE_URL = 'https://www.nseindia.com';

const axiosInstance = axios.create({
  baseURL: NSE_BASE_URL,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.nseindia.com/option-chain',
    'Connection': 'keep-alive'
  },
  withCredentials: true
});


app.get('/api/option-chain-next', async (req, res) => {
  // const { symbol, expiryDate } = req.query;

let symbol ="NIFTY"
let expiryDate = "20-Jan-2026"
try {
    // Step 1: Get cookies
    await axiosInstance.get('/');

    // Step 2: Call NSE NextApi
    const response = await axiosInstance.get(
      `/api/NextApi/apiClient/GetQuoteApi`,
      {
        params: {
          functionName: 'getOptionChainData',
          symbol,
          params: `expiryDate=${expiryDate}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch option chain data' });
  }
});

app.get("/api", async (req, res) => {
  try {
    const students = await StudentSchema.find();
     console.log(students);
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
