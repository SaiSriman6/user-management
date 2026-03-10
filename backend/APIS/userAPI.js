import exp from 'express'
import { UserModel } from '../models/UserModel.js'

export const userAPI=exp.Router()

//create user
userAPI.post('/users',async(req,res)=>{
    //read new user from body
    const newUser=req.body;
    //create user document
    const newUserDoc=new UserModel(newUser);
    //save to database
    let user= await newUserDoc.save();
    //send response
    res.status(201).json({message:"User Created",payload:user})
})


//read all user
userAPI.get('/users',async(req,res)=>{
    //read all users from database
    let usersList=await UserModel.find({status:true});
    //send response
    res.status(200).json({message:"All Users",payload:usersList})
})


//read user by id
userAPI.get('/users/:id',async(req,res)=>{
    //get uid from url params
    let userId=req.params.id;
    //get user by id from database
    let user=await UserModel.findOne({_id:userId,status:true});
    //if user not found send res
    if(!user){
       return res.status(404).json({message:"user not found"})
    }
    //if user found
    res.status(200).json({message:"User found",payload:user})
})

//delete user by id
userAPI.delete('/users/:id',async(req,res)=>{
    //get uid from body
    let uid=req.params.id;
    // perform soft delete
    let modifiedUser=await UserModel.findByIdAndUpdate(uid,{$set:{status:false}},{new:true});
    // if user not found
    if(!modifiedUser){
       return res.status(404).json({message:"user not found"})
    }
    //if user found
    res.status(200).json({message:"user soft deleted",payload:modifiedUser})
})

//activate user
userAPI.patch('/users/:id',async(req,res)=>{
    //get uid from url params
    let uid=req.params.id;
    //activate user
    let user=await UserModel.findByIdAndUpdate(uid,{$set:{status:true}},{new:true});
    //send res
    res.status(200).json({message:"user activated"})
})
