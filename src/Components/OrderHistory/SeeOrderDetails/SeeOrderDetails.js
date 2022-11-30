import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import "./SeeOrderDetails.css";

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
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
  {
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
  {
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
  {
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
  {
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
  {
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
  {
    Date: "10-11-2022",
    orderId: "3452345",
    customerName: "Jamal Uddin",
    totalItem: 12,
    payAmount: 34000,
    salesCommission: 1400,
  },
];

const SeeOrderDetails = () => {
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
  return (
    <div className="container-fluid">
      <div className="customer-list-header">
            <h2>Order History Details</h2>
            <div>
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
      <div className="commission-history-contact-print">
        <div>
          <p>
            Customer Name : <span>Rahim Mahmud</span>
          </p>
          <p>
            Customer Id : <span>#wtf454</span>
          </p>
        </div>
      </div>
      <div className="history-table">
        <table>
          <tr>
            <th>Date</th>
            <th>Order Id</th>
            <th>Total Items</th>
            <th>Pay Amount</th>
            <th>Sales Commission</th>
            <th>Action</th>
          </tr>
          {orderHistoryDetailsData.map((listData) => (
            <tr>
              <td>{listData.Date}</td>
              <td>{listData.orderId}</td>
              <td>{listData.totalItem}</td>
              <td>৳ {listData.payAmount}</td>
              <td>৳ {listData.salesCommission}</td>

              <td>
                <i style={{cursor: "pointer"}} className="bi bi-eye" onClick={openModal}></i>
                <i style={{cursor: "pointer"}} className="bi bi-printer"></i>
              </td>
            </tr>
          ))}
        </table>
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
