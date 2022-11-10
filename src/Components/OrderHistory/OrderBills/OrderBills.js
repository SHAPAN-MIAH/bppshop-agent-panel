import React from "react";
import "./OrderBills.css";

const OrderBills = () => {

  const BillsFolderHandler = () => {
    const orderBillsFolderDownload = document.querySelector(
      ".order-bills-folder-download"
    );

    orderBillsFolderDownload.style.display = "block";
  };


  return (
    <div>
      <h2>Order Bills Folder</h2>

      <div className="order-bills-folder-container">
        <div onClick={BillsFolderHandler} className="order-bill-folder">
          <i class="bi bi-folder-fill"></i>
          <br />
          <small>dd/mm/yy</small>
        </div>
        <div onClick={BillsFolderHandler} className="order-bill-folder">
          <i class="bi bi-folder-fill"></i>
          <br />
          <small>dd/mm/yy</small>
        </div>
        <div onClick={BillsFolderHandler} className="order-bill-folder">
          <i class="bi bi-folder-fill"></i>
          <br />
          <small>dd/mm/yy</small>
        </div>
        <div onClick={BillsFolderHandler} className="order-bill-folder">
          <i class="bi bi-folder-fill"></i>
          <br />
          <small>dd/mm/yy</small>
        </div>
        <div onClick={BillsFolderHandler} className="order-bill-folder">
          <i class="bi bi-folder-fill"></i>
          <br />
          <small>dd/mm/yy</small>
        </div>
        <div onClick={BillsFolderHandler} className="order-bill-folder">
          <i class="bi bi-folder-fill"></i>
          <br />
          <small>dd/mm/yy</small>
        </div>
      </div>

      <div className="order-bills-folder-download">
        folder view
      </div>
    </div>
  );
};

export default OrderBills;
