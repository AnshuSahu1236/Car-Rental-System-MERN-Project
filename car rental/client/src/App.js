import "./App.css"
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import BookingCar from "./pages/BookingCar"
import "antd/dist/antd.css"
import UserBookings from "./pages/UserBookings"
import AddCar from "./pages/AddCar"
import AdminHome from "./pages/AdminHome"
import EditCar from "./pages/EditCar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<ProtectedRoute Component={Home}></ProtectedRoute>}
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/booking/:carid"
            exact
            element={<ProtectedRoute Component={BookingCar}></ProtectedRoute>}
          />
          <Route
            path="/userbookings"
            exact
            element={<ProtectedRoute Component={UserBookings}></ProtectedRoute>}
          />
          <Route
            path="/addcar"
            exact
            element={<AdminProtectedRoute Component={AddCar}></AdminProtectedRoute>}
          />
          <Route
            path="/editcar/:carid"
            exact
            element={<AdminProtectedRoute Component={EditCar}></AdminProtectedRoute>}
          />
          <Route
            path="/admin"
            exact
            element={<AdminProtectedRoute Component={AdminHome}></AdminProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

export function ProtectedRoute({ Component }) {
  if (localStorage.getItem("user")) {
    return <Component />
  } else {
    return <Navigate to="/login" />
  }
}

export function AdminProtectedRoute({ Component }) {
  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).isAdmin == true
  ) {
    return <Component />
  } else {
    return <Navigate to="/login" />
  }
}
