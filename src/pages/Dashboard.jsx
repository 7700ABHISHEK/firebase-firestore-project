import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const studentSnapShot = await getDocs(collection(db, "Students"));
    const student = studentSnapShot.docs.map((std) => ({
      id: std.id,
      ...std.data(),
    }));
    setStudents(student);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!form.name.trim()) validationErrors.name = "Name is required";
    if (!form.email.trim()) validationErrors.email = "Email is required";
    if (!form.course.trim()) validationErrors.course = "Course is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      if (editId) {
        await updateDoc(doc(db, "Students", editId), form);
        toast.success("Student Updated Successfully", { autoClose: 1000 });
        setEditId(null);
      } else {
        await addDoc(collection(db, "Students"), form);
        toast.success("Student Added Successfully", { autoClose: 1000 });
      }

      setForm({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Students", id));
      fetchStudents();
      toast.success("Student Deleted Successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, email: student.email, course: student.course });
    setEditId(student.id);
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", course: "" });
    setEditId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="w-full max-w-3xl p-8 bg-white/10 border border-blue-500/40 backdrop-blur-xl rounded-2xl shadow-2xl hover:scale-[1.01] transition-transform duration-500 mt-28">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">
          {editId ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
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
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/30 border border-blue-400/50 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="student@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Select a Framework</label>
            <select
              id="course"
              value={form.course}
              onChange={handleChange}
              className="bg-black/30 border border-blue-400/50 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none block w-full p-2"
            >
              <option value="">Choose a Framework</option>
              <option value="React.js">React.js</option>
              <option value="Javascript">Javascript</option>
              <option value="Angular">Angular</option>
              <option value="Node.js">Node.js</option>
            </select>
            {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course}</p>}
          </div>

          <div className="sm:col-span-3 flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-400 hover:to-indigo-400 hover:shadow-blue-500/40 transition-all duration-300"
            >
              {editId ? "Update Student" : "Add Student"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-lg shadow-lg hover:from-gray-400 hover:to-gray-600 hover:shadow-gray-500/40 transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {students.length > 0 ? (
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
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-500/10 transition-colors">
                    <td className="p-3 border-b border-blue-400/20">{student.name}</td>
                    <td className="p-3 border-b border-blue-400/20">{student.email}</td>
                    <td className="p-3 border-b border-blue-400/20">{student.course}</td>
                    <td className="p-3 border-b border-blue-400/20 flex gap-5">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="py-2 px-4 border border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 hover:shadow-blue-500/40 rounded-xl"
                      >
                        Delete 🗑️
                      </button>
                      <button
                        onClick={() => handleEdit(student)}
                        className="py-2 px-4 border border-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 hover:shadow-pink-500/40 rounded-xl"
                      >
                        Edit ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="my-6">
          <img src="/no-students-found.webp" alt="no-students" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
