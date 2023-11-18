import { cdn } from "@/utils/cdn";
import { css } from "@emotion/css";
import { Avatar } from "antd";
import clsx from "clsx";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Krathong } from "@/interfaces/Krathong";
import { pb } from "@/utils/pocketbase";

interface Props {
    className?: string;
    data?: Krathong;
}

const Kratong: NextPage<Props> = ({ className, data }) => {
    const [ShowDetail, setShowDetail] = useState(false);
    const [url, setUrl] = useState<string | undefined>(undefined);

    const fileNameToUrl = async () => {
        if (data?.authorimageUpload) {
            const record = await pb.collection('krathong').getOne(data?.id!);
            const url = pb.files.getUrl(record, data?.authorimageUpload!, { 'thumb': '100x250' });
            setUrl(url);
        } else {
            setUrl(cdn + data?.authorimageDefault!);
        }

    }

    useEffect(() => {
        fileNameToUrl();
    }, [])


    return (
        <motion.div
            onMouseEnter={() => setShowDetail(true)}
            onMouseLeave={() => setShowDetail(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={clsx("kratong-anim before: relative w-[10rem]", className)}
        >
            {ShowDetail && (
                <div className="absolute bottom-[7rem] z-50 w-[10rem] -translate-y-5 rounded-lg border-2 border-gray-400 bg-white/80 p-2 text-xs">
                    {data?.blessing}
                </div>
            )}
            <div className="absolute bottom-[6rem] z-50 flex translate-x-[7rem] md:translate-x-[9rem] gap-2">
                <Avatar src={url}  />
                <span>{data?.authorName}</span>
            </div>
            {/* <div className="absolute bottom-[3.8rem] z-50 flex translate-x-[8rem] md:translate-x-[10rem] gap-2">
                <Avatar />
                <span>fdkdnfhfi;</span>
            </div> */}
            <img
                src={cdn + "/krathong/3.webp"}
                className="pointer-events-none relative z-10 w-[8rem] md:w-[10rem]"
                alt=""
            />
        </motion.div>
    );
};

export default Kratong;
