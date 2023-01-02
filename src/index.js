import React,{ lazy, Suspense} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import App from "./App";
import UserProvider from "./ContextApi/Context/UserProvider";
import reportWebVitals from "./reportWebVitals";
// import LoadingGif from "../src/assets/image/2023-01-02 00-07-46_1.gif";

const App = lazy(()=> import("./App"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        {/* <Suspense fallback={<div className=" d-flex justify-content-center "><img style={{marginTop: "150px"}} src={LoadingGif} alt="" /></div>}> */}
          <App />
        {/* </Suspense> */}
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
