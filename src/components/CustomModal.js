import React from "react";
import { Modal } from "antd";
const CustomModal = (props) => {
  const { open, showModal, performAction, title } = props;
  return (
    <>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={performAction}
        onCancel={showModal}
        okText="OK"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
    </>
  );
};

export default CustomModal;
