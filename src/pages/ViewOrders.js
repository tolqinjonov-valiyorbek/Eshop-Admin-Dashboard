import React, { useEffect } from "react";
import { Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { getOrderByUser } from "../features/auth/authSlice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ViewOrders = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  });
  const orderState = useSelector((state) => state.auth.orderbyuser[0].products);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      count: orderState[i].product.count,
      amount: orderState[i].product.price,
      date: orderState[i].product.createdAt,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          ,
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4"> View Order</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};

export default ViewOrders;
