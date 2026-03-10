import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import {userAPI} from './APIS/userAPI.js'
import cors from 'cors'

config()


//create http server
const app=exp();
//add use
app.use(cors({
  origin:['http://localhost:5173']
}))
//add body parser
app.use(exp.json());
//forward to user-api
app.use('/user-api',userAPI)
const connectDB=async()=>{
  try{
    await connect(process.env.DB_URL)
    console.log("DB connection successfull");
    app.listen(process.env.PORT,()=>console.log("Server started"));
  }catch(err){
     console.log('error in connecting with DB',err);
  }
}
connectDB();

// dealing  with invalid path
app.use((req,res,next)=>{
  console.log(req.url)
  res.json({message:`${req.url} is invalid path`});
})


// error handling middleware
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});