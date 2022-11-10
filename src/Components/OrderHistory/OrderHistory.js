import React from 'react';
import { Outlet } from 'react-router-dom';

const OrderHistory = () => {
  return (
    <div style={{margin: "40px"}}>
      <Outlet/>
    </div>
  );
};

export default OrderHistory;