import { Dialog, Transition } from "@headlessui/react";
import { Form, Modal } from "antd";
import { AnimatePresence } from "framer-motion";
import { MoveRightIcon, XIcon } from "lucide-react";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";

interface Props {}

const AddKratong: NextPage<Props> = () => {
  let [isOpen, setIsOpen] = useState(true);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="button-xl w-fit gap-2" onClick={handleModal}>
        สร้างกระทง <MoveRightIcon />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{}}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom=" -translate-y-[20rem]" enterTo=" scale-100 translate-y-0" leave="ease-in duration-300" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 translate-y-[20rem]">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl border-2 border-gray-300/50 bg-transparent relative p-10 text-left align-middle shadow-xl backdrop-blur-3xl transition-all">
                  
                    <XIcon className="absolute top-3 right-3 text-white cursor-pointer" onClick={closeModal} />
                  <Dialog.Title className="text-2xl font-medium leading-6 text-white">สร้างกระทง</Dialog.Title>
                  <Form className="mt-5">
                    <Form.Item>
                      <input type="text" className="w-full rounded-full bg-black/30 p-5 text-xl text-white focus:outline-none" />
                    </Form.Item>
                    <Form.Item>
                      <button className="button-lg w-full justify-center">สร้างกระทง</button>
                    </Form.Item>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddKratong;
