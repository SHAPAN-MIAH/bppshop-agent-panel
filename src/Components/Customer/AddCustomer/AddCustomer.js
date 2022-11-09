import React from "react";
import './AddCustomer.css'

const AddCustomer = () => {
  return (
    <div className="add-customer-section">
      <div className="container-fluid">
        <h2>Add Customer</h2>
        <div className="add-customer-form-container">
          <form>
            <div>
              <label for="">Customer Id</label>
              <br />
              <input type="text" name="" value="#123413" />
            </div>

            <div>
              <label for="">Customer Name</label>
              <br />
              <input type="text" name="" placeholder="Enter Customer Name"/>
            </div>
            <div>
              <label for="">Customer Email</label>
              <br />
              <input type="email" name="" placeholder="Enter Customer Email"/>
            </div>
            <div>
              <label for="">Customer Mobile</label>
              <br />
              <input type="text" name="" placeholder="Enter Mobile Number"/>
            </div>
            <div>
              <label for="">Customer Zone/Area</label>
              <br />
              <input type="text" name="" placeholder="Enter Customer Zone"/>
            </div>
            <div>
              <label for="">Customer Division</label>
              <br />
              <input type="text" name="" placeholder="Enter Customer Division"/>
            </div>
            <div>
              <label for="">Customer Address</label>
              <br />
              <textarea type="text" name="" placeholder="Enter Customer Address"/>
            </div>
            
          </form>
          <button type="">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
