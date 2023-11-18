import { cdn } from "@/utils/cdn";
import { Button, Upload } from "antd";
import { CheckIcon, UploadCloudIcon, UploadIcon } from "lucide-react";
import { NextPage } from "next";
import { ReactEventHandler, useEffect, useRef, useState } from "react";

interface onChangeData {
    image: string | undefined;
    name: string;
    isImageUpload: string | undefined;
}

interface Props {
    onChange: (data: onChangeData) => void;
    value?: onChangeData;
}

const KratongAuthor: NextPage<Props> = ({ onChange, value }) => {
    const input = useRef<HTMLInputElement>(null);
    const [Select, setSelect] = useState<string | undefined>(value?.image || "/avatar/1.webp");
    const [Image, setImage] = useState<string | undefined>(value?.isImageUpload || undefined);
    const [inputValue, setInputValue] = useState(value?.name || "");

    const handleInputChange = (e: any) => {
        if (e.target.value.length <= 10) {
            setInputValue(e.target.value);
        }
    };

    const onUpload = () => {
        input.current?.click();
        input.current?.addEventListener("change", (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const base64 = reader.result;
                    setSelect(undefined);
                    setImage(base64 as string);
                };
            }
        });
    };

    const onSelect = (url: string) => {
        setSelect(url);
        setImage(undefined);
    };

    useEffect(() => {
        onChange({
            image: Select,
            name: inputValue,
            isImageUpload: Image,
        });
    }, [Select, Image, inputValue]);

    useEffect(() => {
        setSelect(value?.image)
        setImage(value?.isImageUpload)
        setInputValue(value?.name || "")
    }, [])


    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-3 sm:justify-around">
                    <div onClick={onUpload} className="flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        {!Image ? (
                            <div className="flex flex-col items-center justify-center">
                                <UploadIcon />
                                อัพโหลดรูป
                            </div>
                        ) : (
                            <img src={Image} alt="" />
                        )}
                    </div>
                    <div onClick={() => onSelect("/avatar/1.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={cdn + "/avatar/1.webp"} alt="" />
                        
                        {Select === "/avatar/1.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                    <div onClick={() => onSelect("/avatar/2.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={cdn + "/avatar/2.webp"} alt="" />
                        {Select === "/avatar/2.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                    <div onClick={() => onSelect("/avatar/3.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={cdn + "/avatar/3.webp"} alt="" />
                        {Select === "/avatar/3.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                    <div onClick={() => onSelect("/avatar/4.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={cdn + "/avatar/4.webp"} alt="" />
                        {Select === "/avatar/4.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-3 flex flex-col">
                    <div className="flex w-full gap-3 rounded-md bg-black/20 p-3 text-white">
                        <div className="flex whitespace-nowrap">ชื่อตัวเอง :</div>
                        <input type="text" className="h-full w-full bg-transparent outline-none" value={inputValue} onChange={handleInputChange} maxLength={10} />
                    </div>
                    <div className="flex justify-end text-white">
                        <div>{10 - inputValue.length}</div>
                    </div>
                </div>
            </div>
            <input ref={input} type="file" className="hidden" maxLength={10} />
        </>
    );
};

export default KratongAuthor;
