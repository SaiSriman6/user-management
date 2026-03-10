//create userSchema
//create userModel for user schema

import { Schema,model } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"email already exists"]
    },
    dob:{
        type:Date,
        required:[true,"Date of birth required"]
    },
    mobileno:{
        type:Number,
        unique:[true,"mobileno already exists"]
    },
    status:{
       type:Boolean,
       default:true
    }
},{
    strict:"throw",
    versionKey:false,
    timestamps:true
})

export const UserModel=model('user',UserSchema);