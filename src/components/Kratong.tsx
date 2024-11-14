import { cdn } from "@/utils/cdn";
import { css } from "@emotion/css";
import { Avatar } from "antd";
import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Krathong } from "@/interfaces/Krathong";
import { pb } from "@/utils/pocketbase";
import { RecordModel } from "pocketbase";
import fileNameToUrl from "@/utils/fileNameToUrl";

interface Props {
    className?: string;
    data?: Krathong;
}

const Kratong: NextPage<Props> = ({ className, data }) => {
    const [ShowDetail, setShowDetail] = useState(false);

    const avatar1 = data?.authorimageUpload ?? data?.authorimageDefault
    const avatar2 = data?.authorimageUpload2 ?? data?.authorimageDefault2
    // const avatar2 = fileNameToUrl(data?.authorimageUpload2!, data?.authorimageDefault2!, data!)

    return (
        <motion.div
            onMouseEnter={() => setShowDetail(true)}
            onMouseLeave={() => setShowDetail(false)}
            initial={{ opacity: 0, translateY: '-100px' }}
            animate={{ opacity: 1, translateY: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={clsx("kratong-anim relative w-[10rem] h-fit flex items-end", className)}
        >
            {ShowDetail && (
                <div className="absolute bottom-[7rem] whitespace-normal truncate z-50 max-w-[10rem] -translate-y-5 rounded-lg border-2 border-gray-400 bg-white/80 p-2 text-xs">
                    {data?.blessing}
                </div>
            )}
            <div className="absolute bottom-[4rem] z-50 flex items-center translate-x-[3rem] md:translate-x-[5rem]">
                <Avatar src={avatar1} className="bg-white/80 border-yellow-600 border-2 translate-x-[30px]" size={"large"} />
                <span className="bg-white/80 border-2 whitespace-nowrap border-yellow-600 h-fit px-2 rounded-full pl-8">{data?.authorName}</span>
            </div>
            {data?.authorName2 && <div className="absolute bottom-[1rem] z-50 flex items-center translate-x-[5rem] md:translate-x-[7rem]">
                <Avatar src={avatar2} className="bg-white/80 border-yellow-600 border-2 translate-x-[30px]" size={"large"} />
                <span className="bg-white/80 border-2 whitespace-nowrap border-yellow-600 h-fit px-2 rounded-full pl-8">{data?.authorName2}</span>
            </div>}

            <img
                src={cdn + "/" + data?.image!}
                className="pointer-events-none object-contain relative z-10 w-[8rem] md:w-[10rem]"
                alt=""
            />
        </motion.div>
    );
};

export default Kratong;
