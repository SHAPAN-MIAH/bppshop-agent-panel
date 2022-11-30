import React from "react";
import './MyCommission.css'
import { Outlet } from 'react-router-dom';


const MyCommission = () => {
  return (
    <div>
        <Outlet />
    </div>
  );
};

export default MyCommission;
