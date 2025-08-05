import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../Context/Context";
const Login = () => {

    const navigate = useNavigate()
    const { adminId, setAdminId } = useAdminContext();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setSuccess("");
        setFormData({ name: "", email: "", password: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? "http://localhost:8081/api/admin/adminLogin"
            : "http://localhost:8081/api/admin/register";

        try {
            const res = await axios.post(url, formData, {
                withCredentials: true,
            });
            if (res.data.success) {
                setSuccess(res.data.message);
                setError("");
                if (isLogin) {
                    toast.success("Login successful");
                    setAdminId(res.data.admin.id)
                    navigate("/dashboard")
                } else {
                    toast.success("Registration successful");
                }
                setFormData({ name: "", email: "", password: "" });
            } else {
                setError(res.data.message);
                setSuccess("");
            }
        } catch (err) {
            console.error("Login/Register error:", err); // This will log detailed error info in browser console

            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Show backend error message
            } else {
                setError("Server error");
            }

            setSuccess("");
        }

    };


    return (
        <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">
                {isLogin ? "Admin Login" : "Admin Register"}
            </h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mb-3"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-3"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-3"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <p className="mt-4 text-sm text-center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={toggleMode} className="text-blue-500 underline">
                    {isLogin ? "Register" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default Login;
