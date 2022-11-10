import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import AgentPanelHome from "./Components/AgentPanelHome/AgentPanelHome";
import MyCommission from "./Components/MyCommission/MyCommission";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import CustomerList from "./Components/Customer/CustomerList/CustomerList";
import AddCustomer from "./Components/Customer/AddCustomer/AddCustomer";
import Customer from "./Components/Customer/Customer";
import SeeOrderDetails from "./Components/OrderHistory/SeeOrderDetails/SeeOrderDetails";
import OrderBills from "./Components/OrderHistory/OrderBills/OrderBills";
import OrderHistoryHome from "./Components/OrderHistory/OrderHistoryHome/OrderHistoryHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AgentPanelHome />}></Route>
        <Route path="/dashboard" element={<AgentPanelHome />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="customer" element={<Customer />}>
            <Route path="customer-list" element={<CustomerList />}></Route>
            <Route path="add-customer" element={<AddCustomer />}></Route>
          </Route>
          <Route path="order-history" element={<OrderHistory />}>
            <Route index element={<OrderHistoryHome />}></Route>
            <Route path="order-details" element={<SeeOrderDetails />}></Route>
            <Route path="order-bills" element={<OrderBills />}></Route>
          </Route>
          <Route path="my-commission" element={<MyCommission />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
