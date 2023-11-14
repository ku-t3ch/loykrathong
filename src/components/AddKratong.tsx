import { Modal } from "antd";
import { MoveRightIcon } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";

interface Props {}

const AddKratong: NextPage<Props> = () => {
  return (
    <>
      <div className="button-xl w-fit gap-2">
        สร้างกระทง <MoveRightIcon />
      </div>
      {/* <Modal open className="">
        asdfasddf
      </Modal> */}
    </>
  );
};

export default AddKratong;
