import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import AddUser from './components/AddUser'
import User from './components/User'
import UserList from './components/UserList'
import Home from './components/Home'

function App() {
  const routingObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"user",
          element:<User/>
        },
        {
          path:"user-list",
          element:<UserList/>
        },
        {
          path:"add-user",
          element:<AddUser/>
        }
      ]
    }
  ])
  return ( 
      <RouterProvider router={routingObj}/>  
  )
}

export default App
