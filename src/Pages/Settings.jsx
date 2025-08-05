
import {
    Settings as SettingsIcon,
    Store,
    Bell,
    Shield,
    CreditCard,
    Truck,
    Users,
    Mail,
    Save
} from "lucide-react";
import React, { useState } from 'react';

const Switch = ({ defaultChecked = false, onChange }) => {
    const [checked, setChecked] = useState(defaultChecked);

    const toggle = () => {
        setChecked(!checked);
        if (onChange) onChange(!checked);
    };

    return (
        <button
            onClick={toggle}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-blue-600" : "bg-gray-300"
                }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-0"
                    }`}
            />
        </button>
    );
};

const Label = ({ children, htmlFor, className = "" }) => (
    <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-700 ${className}`}
    >
        {children}
    </label>
);

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

export default function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">Manage your store configuration and preferences</p>
                </div>
                <Button className="bg-primary hover:bg-primary-hover">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                </Button>
            </div>

            {/* Settings Sections */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Store Information */}
                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Store className="h-5 w-5" />
                            <CardTitle>Store Information</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input id="store-name" placeholder="My Awesome Store" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="store-description">Description</Label>
                            <Input id="store-description" placeholder="Brief description of your store" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="store-email">Contact Email</Label>
                            <Input id="store-email" type="email" placeholder="contact@mystore.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="store-phone">Phone Number</Label>
                            <Input id="store-phone" placeholder="+1 (555) 123-4567" />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>New Orders</Label>
                                <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Low Stock Alerts</Label>
                                <p className="text-sm text-muted-foreground">Alert when products are running low</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Customer Messages</Label>
                                <p className="text-sm text-muted-foreground">Notifications for customer inquiries</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Marketing Updates</Label>
                                <p className="text-sm text-muted-foreground">Weekly performance reports</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            <CardTitle>Security</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Settings */}
                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <CardTitle>Payment Settings</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Accept Credit Cards</Label>
                                <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>PayPal Integration</Label>
                                <p className="text-sm text-muted-foreground">Allow PayPal payments</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Apple Pay</Label>
                                <p className="text-sm text-muted-foreground">Quick checkout with Apple Pay</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Default Currency</Label>
                            <Input id="currency" placeholder="USD" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Settings */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            <CardTitle>Shipping</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Free Shipping</Label>
                            <Switch defaultChecked />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shipping-threshold">Free Shipping Threshold</Label>
                            <Input id="shipping-threshold" placeholder="$50.00" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <CardTitle>Customer</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Guest Checkout</Label>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Account Creation</Label>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-admin-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            <CardTitle>Email</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Order Confirmations</Label>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Newsletter</Label>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}