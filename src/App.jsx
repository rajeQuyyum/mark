import { useState } from 'react'
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Components/Home'
import Hom2 from './Components/Hom2'
import Transfer from './Pages/Trransfer'
import Reset from './Components/Reset'
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import TransactionHistory from './Components/TransactionList'
import PayBills from './Pages/PayBills'
import Investment from './Pages/Investment'
import CardManager from './Pages/CardManager'
import StockDemo from './Pages/StockDemo'
import UserChat from './Components/UserChat'
import UserNotifications from './Components/UserNotifications'




// Admin protected route
const AdminProtected = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};


// ✅ Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
     <Routes>
       {/* Public routes */}
       <Route path='/' element={<Home />} />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
       <Route path='/reset' element={<Reset />} />

       {/* Protected: only logged-in users can access */}
       <Route 
         path='/home' 
         element={
           <ProtectedRoute>
             <Hom2 />
           </ProtectedRoute>
         } 
       />

      
    
       <Route 
         path='/trransfer' 
         element={
           <ProtectedRoute>
             <Transfer />
           </ProtectedRoute>
         } 
       />
     
       
       

       {/* Catch-all → redirect to login */}
       <Route path='*' element={<Navigate to="/login" replace />} />


       {/* Existing routes ... */}

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />

        <Route path='history' element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>}
         />
        <Route path='bill' element={<ProtectedRoute><PayBills /></ProtectedRoute>}
         />
       <Route path='invest' element={<ProtectedRoute><Investment /></ProtectedRoute>}
         />
         <Route path='crd' element={<ProtectedRoute><CardManager /></ProtectedRoute>} />
         <Route path='stock' element={<ProtectedRoute><StockDemo /></ProtectedRoute>} />
         <Route path='noti' element={<UserNotifications />} />
       

         
      <Route path='msg' element={<ProtectedRoute><UserChat /></ProtectedRoute>} />


     </Routes>
   </BrowserRouter>
  )
}

export default App
