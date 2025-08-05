import {
    BarChart3,
    TrendingUp,
    DollarSign,
    Users,
    Calendar,
    Download,
    ShoppingCart,
    Eye,
} from "lucide-react";

// ✅ Card Components
const Card = ({ className = "", children }) => (
    <div className={`rounded-lg border bg-card text-card-foreground ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`px-6 pt-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

const CardContent = ({ children }) => (
    <div className="px-6 pb-4">{children}</div>
);

// ✅ Button Component
const Button = ({
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
            : variant === "outline"
                ? "border border-border bg-white text-black hover:bg-gray-50"
                : "bg-black text-white hover:bg-gray-800";

    return (
        <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
};

// ✅ Main Analytics Page
export default function Analytics() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                    <p className="text-muted-foreground">Detailed insights into your store performance</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date Range
                    </Button>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Revenue Growth */}
                <Card className="shadow-admin-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">+23.5%</div>
                        <p className="text-xs text-muted-foreground">vs previous month</p>
                    </CardContent>
                </Card>

                {/* Conversion Rate */}
                <Card className="shadow-admin-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.2%</div>
                        <p className="text-xs text-green-600">+0.3% from last month</p>
                    </CardContent>
                </Card>

                {/* Avg Order Value */}
                <Card className="shadow-admin-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$127.50</div>
                        <p className="text-xs text-green-600">+12% increase</p>
                    </CardContent>
                </Card>

                {/* Customer Retention */}
                <Card className="shadow-admin-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87.2%</div>
                        <p className="text-xs text-muted-foreground">Returning customers</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-admin-md">
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                        <p className="text-sm text-muted-foreground">Monthly revenue over time</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-muted-foreground">Revenue Chart</p>
                                <p className="text-sm text-muted-foreground">Chart component would go here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-admin-md">
                    <CardHeader>
                        <CardTitle>Top Products Performance</CardTitle>
                        <p className="text-sm text-muted-foreground">Best selling items</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-muted-foreground">Product Performance</p>
                                <p className="text-sm text-muted-foreground">Chart component would go here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Traffic Sources */}
            <Card className="shadow-admin-md">
                <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <p className="text-sm text-muted-foreground">Where your visitors are coming from</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { source: "Organic Search", visitors: "45%", change: "+12%" },
                            { source: "Direct", visitors: "25%", change: "+5%" },
                            { source: "Social Media", visitors: "18%", change: "-3%" },
                            { source: "Email", visitors: "12%", change: "+8%" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                            >
                                <div className="flex items-center gap-3">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{item.source}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold">{item.visitors}</span>
                                    <span
                                        className={`text-sm ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {item.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
