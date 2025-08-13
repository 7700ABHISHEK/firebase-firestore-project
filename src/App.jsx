import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import LoginForm from "./pages/LoginForm"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"

const App = () => {

    const [isLogin, setIslogin] = useState(false)

    return (
        <BrowserRouter>
            <ToastContainer />
            <Header isLogin={isLogin} setIsLogin={setIslogin} />
            <Routes>
                <Route path="/" element={<LoginForm />}/>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App