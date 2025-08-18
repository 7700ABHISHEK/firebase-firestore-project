import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import SignUp from "./pages/SignUp"
import LoginForm from "./components/LoginForm"

const App = () => {

    const [isLogin, setIslogin] = useState(false)

    return (
        <BrowserRouter>
            <ToastContainer />
            <Header isLogin={isLogin} setIsLogin={setIslogin} />
            <Routes>
                <Route path="/" element={<SignUp />}/>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App