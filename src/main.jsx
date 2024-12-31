import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage.jsx';
import HomeLayout from './Pages/HomeLayout.jsx';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
// import AddReview from './components/AddReview.jsx';
import MyReviews from './components/MyReviews.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import UpdateReview from './components/UpdateReview.jsx';
import AllReviews from './components/AllReviews.jsx';
import ReviewDetails from './components/ReviewDetails.jsx';
import GameWatchList from './components/GameWatchList.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AddReview from './components/AddReview.jsx';
import ExploreDetails from './components/ExploreDetails.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
      {
        path:'/',
        element:<HomePage></HomePage>,

      }
    ]
  },
  {
    path:'*',
    element:<ErrorPage></ErrorPage>
  },

  // {
  //   path:'/addReview ',
  //   element:<PrivateRoute><AddReview></AddReview></PrivateRoute>
  // },
  {
    path: 'addReview',
    element: <PrivateRoute><AddReview/></PrivateRoute>
  },
  {
    path:'/myWatchlist',
    element:<PrivateRoute><GameWatchList></GameWatchList></PrivateRoute>,
    loader:()=>fetch('https://a10-game-review-server.vercel.app/watchList')
  },
  {
    path: 'exploreDetails/:_id',
    element:<ExploreDetails/>
  },
  {
    path:'/Reviews',
    element:<AllReviews></AllReviews>,
    loader:()=>fetch('https://a10-game-review-server.vercel.app/addReview')
  },
  {
    path:'/myReviews',
    element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
    loader:()=>fetch('https://a10-game-review-server.vercel.app/addReview')

  },
  {
    path:'/updateReview/:id',
    element:<UpdateReview></UpdateReview>,
    loader:({params})=>fetch(`https://a10-game-review-server.vercel.app/addReview/${params.id}`)
  },
  {
    path:'/review/:id',
    element:<ReviewDetails></ReviewDetails>,
    loader:({params})=>fetch(`https://a10-game-review-server.vercel.app/addReview/${params.id}`)
   
  },
  {
    path:'/auth/login',
    element:<Login></Login>
  },
  {
    path:'/auth/register',
    element:<Register></Register>
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
   
  </StrictMode>,
)
