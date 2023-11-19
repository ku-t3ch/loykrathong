import { Krathong } from '@/interfaces/Krathong'
import { cdn } from '@/utils/cdn'
import { pb } from '@/utils/pocketbase'
import { Avatar } from 'antd'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface Props {
    data: Krathong
}

const BlessingCoponent: NextPage<Props> = ({ data }) => {

    const [ImageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const fileNameToUrl = async () => {
        if (data?.authorimageUpload) {
            const record = await pb.collection('krathong').getOne(data?.id!);
            const url = pb.files.getUrl(record, data?.authorimageUpload!, { 'thumb': '100x250' });
            setImageUrl(url)
        } else {
            setImageUrl(cdn + data?.authorimageDefault!)
        }
    }

    useEffect(() => {
        fileNameToUrl();
    }, [])

    return (
        <div className='p-5 w-full relative flex gap-3 rounded-lg border-2 border-gray-400 bg-white/80'>
            <img className='w-[6rem]' src={cdn + "/" + data.image} alt="" />
            <div className='flex flex-col gap-1'>
                <div className='flex'>
                    <Avatar src={ImageUrl} size={"default"} />
                    <span className="whitespace-nowrap h-fit rounded-full">{data?.authorName}</span>
                </div>
                <div className='w-[10rem] p-2 text-xs'>
                    {data?.blessing}
                </div>
            </div>
            <div className='absolute bottom-2 right-2'>
                {new Date(data?.created!).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </div>
        </div>
    )
}

export default BlessingCoponent