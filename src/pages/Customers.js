import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Table } from "antd";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    
  });
}

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  });
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " 
        +  customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4">Customers</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};

export default Customers;
