import React from 'react'
import { NavLink } from 'react-router'
function Header() {
  return (
    <div>
        <nav className="flex flex-col md:flex-row justify-between items-center bg-blue-500 text-white px-6 py-3 shadow-md">
            <div>
                <h1 className='font-bold p-5 text-2xl'>User Management</h1>
            </div>
            <div>
                <ul className="flex flex-wrap justify-center gap-6 font-medium">
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="add-user">AddUser</NavLink></li>
                    <li><NavLink to="user-list">UsersList</NavLink></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Header