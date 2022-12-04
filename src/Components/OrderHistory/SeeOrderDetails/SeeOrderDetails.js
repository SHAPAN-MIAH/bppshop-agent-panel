import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import "./SeeOrderDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./../../../BaseUrl/BaseUrl";

const customStyles = {
  content: {
    width: "450px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "10px 20px",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 0 500vmax rgb(0 0 0 / 0.3)",
  },
};

const OrderHistoryDetailsData = [
  {
    status: "success",
    message: "Order details",
    data: {
      order_id: "100111",
      payment_status: "unpaid",
      order_status: "unpaid",
      payment_method: "unpaid",
      order_amount: 5000,
      order_date: "29-11-2022 12:13PM",
      discount_amount: 30,
      customer_name: "Rashed sir xx",
      shipping_address: "sector 11, Uttara",
      products: [
        {
          product_name: "Bashundhara Screw Macaroni",
          price: 1000,
          discount: 20,
          quantity: 2,
        },
        {
          product_name: "Zahedi Dates 10 Kg",
          price: 1500,
          discount: 10,
          quantity: 2,
        },
      ],
    },
  },
];

const SeeOrderDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [orderHistoryDetailsData, setOrderHistoryDetailsData] = useState(
    OrderHistoryDetailsData
  );

  // console.log(orderHistoryDetailsData[0].data);

  useEffect(() => {
    axios
      .get(baseURL + `/agent/order/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log(res.data.data));
  }, [id]);

  return (
    <div className="order-history-details-section">
      <div className="container-fluid">
        <div className="order-history-details-header">
          <h2>Order Details</h2>
        </div>
        <div className="order-history-details-content-container">
          <h4>Customer Name: {orderHistoryDetailsData[0].data.customer_name}</h4>
          <div className="order-details-all">
          <p><span>Order Id:</span> {orderHistoryDetailsData[0].data.order_id}</p>
          <p><span>Order Date:</span> {orderHistoryDetailsData[0].data.order_date}</p>
          <p><span>Order Amount:</span> {orderHistoryDetailsData[0].data.order_amount}</p>
          <p><span>Discount Amount:</span> {orderHistoryDetailsData[0].data.discount_amount}</p>
          <p><span>Order Status:</span> {orderHistoryDetailsData[0].data.order_status}</p>
          <p><span>Payment Method:</span> {orderHistoryDetailsData[0].data.payment_method}</p>
          <p><span>Payment Status:</span> {orderHistoryDetailsData[0].data.payment_status}</p>
          <p><span>Shipping Address:</span> {orderHistoryDetailsData[0].data.shipping_address}</p>
          </div>
          <div>
            <h4>Products: </h4>
            {/* {orderHistoryDetailsData[0].data.products.map(productItem => <ul>
            <li>Product Name: {productItem.product_name}</li>
            <li>Quantity: {productItem.quantity}</li>
            <li>Price: {productItem.price}</li>
            <li>Discount: {productItem.discount}</li>
          </ul>)} */}
          
          <table>
            <thead>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
            </thead>
            <tbody>
            {orderHistoryDetailsData[0].data.products.map(productItem => (
                <tr>
                  <td>{productItem.product_name}</td>
                  <td>{productItem.quantity}</td>
                  <td>{productItem.price}</td>
                  <td>{productItem.discount}</td>
                  {/* <td className="d-flex justify-content-around">
                    <button onClick={() => handleLoginAsCustomer(listData?.id)}>Login </button>{" "}
                    <Link to={`/customer/customer-details/${listData?.id}`}><i className="bi bi-eye customerEdit-Btn"></i></Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <span
            style={{
              fontSize: "22px",
              color: "red",
              display: "flex",
              justifyContent: "right",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
            <i className="bi bi-x-lg"></i>
          </span>
          <div className="cash-memo-container">
            <div className="modal-header">
              <h5>BBP Shop</h5>
              <div>
                <p>
                  Alhaz Samssuddin Mansion (9thfloor),Moghbazar, <br /> New
                  Eskaton, Ramna Dhaka-1217 <br /> Office Phone: 01611815656{" "}
                  <br /> BIN - 001181565-5566 <br /> Mushak- 6.3
                </p>
              </div>
            </div>
            <div className="bbpShop-cash-memo">
              <strong>--- BBP Shop Cash Memo ---</strong>
              <div className="d-flex justify-content-between">
                <small>Invoice# : INV\689f9\54</small>
                <small>Cashier: Hasib</small>
              </div>
              <div className="d-flex justify-content-between">
                <small>Bill Date: 30-02-2021</small>
                <small>Time: 09.00</small>
              </div>

              <div className=" SLArticle-DescriptionUM-QuantityUnit-PriceVatDiscountTotal">
                <small>
                  <strong>SL. Article</strong> <strong>Description</strong>{" "}
                  <strong>UM</strong> <strong>Quantity</strong>{" "}
                  <strong>Unit Price</strong> <strong>Vat</strong>{" "}
                  <strong>Discount</strong>
                  <strong>Total(TK)</strong>
                </small>
              </div>
              <div className=" SLArticle-DescriptionUM-QuantityUnit-PriceVatDiscountTotal2">
                <small>
                  <span>1.GDGDFFDFF231</span> <span>Shampoo 340ml</span>{" "}
                  <span>EA</span> <span>1</span> <span>100.00</span>{" "}
                  <span>3.25</span> <span>12.00</span>
                  <span>91.52</span>
                </small>
              </div>
              <div className=" SLArticle-DescriptionUM-QuantityUnit-PriceVatDiscountTotal2">
                <small>
                  <span>1.GDGDFFDFF231</span> <span>Shampoo 340ml</span>{" "}
                  <span>EA</span> <span>2</span> <span>75.00</span>{" "}
                  <span>7.50</span> <span>00.00</span>
                  <span>157.50</span>
                </small>
              </div>

              <div className="billSummary">
                <div className="billSummary-header">
                  <strong>Bill Summary</strong>
                </div>
                <div>
                  <div className="billSummary-content">
                    <small>Sub Total Qty x Price</small>
                    <small>250.00 Tk</small>
                  </div>
                  <div className="billSummary-content">
                    <small>Total Discount</small>
                    <small>12.00 Tk</small>
                  </div>
                  <div className="billSummary-content">
                    <small>Special Discount</small>
                    <small>10.00 Tk</small>
                  </div>
                  <div className="billSummary-content">
                    <small>Total Vat</small>
                    <small>11.00 Tk</small>
                  </div>
                  <div className="billSummary-content">
                    <small>Net Amount</small>
                    <small>239.00 Tk</small>
                  </div>
                </div>
                <div className="net-payable-amount">
                  <strong>Net Payable Amount: </strong>
                  <strong>239.00 Tk</strong>
                </div>
                <div className="payment-details">
                  <strong>Payment Details</strong>
                </div>
                <div className="cash-paid">
                  <small>Cash Paid: </small>
                  <small>500.00 Tk</small>
                </div>
                <div className="change-amount">
                  <strong>Change Amount: </strong>
                  <strong>261.00 Tk</strong>
                </div>
              </div>

              <div className="callForHomeDelivery">
                <strong>Call For Home Delivery 01611815656</strong>
              </div>
              <div className="recycle-offer">
                <strong>Recycle Offer</strong>
                <li>
                  Recycle our shopping bag and get cash for each bag as discount
                  on your purchase.
                </li>
              </div>
              <div className="recycle-offer">
                <strong>Return Policy:</strong>
                <li>
                  Please bring your receipt as proof of purchase for return of
                  exchange within 3 days.
                </li>
                <li>
                  No pershable return or exchange after 3 hrs of purchase.
                </li>
                <li>Money refund is not available.</li>
              </div>
              <div className="memo-fotter">
                <strong>
                  Share Your Opinion at customerservice@bppshop.com
                </strong>
                <small>Thank you for being with us.</small>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SeeOrderDetails;
