import { Krathong } from '@/interfaces/Krathong'
import { cdn } from '@/utils/cdn'
import fileNameToUrl from '@/utils/fileNameToUrl'
import { Avatar, Divider } from 'antd'
import { NextPage } from 'next'
import { useMediaQuery } from 'usehooks-ts'
import { motion } from 'framer-motion'

interface Props {
    data: Krathong
}

const BlessingCoponent: NextPage<Props> = ({ data }) => {
    const isMobile = useMediaQuery('(max-width: 640px)')
    const avatar1 = data?.authorimageUpload || data?.authorimageDefault
    const avatar2 = data?.authorimageUpload2 || data?.authorimageDefault2

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='p-5 w-full h-[10rem] relative flex gap-5 rounded-md border bg-black/50 md:px-10 px-5 py-2 text-white'>
            <motion.img
                initial={{ opacity: 0, translateY: '-100px' }}
                animate={{ opacity: 1, translateY: '0px' }}
                exit={{ opacity: 0 }}
                className='w-[6rem] drop-shadow-lg object-contain' src={cdn + "/" + data.image} alt="" />
            <div className='flex flex-col gap-1 truncate py-2'>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-2 p-1 rounded-lg'>
                        <Avatar src={avatar1} size={isMobile ? 30 : 40} />
                        <span className="whitespace-nowrap h-fit rounded-full">{data?.authorName}</span>
                    </div>
                    {data.authorName2 && <div className='flex items-center gap-2 p-1 rounded-lg'>
                        <Avatar src={avatar2} size={isMobile ? 30 : 40} />
                        <span className="whitespace-nowrap h-fit rounded-full">{data?.authorName2}</span>
                    </div>}

                </div>
                <div className='w-full p-2 text-xs whitespace-pre-line'>
                    {data?.blessing}
                </div>
            </div>
            <div className='absolute bottom-2 right-2 md:right-5 text-xs'>
                {new Date(data?.created2!).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                })}
            </div>
        </motion.div>
    )
}

export default BlessingCoponent