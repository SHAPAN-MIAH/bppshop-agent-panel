import React from 'react';
import { Outlet } from 'react-router-dom';
import './OrderHistory.css'

const OrderHistory = () => {
  return (
    <div className='orderHistory-section'>
      <Outlet/>
    </div>
  );
};

export default OrderHistory;