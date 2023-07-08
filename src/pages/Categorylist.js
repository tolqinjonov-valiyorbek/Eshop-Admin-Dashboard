import React, {useEffect, useState} from 'react'
import { Table } from "antd";
import {Link }from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { deleteAProductCategory, getCategories } from '../features/pcategory/pcategorySlice';
import CustomModal from '../components/CustomModal';

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
      title: "Action",
      dataIndex: "action",
    },
  ];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState(" ");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const hideModal = (e) => {
    console.log(e);
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getCategories());
  },);
  const pCatState = useSelector((state) => state.pcategory.pCategories)
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
     key: i + 1,
     name: pCatState[i].title,
     
      action: (
       <>
         <Link to={`/admin/category/${pCatState[i]._id}`}
          className="fs-3 text-danger">
           <BiEdit />
         </Link>
         ,
         <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCatState[i]._id)}
          >
            <MdDelete />
          </button>
       </>
     ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
        <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
     <CustomModal
     open={open}
     hideModal={hideModal}
     performAction={() => {
       deleteCategory(pCatId);
     }}
     title="Are you sure you want to delete this Product Category ?"
   />
    </div>
  )
}

export default Categorylist