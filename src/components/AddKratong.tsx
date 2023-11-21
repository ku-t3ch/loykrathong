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
import { KratongState } from "@/interfaces/KratongState";
import KratongAuthorWrapper from "./KratongAuthorWrapper";
import TurnstileWidget from "./TurnstileWidget";
import hasBadWord from "@/utils/hasBadWord";

interface Props { }

const AddKratong: NextPage<Props> = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [Step, setStep] = useState(0);
    const isMobile = useMediaQuery("(max-width: 640px)");
    const krathongApi = api.krathongRouter.send.useMutation();
    const [KeyRecapcha, setKeyRecapcha] = useState<string>()

    const [Kratong, setKratong] = useState<KratongState>({
        krathong: undefined,
        blessing: undefined,
        author1: {
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
            author1: {
                image: undefined,
                name: undefined,
                isImageUpload: undefined,
            },
        })
        setStep(0);
    }

    const onCreateKratong = () => {
        if (!Kratong.krathong || !Kratong.blessing || !Kratong.author1.name || (!Kratong.author1.image && !Kratong.author1.isImageUpload)) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        if (Kratong.author2 && (!Kratong.author2.name || (!Kratong.author2.image && !Kratong.author2.isImageUpload))) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        if (hasBadWord(Kratong.blessing)) {
            toast.error("คำอธิษฐานมีคำหยาบคาย");
            return;
        }

        if (krathongApi.isLoading) return;

        const keyLoading = toast.loading("กำลังสร้างกระทง...");

        krathongApi.mutate({
            krathongImage: Kratong.krathong,
            blessing: Kratong.blessing,
            author1: {
                name: Kratong.author1.name,
                avatar: Kratong.author1.image,
                avatarUpload: Kratong.author1.isImageUpload,
            },
            author2: Kratong.author2 ? {
                name: Kratong.author2.name || "", // provide a default value if name is undefined
                avatar: Kratong.author2.image,
                avatarUpload: Kratong.author2.isImageUpload,
            } : undefined,
            token: KeyRecapcha!
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
                                        <div className="w-full flex flex-col items-center">
                                            <KratongAuthorWrapper
                                                onChange={(data) => {
                                                    setKratong(pre => ({
                                                        ...pre,
                                                        author1: data?.author1,
                                                        author2: data?.author2
                                                    }));
                                                }}
                                                value={{
                                                    author1: Kratong.author1,
                                                    author2: Kratong.author2!,
                                                }}
                                            />
                                            <TurnstileWidget onVerify={(c) => {
                                                setKeyRecapcha(c);
                                            }} />
                                        </div>
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
