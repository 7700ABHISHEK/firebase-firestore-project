import React, { useState } from "react";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", course: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!form.name.trim()) validationErrors.name = "Name is required";
        if (!form.email.trim()) validationErrors.email = "Email is required";
        if (!form.course.trim()) validationErrors.course = "Course is required";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setStudents([...students, form]);
        setForm({ name: "", email: "", course: "" });
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">

            {/* Add Student Form */}
            <div className="w-full max-w-3xl p-8 bg-white/10 border border-blue-500/40 backdrop-blur-xl rounded-2xl shadow-2xl hover:scale-[1.01] transition-transform duration-500 mt-28">
                <h2 className="text-3xl font-bold text-blue-400 mb-6">Add New Student</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-black/30 border border-blue-400/50 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-black/30 border border-blue-400/50 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="student@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Course</label>
                        <input
                            type="text"
                            name="course"
                            value={form.course}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-black/30 border border-blue-400/50 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="React JS"
                        />
                        {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course}</p>}
                    </div>

                    <div className="sm:col-span-3">
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-400 hover:to-indigo-400 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            Add Student
                        </button>
                    </div>
                </form>
            </div>

            {/* Students Table */}
            <div className="w-full max-w-5xl mt-10 p-6 bg-white/10 border border-blue-500/40 backdrop-blur-xl rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Student List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-500/20">
                                <th className="p-3 border-b border-blue-400/30">Name</th>
                                <th className="p-3 border-b border-blue-400/30">Email</th>
                                <th className="p-3 border-b border-blue-400/30">Course</th>
                                <th className="p-3 border-b border-blue-400/30">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-400">
                                        No students added yet
                                    </td>
                                </tr>
                            ) : (
                                students.map((student, index) => (
                                    <tr key={index} className="hover:bg-blue-500/10 transition-colors">
                                        <td className="p-3 border-b border-blue-400/20">{student.name}</td>
                                        <td className="p-3 border-b border-blue-400/20">{student.email}</td>
                                        <td className="p-3 border-b border-blue-400/20">{student.course}</td>
                                        <td className="p-3 border-b border-blue-400/20 flex gap-5">
                                            <button className="py-2 px-4 border border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 hover:shadow-blue-500/40 rounded-xl">Delete🗑️</button>
                                            <button className="py-2 px-4 border border-blue-500 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 hover:shadow-pink-500/40 rounded-xl">Edit✏️</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
