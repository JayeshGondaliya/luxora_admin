import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./Components/AdminLayout";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Analytics from "./Pages/Analytics";
import Login from "./Pages/Login";
import "./index.css";
import {  AdminProvider } from "./Context/Context";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};


const App = () => {
  const { loading } = useAdminContext();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;
