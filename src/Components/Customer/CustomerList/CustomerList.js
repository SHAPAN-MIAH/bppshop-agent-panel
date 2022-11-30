import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./CustomerList.css";
import axios from "axios";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import { Link, useNavigate } from 'react-router-dom';


const CustomerList = () => {
  const navigate = useNavigate()
  const [customerListData, setCustomerListData] = useState([]);
  let currentPage = 1;

  const token = sessionStorage.getItem("token");
  const url = baseURL+`/agent/customer/all`;
  useEffect(() => {
    /*axios
      .post(url, data,
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((res) => setCustomerListData(res.data.data));*/

    // axios({
    //   method: 'post',
    //   url: url,
    //   data: data,
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }).then((res) => setCustomerListData(res.data.data));

    fetchCustomerList(currentPage);
  }, []);

  const fetchCustomerList = (currentPage) => {
    // axios
    //   .get(baseURL + `/agent/alluser?page=${currentPage}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     console.log(res.data.total)
    //     const data = res.data.data.data;
    //     setCustomerListData(data);
    //     // console.log(data);
    //   })
    //   .catch((er) => {
    //     console.log(er);
    //   });

    axios({
      method: 'post',
      url: url,
      data: {
        page: currentPage,
        no_of_rows: 10
      },
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res) => setCustomerListData(res.data.data.data));
  };

  const handlePageClick = async (data) => {
    await fetchCustomerList(data.selected + 1);
  };

 const  url2 = baseURL+`/agent/customer/loginAsCustomer/`

  const handleLoginAsCustomer = (id) => {
    axios.get(url2 + id, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      console.log(res.data)

      if(res.data.status == "success"){
        window.location.href = 'https://bppshop.com.bd/customer/auth/force-login-by-agent?token=' + res.data.data.token; 
        return null
      }
    })
  }

  // const handleCustomerDetails = id => {
  //   navigate(`/customer-details/${id}`)
  // }


  return (
    <div className="customer-list-section">
      <div className="container-fluid">
        <div className="customer-list-header">
          <h2>Customer List</h2>
          <div className="customer-list-input-btn">
            <button type="">
              Add New Customer <i className="bi bi-person-plus-fill"></i>
            </button>
            <input type="" name="" placeholder="Search Customer Name/ID" />
          </div>
        </div>
        <div className="customer-list-print">
          <p>
            Print:{" "}
            <button type="">
              <i className="bi bi-printer"></i>
            </button>
          </p>
        </div>

        <div className="table-container mb-4">
          <table>
            <thead>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Mobile Number</th>
              <th>Customer Address</th>
              <th>Action</th>
            </thead>
            <tbody>
              {customerListData.map((listData) => (
                <tr>
                  <td># {listData?.id}</td>
                  <td>{listData?.customer_name}</td>
                  <td>{listData?.customer_email}</td>
                  <td>{listData?.customer_mobile}</td>
                  <td>{listData?.customer_address}</td>
                  <td className="d-flex justify-content-around">
                    <button onClick={() => handleLoginAsCustomer(listData?.id)}>Login </button>{" "}
                    {/* <Link onClick={() => handleCustomerDetails(listData?.id)}><i className="bi bi-eye customerEdit-Btn"></i></Link> */}
                    <Link to={`/customer/customer-details/${listData?.id}`}><i className="bi bi-eye customerEdit-Btn"></i></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={15}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />

          <div className="select-customer-btn-container">
            <button type="">Select Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
