import React from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router';
import { useState } from 'react';

function AddUser() {
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [err,setErr]=useState(null)
    let [loading,setLoading]=useState(false);
    let navigate=useNavigate();
    const submitForm=async(obj)=>{
        setLoading(true);
       // console.log(obj)
        try{
            let res=await fetch("http://localhost:4002/user-api/users",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(obj)
            });
            if(res.status===201){
              navigate("/user-list")
            }
            else{
                throw new Error("error occured:",{err})
            }
        }catch(err){
           setErr(err.message)
        }
        finally{
            setLoading(false);
        }
    }
    if(loading === true){
    return <p className='text-4xl text-red-600'>Loading...</p>
    }
   if(err !== null){
     return <p className='text-4xl text-red-600'>{err.message}</p>
   }
  return (
  <div className="flex justify-center mt-10">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">User Form</h1>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <input type="text" {...register("name",{required:true})} placeholder="Enter name"
          className="border w-full p-2 rounded"/>
        {errors.name && <p className="text-red-500">Name required</p>}
        <input type="email" {...register("email")} placeholder="Enter email" className="border w-full p-2 rounded"/>
        <input type="date" {...register("dob")} className="border w-full p-2 rounded"/>
        <input type="number" {...register("mobileno")} placeholder="Enter mobile number"
          className="border w-full p-2 rounded"/>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Submit</button>
      </form>
    </div>
  </div>
 )
}

export default AddUser