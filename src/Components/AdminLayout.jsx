import { Bell, Search, User } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import AdminSidebar from "./AdminSidebar";

// Sidebar Context & Provider
export const SidebarContext = createContext({ toggle: () => { }, open: false });
export const SidebarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    return (
        <SidebarContext.Provider value={{ toggle, open }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Sidebar toggle button for mobile
export const SidebarTrigger = () => {
    const { toggle } = useContext(SidebarContext);
    return (
        <button
            onClick={toggle}
            className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300 md:hidden"
            aria-label="Toggle Sidebar"
        >
            ≡
        </button>
    );
};

// Button component
export const Button = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md transition";
    const sizeStyles = size === "icon" ? "h-10 w-10 p-2" : "px-4 py-2";
    const variantStyles =
        variant === "ghost"
            ? "bg-transparent hover:bg-gray-100 text-black"
            : "bg-black text-white hover:bg-gray-800";
    return (
        <button
            className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Input component
export const Input = ({ className = "", ...props }) => {
    return (
        <input
            className={`border border-gray-300 bg-white rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
        />
    );
};

// Main layout component
export const AdminLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gray-50 overflow-x-hidden">
                <AdminSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger />
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search products, orders, customers..."
                                    className="pl-10 w-80 max-w-full bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="flex-1 p-6 overflow-auto">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
};
