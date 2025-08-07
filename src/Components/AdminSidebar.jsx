import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    Home,
    User,
    ShoppingCart,
    Settings,
    LogOut,
    Menu,
} from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "./AdminLayout"; // Context import
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../Context/Context";
const AdminSidebar = () => {
    const { adminId, loading } = useAdminContext();
    const navigate = useNavigate()
    const location = useLocation();
    const { open, toggle } = useContext(SidebarContext);
    const isActive = (url) => location.pathname === url;

    const URL = "http://localhost:8081"
    const logout = async () => {
        try {
            const res = await axios.post(`${URL}/api/admin/adminLogout`, {}, { withCredentials: true })
            if (res.data.success) {
                toast.success("logout successfull")
                adminId(null)
                navigate("/")

            }
        } catch (error) {
            toast.error(error)
            console.log("admin logout error", error);

        }
    }
    useEffect(() => {
        if (!loading && !adminId) {
            navigate("/")
        }
    }, [loading, adminId, navigate])
    return (
        <>
            {/* Overlay for mobile when sidebar is open */}
            <div
                onClick={toggle}
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            ></div>

            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 bg-white text-gray-800 shadow-md border-r
                    transform transition-transform duration-300
                    w-64
                    md:static md:translate-x-0
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header with toggle button for mobile */}
                <div className="flex items-center justify-between px-4 py-4 border-b md:hidden">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <button
                        onClick={toggle}
                        className="p-2 rounded hover:bg-gray-100 transition"
                        aria-label="Close sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu */}
                <nav className="px-2 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-64px)]">
                    <NavLink
                        to="/dashboard"
                        end
                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${isActive("/dashboard")
                            ? "bg-orange-500 text-white font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`}
                    >
                        <Home className="w-5 h-5" />
                        <span className="ml-3 text-sm">Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${isActive("/orders")
                            ? "bg-orange-500 text-white font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`}
                    >
                        <User className="w-5 h-5" />
                        <span className="ml-3 text-sm">Orders</span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${isActive("/products")
                            ? "bg-orange-500 text-white font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="ml-3 text-sm">Products</span>
                    </NavLink>

                    {/* <NavLink
                        to="/settings"
                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${isActive("/settings")
                            ? "bg-orange-500 text-white font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span className="ml-3 text-sm">Settings</span>
                    </NavLink> */}
                </nav>

                {/* Logout */}
                <div className="mt-auto px-4 py-4 border-t">
                    <NavLink
                        onClick={() => {
                            const confirmed = window.confirm("Are you sure you want to logout?");
                            if (confirmed) {
                                logout();
                                adminId(null)
                            }
                        }}
                        className="flex items-center gap-3 text-red-500 hover:text-red-600 transition"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </NavLink>

                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
