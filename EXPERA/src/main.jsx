import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, AllPost, EditPost, Home, Login, Post, Signup, UserPosts } from './pages/index.js'
import AuthLayout from './AuthLayout.jsx'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/all-posts',
          element:(
            <AuthLayout authentication = {true}>
                <AllPost/>
            </AuthLayout>
          )
        },
        {
          path:'/add-post',
          element:(
            <AuthLayout authentication = {true}>
                <AddPost/>
            </AuthLayout>
          )
        },
        {
          path:'/edit-post/:slug',
          element:(
            <AuthLayout authentication = {true}>
                <EditPost/>
            </AuthLayout>
          )
        },
        {
          path:'/my-posts',
          element:(
            <AuthLayout authentication = {true}>
              <UserPosts/>
            </AuthLayout>
          )
        },
        {
          path:'/login',
          element:(
            <AuthLayout authentication = {false}>
              <Login/>
            </AuthLayout>
          )
        },
        {
          path:'/signup',
          element:(
            <AuthLayout authentication = {false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path:'/post/:slug',
          element:(
            <AuthLayout authentication = {true}>
              <Post/>
            </AuthLayout>
          )
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
