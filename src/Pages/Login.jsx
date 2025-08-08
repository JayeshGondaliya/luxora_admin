import React, { useState } from "react";
import axios from "axios";
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAdminContext } from "../Context/Context";

export const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    const sizes = {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
    };
    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const Card = ({ children, className = '', ...props }) => (
    <div
        className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}
        {...props}
    >
        {children}
    </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`mb-4 ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
    <h2 className={`text-xl font-semibold tracking-tight ${className}`} {...props}>
        {children}
    </h2>
);

export const CardDescription = ({ children, className = '', ...props }) => (
    <p className={`text-sm text-gray-500 ${className}`} {...props}>
        {children}
    </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
    <div className={`${className}`} {...props}>
        {children}
    </div>
);
export const Input = ({ className = '', ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
        {...props}
    />
);

export const Checkbox = ({ id, checked, onCheckedChange }) => (
    <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 rounded border border-border text-primary focus:ring-ring"
    />
);

export const Label = ({ children, htmlFor = '', className = '' }) => (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
        {children}
    </label>
);

export const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, className = '' }) => (
    <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => onValueChange([value[0], Number(e.target.value)])}
        className={`w-full cursor-pointer ${className}`}
    />
);

// Sheet Components
export const Sheet = ({ children }) => <>{children}</>;
export const SheetTrigger = ({ children }) => children;
export const SheetHeader = ({ children }) => <div className="mb-4">{children}</div>;
export const SheetTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>;
export const SheetContent = ({ children, side = 'left', className = '' }) => (
    <div className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-80 bg-white p-6 z-50 shadow-lg overflow-y-auto ${className}`}>
        {children}
    </div>
);



export const SelectTrigger = ({ children, className = '', open, setOpen }) => (
    <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`}
    >
        {children}
        <ChevronDown className="ml-2 h-4 w-4" />
    </button>
);

export const SelectValue = ({ placeholder, value }) => (
    <span>{value || placeholder}</span>
);

export const SelectContent = ({ children, open }) =>
    open ? (
        <div className="absolute z-50 mt-2 w-36 bg-white border border-border rounded-md shadow-md">
            {children}
        </div>
    ) : null;

export const SelectItem = ({ children, value: itemValue, onValueChange, setOpen }) => (
    <div
        onClick={() => {
            onValueChange(itemValue);
            setOpen(false);
        }}
        className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
    >
        {children}
    </div>
);

const AdminLogin = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setAdminId } = useAdminContext()
    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setSuccess("");
        setFormData({ name: "", email: "", password: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = isLogin
            ? "https://luxora-backend-guh1.onrender.com/api/admin/adminLogin"
            : "https://luxora-backend-guh1.onrender.com/api/admin/register";

        try {
            const res = await axios.post(url, formData, {
                withCredentials: true,
            });

            if (res.data.success) {
                setSuccess(res.data.message);
                setAdminId(res.data.admin.id)
                setError("");

                if (isLogin) {
                    toast.success("Login successful");
                    // setAdminId(res.data.admin.id)
                    navigate("/dashboard");

                } else {
                    toast.success("Registration successful");
                }

                setFormData({ name: "", email: "", password: "" });
            } else {
                setError(res.data.message);
                setSuccess("");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error");
            setSuccess("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 bg-admin-primary/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-admin-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-32 w-40 h-40 bg-admin-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <Card className="shadow-strong border-0 backdrop-blur-sm bg-card/95 animate-fade-in">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium animate-float">
                            {isLogin ? (
                                <LogIn className="w-8 h-8 text-white" />
                            ) : (
                                <UserPlus className="w-8 h-8 text-white" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                                {isLogin ? "Admin Portal" : "Create Admin Account"}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                {isLogin ? "Welcome back! Please sign in to continue." : "Set up your admin credentials to get started."}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg animate-slide-in">
                                <p className="text-destructive text-sm text-center font-medium">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-success/10 border border-success/20 rounded-lg animate-slide-in">
                                <p className="text-success text-sm text-center font-medium">{success}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2 animate-slide-in">
                                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="pl-10 h-11 border-border/50 focus:border-primary transition-all duration-300 hover:border-border"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="admin@example.com"
                                        className="pl-10 h-11 border-border/50 focus:border-primary transition-all duration-300 hover:border-border"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="pl-10 pr-10 h-11 border-border/50 focus:border-primary transition-all duration-300 hover:border-border"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-gradient-primary hover:scale-[1.02] transition-all duration-300 shadow-medium hover:shadow-strong font-semibold"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    <>
                                        {isLogin ? (
                                            <>
                                                <LogIn className="w-4 h-4 mr-2" />
                                                Sign In
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="w-4 h-4 mr-2" />
                                                Create Account
                                            </>
                                        )}
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-card text-muted-foreground">
                                    {isLogin ? "New to the platform?" : "Already have an account?"}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={toggleMode}
                            className="w-full h-11 border border-border/50 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-medium"
                        >
                            {isLogin ? (
                                <>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Create New Account
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In Instead
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminLogin;
