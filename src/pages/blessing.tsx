import { cdn } from '@/utils/cdn'
import { ArrowLeftIcon } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

interface Props { }

const Blessing: NextPage<Props> = () => {
    const { back } = useRouter()
    return (
        <div className='max-w-3xl mx-auto flex flex-col justify-center items-center w-full py-5 px-3'>
            <div className='flex w-full justify-start'>
                <button onClick={back} className='button-sm items-center gap-2'>
                    <ArrowLeftIcon size={20} /> กลับ
                </button>
            </div>
            <img className='max-w-sm w-full' src={cdn + "/logo.png"} alt="" />
            <div className='text-2xl text-white w-full'>
                คำอธิษฐานทั้งหมด
            </div>
            <div className='flex flex-col gap-5 w-full mt-5'>
                {Array(100).fill(0).map((_, i) => (
                    <div className='border-dashed border-2 rounded-md p-5 w-full'>
                        adsfsadf
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blessing