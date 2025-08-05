import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);

  const checkAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/admin/get-admin", {
        withCredentials: true,
      });

      if (res.data.success &&res.data.isAdmin) {
      setAdminId(res.data.data.data._id); // safer if consistent


      } else {
        setAdminId(null);
      }
    } catch (error) {
      console.log("Error checking admin:", error);
      setAdminId(null);
    }
  };

  useEffect(() => {
    checkAdmin(); 
  }, []);

  return (
    <AdminContext.Provider value={{ adminId ,setAdminId}}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
