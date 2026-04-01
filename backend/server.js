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
  origin:['https://user-management-j82c.vercel.app']
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

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error:` ${field} "${value}" already exists,`
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});