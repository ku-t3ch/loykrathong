import BlessingCoponent from '@/components/BlessingCoponent'
import Footer from '@/components/Footer'
import { Krathong } from '@/interfaces/Krathong'
import { ArrowLeftIcon } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props { }

const Blessing: NextPage<Props> = () => {
    const { back } = useRouter()
    const [Krathongs, setKrathongs] = useState<Krathong[]>([])
    const [page, setPage] = useState(1);
    const [HasMore, setHasMore] = useState(true)
    const [Isloading, setIsloading] = useState(false)

    const getData = async () => {
        setIsloading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/${process.env.NEXT_PUBLIC_POCKETBASE_COLLECTION_NAME}/records?page=${page}&perPage=10&skipTotal=1&sort=-created2`)
        const records = await res.json()
        console.log(records);

        if (records.items.length === 0) {
            setHasMore(false)
        }
        setKrathongs((prevKrathongs) => [...prevKrathongs, ...records.items]);
        setIsloading(false)
    };

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        getData();
    }, [page]);

    return (
        <div className='max-w-3xl mx-auto flex flex-col justify-center items-center w-full py-5 px-3'>
            <div className='flex w-full justify-start mb-10'>
                <button onClick={back} className='button-sm items-center gap-2'>
                    <ArrowLeftIcon size={20} /> กลับ
                </button>
            </div>
            <img className='max-w-sm w-full' src="/assets/logo-2024.png" alt="" />
            <div className='text-2xl text-white w-full text-center'>
                คำอธิษฐานทั้งหมด
            </div>
            <div className='flex flex-col gap-5 w-full mt-5'>
                {Krathongs.length > 0 ? Krathongs.map((item, i) => (
                    <BlessingCoponent key={i} data={item} />
                )) : <div className='text-gray-200 text-center my-2'>ไม่มีคำอธิษฐาน</div>}
            </div>
            {Isloading && <div className='text-white text-xl my-2'>กำลังโหลด...</div>}
            {HasMore && <button
                onClick={loadMore}
                className='button-sm items-center gap-2 mt-5'
            >
                โหลดเพิ่มเติม
            </button>}
            <div className="my-5">
                <Footer />
            </div>
        </div>
    )
}

export default Blessing