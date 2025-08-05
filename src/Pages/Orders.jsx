import { useEffect, useState } from "react";
import axios from "axios";
import {
    Search,
    Filter,
    ShoppingCart,
} from "lucide-react";
import { useAdminContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
export default function Orders() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const { adminId } = useAdminContext();
    useEffect(() => {
        if (adminId === false) {
            navigate("/"); // redirect to login
        }
    }, [adminId, navigate]);
    useEffect(() => {
        axios.get("http://localhost:8081/api/order/recentOrder", { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    const sorted = [...res.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sorted);
                }
            })
            .catch((err) => console.error("Failed to fetch orders", err));
    }, []);

    const filteredOrders = orders.filter(
        (order) =>
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Recent Orders</h1>
                <p className="text-gray-500">Track and manage customer orders</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* <button className="px-4 py-2 border rounded-md flex items-center gap-2 text-sm">
                    <Filter className="h-4 w-4" /> Filter
                </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.map((order) => (
                    <div
                        key={order._id}
                        className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-sm">Order ID: {order._id.slice().toUpperCase()}</p>
                                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                {order.paymentStatus}
                            </span>
                        </div>

                        <div className="mb-2">
                            <p className="text-sm font-medium">{order.name}</p>
                            <p className="text-xs text-gray-500">{order.email}</p>
                        </div>

                        <div className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">Total:</span> ₹{order.totalAmount}
                        </div>
                        <div className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">Items:</span> {order.items.length}
                        </div>
                        <div className="text-sm text-gray-700">
                            <span className="font-medium">Products:</span>
                            <ul className="list-disc list-inside text-xs text-gray-600">
                                {order.items.map((item) => (
                                    <li key={item._id}>{item.name} × {item.quantity} – ₹{item.amount}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        <ShoppingCart className="mx-auto mb-4 w-8 h-8" />
                        <p className="text-sm">No orders found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}