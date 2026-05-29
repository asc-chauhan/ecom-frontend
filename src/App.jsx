import './App.css'
import Home from './components/home/Home'
import Products from './components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import About from './components/About'
import Contact from './components/Contact'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import LogIn from './components/auth/logIn'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'
import MyOrders from './components/orders/MyOrders'
import Profile from './components/profile/Profile'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/dashboard/Dashboard'
import AdminProducts from './components/admin/products/AdminProducts'
import Sellers from './components/admin/sellers/Sellers'
import Category from './components/admin/categories/Category'
import Orders from './components/admin/orders/Orders'

function App() {

  return (
    <React.Fragment>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/products' element= {<Products/>} />
          <Route path='/about' element= {<About/>} />
          <Route path='/contact' element= {<Contact/>} />
          <Route path='/cart' element= {<Cart/>} />

          <Route path='/' element= {<PrivateRoute />}>
            <Route path='/checkout' element= {<Checkout/>} />
            <Route path='/order-confirm' element= {<PaymentConfirmation/>} />
            <Route path='/profile/orders' element= {<MyOrders/>} />
            <Route path='/profile' element= {<Profile/>} />
          </Route>
          
          <Route path='/' element= {<PrivateRoute publicPage/>}>
            <Route path='/login' element= {<LogIn/>} />
            <Route path='/register' element= {<Register/>} />
          </Route>

          <Route path = '/' element = {<PrivateRoute adminOnly/>}>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='orders' element={<Orders />} />
              <Route path='categories' element={<Category />} />
            </Route>
          </Route>

        </Routes>
      </Router>
      <Toaster position='bottom-center'/>
      </div>
    </React.Fragment>
  )
}

export default App
