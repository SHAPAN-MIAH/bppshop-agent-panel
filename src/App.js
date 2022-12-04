import React, { createContext, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import UpdateAgent from "./Components/UpdateAgent/UpdateAgent";
import PendingCommission from "./Components/MyCommission/PendingCommission/PendingCommission";
import CommissionHistory from "./Components/MyCommission/CommissionHistory/CommissionHistory";
import ViewProfile from "./Components/ViewProfile/ViewProfile";
import CustomerDetails from "./Components/Customer/CustomerDetails/CustomerDetails";
import EditCustomer from "./Components/Customer/EditCustomer/EditCustomer";
import Wallet from "./Components/Wallet/Wallet";

export const UserContext = createContext();
function App() {
  const user = window.localStorage.getItem("token");
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Routes>
          {/* {user &&( */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <AgentPanelHome />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />}></Route>
              <Route path="view-profile" element={<ViewProfile />}></Route>
              <Route
                path="update-agent-profile"
                element={<UpdateAgent />}
              ></Route>

              <Route path="customer" element={<Customer />}>
                <Route path="customer-list" element={<CustomerList />}></Route>
                <Route
                  path="customer-details/:id"
                  element={<CustomerDetails />}
                ></Route>
                <Route path="add-customer" element={<AddCustomer />}></Route>
                {/* <Route path="edit-customer" element={<EditCustomer />}></Route> */}
              </Route>
              <Route path="order-history" element={<OrderHistory />}>
                <Route index element={<OrderHistoryHome />}></Route>
                <Route
                  path="order-details/:id"
                  element={<SeeOrderDetails />}
                ></Route>
                <Route path="order-bills" element={<OrderBills />}></Route>
              </Route>
              <Route path="commission" element={<MyCommission />}>
                <Route path="pending" element={<PendingCommission />} />
                <Route
                  path="commission-history"
                  element={<CommissionHistory />}
                />
              </Route>
              <Route path="wallet" element={<Wallet />}></Route>
            </Route>
          {/* )} */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
