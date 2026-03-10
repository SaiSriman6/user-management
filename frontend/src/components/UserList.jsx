import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function UserList() {
 let [users,setUsers]=useState([]);
 let [error,setError]=useState(null)
 let navigate=useNavigate()
 useEffect(()=>{
  async function getUsers(){
    try{
    let res=await fetch("http://localhost:4002/user-api/users",{
        method:"GET"
    })
    if(res.status===200){
        let data= await res.json();
        setUsers(data.payload)
    }else{
       throw new Error("error occured:",{error})
    }
   }catch(err){
      setError(err);
   }
  }
  getUsers();
 },[])
 
 const gotoUser=(userObj)=>{
    navigate("/user",{state:{user:userObj}})
 }


return (
  <div>
    <h1 className="text-2xl font-bold mb-6 text-center mt-10">List of Users</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        users.map((userObj)=>(
          <div
            key={userObj.email}
            onClick={()=>gotoUser(userObj)}
            className="cursor-pointer bg-white shadow-md hover:shadow-xl transition rounded-lg p-4 border">
            <p className="font-semibold text-lg">{userObj.name}</p>
            <p className="text-gray-600">{userObj.email}</p>
          </div>
        ))
      }
    </div>
  </div>
 )
}

export default UserList