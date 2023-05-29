// import { createBrowserRouter } from "react-router-dom";
import Main from '../../Layout/Main';
import About from '../../Pages/About/About';
import Checkout from '../../Pages/Checkout/Checkout';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import SignUp from '../../Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';

const {createBrowserRouter} = require("react-router-dom")

const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>  
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signUp',
            element: <SignUp></SignUp>
        },
        {
            path: '/about',
            element: <PrivateRoute><About></About></PrivateRoute> 
        },
        {
          path: '/checkout/:id',
          element: <Checkout></Checkout>,
          loader: ({params})=>fetch(`http://localhost:5000/services/${params.id}`)
        }
      ]
    }
  ])

  export default router