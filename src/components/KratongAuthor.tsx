import { AuthorState } from "@/interfaces/AuthorState";
import { CheckIcon, UploadIcon } from "lucide-react";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
interface Props {
    onChange: (data: AuthorState) => void;
    value?: AuthorState;
}

const KratongAuthor: NextPage<Props> = ({ onChange, value }) => {
    const input = useRef<HTMLInputElement>(null);

    const [Select, setSelect] = useState<string | undefined>(value?.image || "assets/avatar/1.webp");
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
                reader.onload = async () => {
                    const base64 = reader.result as string;
                    const resizedImage = await resizeImage(base64, 300, 300); // Adjust the maxWidth and maxHeight accordingly
                    setSelect(undefined);
                    setImage(resizedImage);
                };
            }
        });
    };

    const resizeImage = (base64: string, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise((resolve) => {
            const img = new window.Image();
            img.src = base64 as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, width, height);

                const resizedBase64 = canvas.toDataURL("image/jpeg");
                resolve(resizedBase64);
            };
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
            <div className="flex flex-col gap-3 w-full">
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
                    <div onClick={() => onSelect("assets/avatar/1.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={"assets/avatar/1.webp"} alt="" />

                        {Select === "assets/avatar/1.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                    <div onClick={() => onSelect("assets/avatar/2.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={"assets/avatar/2.webp"} alt="" />
                        {Select === "assets/avatar/2.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                    <div onClick={() => onSelect("assets/avatar/3.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={"assets/avatar/3.webp"} alt="" />
                        {Select === "assets/avatar/3.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                    <div onClick={() => onSelect("assets/avatar/4.webp")} className="relative flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border text-white hover:bg-black/30">
                        <img className="object-cover" src={"assets/avatar/4.webp"} alt="" />
                        {Select === "assets/avatar/4.webp" && (
                            <div className="absolute bottom-1 right-1 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-green-500 md:h-[2rem] md:w-[2rem]">
                                <CheckIcon />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-3 flex flex-col">
                    <div className="flex w-full gap-3 rounded-md bg-black/20 p-3 text-white">
                        <div className="flex whitespace-nowrap">ชื่อ :</div>
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
