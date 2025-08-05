import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";



export function MetricCard({ title, value, change, changeType, icon: Icon, gradient = "primary" }) {
    const gradientClasses = {
        primary: "bg-metric-gradient",
        success: "bg-success-gradient",
        warning: "bg-warning-gradient"
    };

    const changeClasses = {
        positive: "text-success",
        negative: "text-destructive",
        neutral: "text-muted-foreground"
    };

    return (
        <Card className="border-0 shadow-admin-md hover:shadow-admin-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${gradientClasses[gradient]}`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <p className={`text-xs ${changeClasses[changeType]} flex items-center gap-1 mt-1`}>
                    {change}
                    <span className="text-muted-foreground">from last month</span>
                </p>
            </CardContent>
        </Card>
    );
}