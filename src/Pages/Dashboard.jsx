import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAdminContext } from '../Context/Context'
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate()
    const { adminId } = useAdminContext();
    const [recentOrders, setRecentOrders] = useState([]);
    const URL = "http://localhost:8081";
    useEffect(() => {
        if (adminId === false) {
            navigate("/"); // redirect to login
        }
    }, [adminId, navigate]);
    const getRecentOrder = async () => {
        try {
            const res = await axios.get(`${URL}/api/order/recentOrder`, {
                withCredentials: true,
            });
            setRecentOrders(res.data.data);
        } catch (error) {
            console.log("get order admin panel ", error);
        }
    };

    useEffect(() => {
        getRecentOrder();
    }, []);


    const getStatusBadge = (status) => {
        const colorMap = {
            paid: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            cancelled: "bg-red-100 text-red-800",
        };

        return (
            <span className={`text-xs font-medium px-2 py-1 rounded ${colorMap[status] || "bg-gray-200 text-gray-800"}`}>
                {status.toUpperCase()}
            </span>
        );
    };
    useEffect(() => {
        if (!adminId) {
            navigate("/"); // or wherever you want to redirect
        }
    }, [adminId, navigate]);
    const metrics = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            changeType: "positive",
            icon: DollarSign,
        },
        {
            title: "Orders",
            value: "2,350",
            change: "+15.3%",
            changeType: "positive",
            icon: ShoppingCart,
        },
        {
            title: "Customers",
            value: "12,234",
            change: "+5.2%",
            changeType: "positive",
            icon: Users,
        },
        {
            title: "Products",
            value: "573",
            change: "-2.1%",
            changeType: "negative",
            icon: Package,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening with your store today.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    View Reports
                </button>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, index) => {
                    const isPositive = metric.changeType !== "negative";
                    return (
                        <div key={index} className="p-4 border bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-700">{metric.title}</h4>
                                {metric.icon && <metric.icon className="w-5 h-5 text-gray-400" />}
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                            <p className={`text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                                {isPositive ? "↑" : "↓"} {metric.change}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white border rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Recent Orders</h2>
                        <p className="text-sm text-gray-500">You have {recentOrders.length} orders</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                    {recentOrders.map((order) => (
                        <div
                            key={order._id}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{order.name}</p>
                                <p className="text-sm text-gray-500">Order #{order._id.slice(-6).toUpperCase()}</p>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-sm font-medium">₹{order.totalAmount}</p>
                                {getStatusBadge(order.paymentStatus)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border rounded-lg shadow p-4">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                    <p className="text-sm text-gray-500">Frequently used actions to manage your store</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <button className="p-4 border rounded-md flex flex-col items-center gap-2 hover:bg-gray-50">
                        <Package className="h-6 w-6" />
                        <span className="text-sm">Add Product</span>
                    </button>
                    <button className="p-4 border rounded-md flex flex-col items-center gap-2 hover:bg-gray-50">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="text-sm">Process Order</span>
                    </button>
                    <button className="p-4 border rounded-md flex flex-col items-center gap-2 hover:bg-gray-50">
                        <Users className="h-6 w-6" />
                        <span className="text-sm">Add Customer</span>
                    </button>
                    <button className="p-4 border rounded-md flex flex-col items-center gap-2 hover:bg-gray-50">
                        <TrendingUp className="h-6 w-6" />
                        <span className="text-sm">View Analytics</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
