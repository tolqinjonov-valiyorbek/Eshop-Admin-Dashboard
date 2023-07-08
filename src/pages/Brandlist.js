import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { deleteABrand, getBrands } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState(" ");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = (e) => {
   // console.log(e);
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(resetState())
    dispatch(getBrands());
  });
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          ,
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="mb-4">Brand List</h3>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand ?"
      />
    </div>
  );
};

export default Brandlist;
