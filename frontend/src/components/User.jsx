import React from 'react'
import { useLocation } from 'react-router'

function User() {
  let { state } = useLocation();

  return (
    <div className="min-h-screen flex justify-center items-center">    
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          User Details
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {state?.user?.name}
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg text-gray-800">
              {state?.user?.email}
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Date of Birth</p>
           <p className="text-lg mb-2 text-gray-800 ">
            {new Date(state?.user?.dob).toLocaleDateString("en-IN")}
          </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Mobile Number</p>
            <p className="text-lg text-gray-800">
              {state?.user?.mobileno}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default User