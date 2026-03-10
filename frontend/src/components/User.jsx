import React from 'react'
import { useLocation } from 'react-router'

function User() {
    let {state}=useLocation();
  return (

  <div className="flex justify-center mt-10">
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p className="mb-2 text-lg">{state?.user?.name}</p>
      <p className="mb-2 text-gray-600">{state?.user?.email}</p>
      <p className="mb-2 text-gray-600">{state?.user?.dob}</p>
      <p className="text-gray-600">{state?.user?.mobileno}</p>
    </div>
  </div>
 )
}
export default User