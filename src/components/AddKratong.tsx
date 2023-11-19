import { Dialog, Transition } from "@headlessui/react";
import { Modal, Steps } from "antd";
import { MoveLeftIcon, MoveRightIcon, XIcon } from "lucide-react";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import SelectKratong from "./SelectKratong";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import InputBlessing from "./InputBlessing";
import KratongAuthor from "./KratongAuthor";
import toast from "react-hot-toast";
import { api } from "@/utils/api";

type KratongState = {
    krathong: string | undefined;
    blessing: string | undefined;
    author: {
        image: string | undefined;
        name: string | undefined;
        isImageUpload: string | undefined;
    };
};

interface Props { }

const AddKratong: NextPage<Props> = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [Step, setStep] = useState(0);
    const isMobile = useMediaQuery("(max-width: 640px)");
    const krathongApi = api.krathongRouter.send.useMutation();

    const [Kratong, setKratong] = useState<KratongState>({
        krathong: undefined,
        blessing: undefined,
        author: {
            image: undefined,
            name: undefined,
            isImageUpload: undefined,
        },
    });

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const nextStep = () => {
        setStep((pre) => pre + 1);
    };

    const prevStep = () => {
        if (Step === 0) return;
        setStep((pre) => pre - 1);
    };

    const resetForm = () => {
        setKratong({
            krathong: undefined,
            blessing: undefined,
            author: {
                image: undefined,
                name: undefined,
                isImageUpload: undefined,
            },
        })
        setStep(0);
    }

    const onCreateKratong = () => {
        if (!Kratong.krathong || !Kratong.blessing || !Kratong.author.name || (!Kratong.author.image && !Kratong.author.isImageUpload)) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        if (krathongApi.isLoading) return;

        const keyLoading = toast.loading("กำลังสร้างกระทง...");

        krathongApi.mutate({
            krathongImage: Kratong.krathong,
            blessing: Kratong.blessing,
            author: {
                name: Kratong.author.name,
                avatar: Kratong.author.image,
                avatarUpload: Kratong.author.isImageUpload,
            }
        }, {
            onSuccess: () => {
                toast.success("สร้างกระทงสำเร็จ", {
                    id: keyLoading
                });
                closeModal();
                resetForm();
            },
            onError: (error) => {
                toast.error(error.message, {
                    id: keyLoading
                });
            }
        })
    };

    return (
        <>
            <button className="button-xl w-fit gap-2" onClick={handleModal}>
                ไปลอยกระทง <MoveRightIcon />
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom=" -translate-y-[20rem]" enterTo=" scale-100 translate-y-0" leave="ease-in duration-300" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 translate-y-[20rem]">
                                <Dialog.Panel className="relative flex w-full max-w-2xl transform flex-col gap-5 overflow-hidden rounded-2xl border-2 border-gray-300/50 bg-transparent p-5 text-left align-middle shadow-xl backdrop-blur-3xl transition-all md:p-10">
                                    <XIcon className="absolute right-3 top-3 cursor-pointer text-white" onClick={closeModal} />
                                    <Dialog.Title className="text-2xl font-medium leading-6 text-white">สร้างกระทง</Dialog.Title>
                                    <Steps
                                        current={Step}
                                        direction="horizontal"
                                        responsive={false}
                                        items={[
                                            {
                                                title: isMobile ? "" : "เลือกกระทง",
                                            },
                                            {
                                                title: isMobile ? "" : "คำอธิษฐาน",
                                            },
                                            {
                                                title: isMobile ? "" : "ผู้สร้าง",
                                            },
                                        ]}
                                    />
                                    {Step === 0 ? (
                                        <SelectKratong
                                            onSelect={(v) => {
                                                setKratong((pre) => ({ ...pre, krathong: v }));
                                            }}
                                            value={Kratong.krathong}
                                        />
                                    ) : Step === 1 ? (
                                        <InputBlessing
                                            onChange={(v) => {
                                                setKratong((pre) => ({ ...pre, blessing: v }));
                                            }}
                                            value={Kratong.blessing}
                                        />
                                    ) : (
                                        <KratongAuthor
                                            onChange={(data) => {
                                                setKratong((pre) => ({ ...pre, author: data }));
                                            }}
                                            value={Kratong.author as any}
                                        />
                                    )}

                                    <div className="flex justify-center gap-5">
                                        {Step !== 0 && (
                                            <button onClick={prevStep} className="button-md gap-2">
                                                <MoveLeftIcon /> ย้อนกลับ
                                            </button>
                                        )}

                                        <button onClick={Step === 2 ? onCreateKratong : nextStep} className="button-md gap-2">
                                            {Step === 2 ? (
                                                <>สร้างกระทง</>
                                            ) : (
                                                <>
                                                    ถัดไป <MoveRightIcon />
                                                </>
                                            )}
                                        </button>
                                    </div>
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