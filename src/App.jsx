import { useState } from 'react'
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Components/Home'
import Hom2 from './Components/Hom2'
import Transfer from './Pages/Trransfer'
import Wallet from './Pages/Wallet'
import Card from './Pages/Card'
import Global from './Banks/Global'
import Tech from './Banks/Tech'
import Acb from './Banks/Acb'
import Citi from './Banks/Citi'
import Star from './Banks/Star'
import Vin from './Banks/Vin'
import Chase from './Banks/Chase'
import Confirm from './Banks/Confirm'
import Accounts from './Pages/Accounts'
import Reset from './Components/Reset'
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import TransactionHistory from './Components/TransactionList'
import PayBills from './Pages/PayBills'
import Investment from './Pages/Investment'
import CardManager from './Pages/CardManager'
import StockDemo from './Pages/StockDemo'
import UserChat from './Components/UserChat'
import { ThemeProvider } from './context/ThemeContext' // ✅ import here

const AdminProtected = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/home' element={<ProtectedRoute><Hom2 /></ProtectedRoute>} />
          <Route path='/trransfer' element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
          <Route path='/wallet' element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path='/card' element={<ProtectedRoute><Card /></ProtectedRoute>} />
          <Route path='/glo' element={<ProtectedRoute><Global /></ProtectedRoute>} />
          <Route path='/tech' element={<ProtectedRoute><Tech /></ProtectedRoute>} />
          <Route path='/acb' element={<ProtectedRoute><Acb /></ProtectedRoute>} />
          <Route path='/citi' element={<ProtectedRoute><Citi /></ProtectedRoute>} />
          <Route path='/star' element={<ProtectedRoute><Star /></ProtectedRoute>} />
          <Route path='/chhase' element={<ProtectedRoute><Chase /></ProtectedRoute>} />
          <Route path='/vin' element={<ProtectedRoute><Vin /></ProtectedRoute>} />
          <Route path='/con' element={<ProtectedRoute><Confirm /></ProtectedRoute>} />
          <Route path='/accounts' element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path='*' element={<Navigate to="/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
          <Route path='history' element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
          <Route path='bill' element={<ProtectedRoute><PayBills /></ProtectedRoute>} />
          <Route path='invest' element={<ProtectedRoute><Investment /></ProtectedRoute>} />
          <Route path='crd' element={<ProtectedRoute><CardManager /></ProtectedRoute>} />
          <Route path='stock' element={<ProtectedRoute><StockDemo /></ProtectedRoute>} />
          <Route path='msg' element={<UserChat />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
