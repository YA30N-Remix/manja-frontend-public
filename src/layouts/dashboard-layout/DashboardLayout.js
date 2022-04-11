import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DashboardLayout.scss";

const DashboardLayout = ({ children }) => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    document.body.classList.add("dashboard-layout");
    return () => {
      // Anything in here is fired on component unmount.
      document.body.classList.remove("dashboard-layout");
    };
  }, []);
  return (
    <div className="layout-root">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
};

export default DashboardLayout;
