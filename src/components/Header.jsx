import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = ({ isLogin, setIsLogin }) => {
    const [isMobileView, setIsMobileView] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileView(!isMobileView);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        setIsLogin(false);
        toast.success("Log Out successfully", { autoClose: 1000 });
        navigate("/");
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-black border border-cyan-400/10 rounded-2xl">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="logo">
                    <Link to="/">
                        <img src="/lion-logo.png" alt="logo" className="w-14" />
                    </Link>
                </div>

                <nav className="hidden md:flex gap-7 text-white">
                    <Link to='/'>
                        <li className="list-none cursor-pointer hover:text-blue-400 transition">Home</li>
                    </Link>
                    <Link to='/dashboard'>
                        <li className="list-none cursor-pointer hover:text-blue-400 transition">Dashboard</li>
                    </Link>
                </nav>


                <div className="hidden md:block">
                    {isLogin ? (
                        <button
                            onClick={handleLogout}
                            className="border text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            Log Out
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/")}
                            className="border text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            Login
                        </button>
                    )}
                </div>

                <div className="md:hidden text-white">
                    <button onClick={toggleMobileMenu}>
                        {isMobileView ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isMobileView && (
                <div className="md:hidden fixed top-16 left-0 w-full mt-5 z-40 bg-cyan-950 text-white rounded-b-2xl border-t animate-fade-slide">
                    <div className="flex flex-col gap-6 px-6 py-6">
                        <ul className="flex flex-col gap-4 text-lg font-semibold">
                            <Link to='/'>
                                <li className="list-none cursor-pointer hover:text-blue-400 transition">Home</li>
                            </Link>
                            <Link to='/dashboard'>
                                <li className="list-none cursor-pointer hover:text-blue-400 transition">Dashboard</li>
                            </Link>
                        </ul>

                        <div className="pt-2">
                            {isLogin ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full border bg-gradient-to-t from-black via-[#0f172a] to-[#020617] text-white px-4 py-2 rounded-lg text-sm transition"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleNavClick("/")}
                                    className="w-full border bg-gradient-to-t from-black via-[#0f172a] to-[#020617] text-white px-4 py-2 rounded-lg text-sm transition"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header