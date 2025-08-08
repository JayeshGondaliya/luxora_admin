import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);
const [loading,setLoading]=useState(true)
  const checkAdmin = async () => {
    try {
      const res = await axios.get("https://luxora-backend-guh1.onrender.com/api/admin/get-admin", {
        withCredentials: true,
      });

      if (res.data.success ) {
      setAdminId(res.data.adminId); 


      } else {
        setAdminId(null);
      }
    } catch (error) {
      console.log("Error checking admin:", error);
      setAdminId(null);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    checkAdmin(); 
  }, []);
  if (loading) {
    return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <AdminContext.Provider value={{ adminId ,setAdminId,loading,setLoading}}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
