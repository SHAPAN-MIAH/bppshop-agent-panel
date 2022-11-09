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
          <Route path="order-history" element={<OrderHistory />}></Route>
          <Route path="my-commission" element={<MyCommission />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
