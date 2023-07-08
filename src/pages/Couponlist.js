import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { deleteACoupon, getAllCoupon } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount.length - b.discount.length,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState(" ");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = (e) => {
    console.log(e);
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupon());
  });
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].title,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),

      action: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          ,
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (e) => {
     dispatch(deleteACoupon(e));
    setOpen(false);
     setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this brand ?"
      />
    </div>
  );
};

export default Couponlist;
