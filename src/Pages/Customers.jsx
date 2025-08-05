import React, { useState } from "react";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Users,
    UserPlus,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

// ✅ Inline UI Components

const Button = ({ children, className = "", variant = "", ...props }) => {
    const base =
        variant === "outline"
            ? "border border-gray-300 text-gray-700"
            : "bg-blue-600 text-white hover:bg-blue-700";
    return (
        <button
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${base} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const Input = ({ className = "", ...props }) => (
    <input
        className={`w-full px-3 py-2 border rounded-md text-sm ${className}`}
        {...props}
    />
);

const Card = ({ children, className = "" }) => (
    <div className={`border rounded-lg bg-white p-4 ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`mb-3 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
    <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
    <div className={className}>{children}</div>
);

const Badge = ({ children, variant = "default" }) => {
    const variants = {
        default: "bg-gray-200 text-gray-800",
        secondary: "bg-blue-100 text-blue-800",
        outline: "border border-gray-300 text-gray-600",
    };
    return (
        <span
            className={`text-xs font-medium px-2 py-1 rounded ${variants[variant]}`}
        >
            {children}
        </span>
    );
};

const Avatar = ({ children, className = "" }) => (
    <div
        className={`rounded-full w-12 h-12 bg-gray-200 flex items-center justify-center ${className}`}
    >
        {children}
    </div>
);

const AvatarFallback = ({ children, className = "" }) => (
    <span className={`text-sm font-bold ${className}`}>{children}</span>
);

// 🔥 Dummy Dropdown (simplified)
const DropdownMenu = ({ children }) => <div className="relative">{children}</div>;
const DropdownMenuTrigger = ({ children }) => children;
const DropdownMenuContent = ({ children }) => (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow">{children}</div>
);
const DropdownMenuItem = ({ children }) => (
    <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer flex items-center gap-2">
        {children}
    </div>
);

// ✅ Mock Data
const customers = [
    {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        orders: 12,
        totalSpent: "$2,450.00",
        status: "active",
        joinDate: "2023-03-15",
        lastOrder: "2024-01-15",
    },
    {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 (555) 234-5678",
        location: "Los Angeles, USA",
        orders: 8,
        totalSpent: "$1,890.50",
        status: "active",
        joinDate: "2023-05-22",
        lastOrder: "2024-01-14",
    },
    {
        id: "CUST-003",
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, USA",
        orders: 3,
        totalSpent: "$520.75",
        status: "active",
        joinDate: "2023-09-10",
        lastOrder: "2024-01-12",
    },
    {
        id: "CUST-004",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+1 (555) 456-7890",
        location: "Miami, USA",
        orders: 15,
        totalSpent: "$3,200.25",
        status: "vip",
        joinDate: "2022-11-05",
        lastOrder: "2024-01-13",
    },
    {
        id: "CUST-005",
        name: "David Brown",
        email: "david@example.com",
        phone: "+1 (555) 567-8901",
        location: "Seattle, USA",
        orders: 1,
        totalSpent: "$89.99",
        status: "inactive",
        joinDate: "2023-12-01",
        lastOrder: "2023-12-15",
    },
    {
        id: "CUST-006",
        name: "Lisa Garcia",
        email: "lisa@example.com",
        phone: "+1 (555) 678-9012",
        location: "Austin, USA",
        orders: 6,
        totalSpent: "$1,150.00",
        status: "active",
        joinDate: "2023-07-18",
        lastOrder: "2024-01-10",
    },
];

// ✅ Main Component
export default function Customers() {
    const [searchTerm, setSearchTerm] = useState("");

    const getStatusBadge = (status) => {
        const variants = {
            active: "default",
            vip: "secondary",
            inactive: "outline",
        };
        return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
    };

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusCount = (status) =>
        customers.filter((c) => c.status === status).length;

    const totalCustomers = customers.length;

    const totalRevenue = customers.reduce(
        (sum, c) =>
            sum + parseFloat(c.totalSpent.replace("$", "").replace(",", "")),
        0
    );

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Customers</h1>
                    <p className="text-gray-500">
                        Manage your customer relationships and data
                    </p>
                </div>
                <Button>
                    <UserPlus className="h-4 w-4" />
                    Add Customer
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalCustomers}</p>
                        <p className="text-xs text-gray-500">Registered users</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Active</CardTitle>
                        <Users className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{getStatusCount("active")}</p>
                        <p className="text-xs text-green-500">Active customers</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>VIP</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{getStatusCount("vip")}</p>
                        <p className="text-xs text-blue-600">Premium customers</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Total Revenue</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">From all customers</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="flex gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search customers..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Customer Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.map((customer) => (
                    <Card key={customer.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{customer.name}</h3>
                                        <p className="text-sm text-gray-500">{customer.id}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <button className="h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-100">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Eye className="h-4 w-4" />
                                            View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Edit className="h-4 w-4" />
                                            Edit Customer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Mail className="h-4 w-4" />
                                            Send Email
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Status</span>
                                {getStatusBadge(customer.status)}
                            </div>

                            <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    {customer.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {customer.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    {customer.location}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 border-t pt-2 text-center">
                                <div>
                                    <p className="text-xl font-bold text-blue-600">
                                        {customer.orders}
                                    </p>
                                    <p className="text-xs text-gray-500">Orders</p>
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-green-600">
                                        {customer.totalSpent}
                                    </p>
                                    <p className="text-xs text-gray-500">Total Spent</p>
                                </div>
                            </div>

                            <div className="text-xs text-gray-500">
                                <p>Joined: {customer.joinDate}</p>
                                <p>Last Order: {customer.lastOrder}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty state */}
            {filteredCustomers.length === 0 && (
                <Card className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No customers found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm
                            ? "Try adjusting your search."
                            : "Start adding customers."}
                    </p>
                    <Button>
                        <UserPlus className="h-4 w-4" />
                        Add Customer
                    </Button>
                </Card>
            )}
        </div>
    );
}
