// src/Ui/CustomUi.jsx

import React, { createContext, useContext, useState } from "react";
import { Menu } from "lucide-react";

// Sidebar Context
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);

// Sheet Components
export const Sheet = ({ open, onOpenChange, children }) => {
    return open ? (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => onOpenChange(false)}
        >
            {children}
        </div>
    ) : null;
};

export const SheetTrigger = ({ asChild, children }) => {
    return children;
};

export const SheetContent = ({ side, className, children }) => {
    return (
        <div
            className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} h-full bg-white shadow-lg z-50 ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
};

// SidebarTrigger uses Sheet components above
export const SidebarTrigger = () => {
    const { isOpen, setIsOpen } = useSidebar();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open sidebar"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 w-64">
                <button
                    className="mb-4 text-sm underline"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close sidebar"
                >
                    Close
                </button>
                <div>Sidebar Content Here</div>
            </SheetContent>
        </Sheet>
    );
};

// Reusable Button
export const Button = ({ children, className = "", variant = "default", size = "md", ...props }) => {
    const baseStyle =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
        default: "bg-primary text-white hover:bg-primary/90",
        ghost: "bg-transparent hover:bg-muted",
    };
    const sizes = {
        md: "h-10 px-4 py-2 text-sm",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Reusable Input
export const Input = ({ className = "", ...props }) => {
    return (
        <input
            className={`w-full h-10 px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 ${className}`}
            {...props}
        />
    );
};
