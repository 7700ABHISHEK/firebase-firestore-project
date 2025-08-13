import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../config/firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);

const LoginForm = ({ setIsLogin }) => {
    const [input, setInput] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleGoogle = async () => {
        try {
            let res = await signInWithPopup(auth, googleProvider);
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.code);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (input.password.trim() === '' || input.password.length < 8) {
            validationErrors.password = 'Please enter a valid password (min. 8 characters)';
        }
        if (input.email.trim() === '') {
            validationErrors.email = 'Please enter a valid Email';
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            await createUserWithEmailAndPassword(auth, input.email, input.password);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.code, { autoClose: 2000 });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-white/10 border border-blue-500/40 backdrop-blur-xl rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                <div className="text-center mb-8">
                    <h1 className="mt-2 text-4xl font-extrabold text-blue-400 drop-shadow-lg">Sign Up</h1>
                    <p className="text-gray-300 mt-2">Create your new account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            className="w-full px-4 py-3 bg-black/30 text-white border border-blue-400/50 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="admin@gmail.com"
                            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-red-400 mt-1 text-sm font-medium">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={input.password}
                            className="w-full px-4 py-3 bg-black/30 text-white border border-blue-400/50 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="admin@123"
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-red-400 mt-1 text-sm font-medium">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-400 hover:to-indigo-400 hover:shadow-blue-500/40 transition-all duration-300"
                    >
                        Sign Up
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-pink-400 hover:to-purple-400 hover:shadow-pink-500/40 transition-all duration-300"
                    >
                        Continue with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
