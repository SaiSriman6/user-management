import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
function UserList() {
  let [users, setUsers] = useState([])
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        let res = await fetch(`${import.meta.env.VITE_API_URL}/user-api/users`)
        if (res.status === 200) {
          let data = await res.json()
          setUsers(data.payload)
        } else {
          throw new Error("Failed to fetch users")
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])
  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } })
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-600 font-semibold">
          {error.message}
        </p>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold animate-pulse">
          Loading Users...
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10 mt-5">
        List of Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-3">
        {users.map((userObj) => (
          <div
            key={userObj.email}
            onClick={() => gotoUser(userObj)}
            className="cursor-pointer bg-white shadow-lg hover:shadow-2xl  rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold mb-4">
                {userObj.name?.charAt(0).toUpperCase()}
              </div>
              <p className="font-semibold text-lg text-gray-800">
                {userObj.name}
              </p>
              <p className="text-gray-600 text-sm">
                {userObj.email}
              </p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList