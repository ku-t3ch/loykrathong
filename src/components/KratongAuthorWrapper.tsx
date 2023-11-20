import { AuthorState } from '@/interfaces/AuthorState';
import { NextPage } from 'next'
import KratongAuthor from './KratongAuthor';
import { useEffect, useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { Divider } from 'antd';

interface onChangeData {
    author1: AuthorState
    author2?: AuthorState
}


interface Props {
    onChange: (data: onChangeData) => void;
    value?: onChangeData;
}

const KratongAuthorWrapper: NextPage<Props> = ({ onChange, value }) => {

    const [Author, setAuthor] = useState<onChangeData>()

    useEffect(() => {
        onChange(Author!)
    }, [Author])

    const onAddAuthor2 = () => {
        setAuthor(pre => ({
            author1: pre!.author1,
            author2: {
                image: undefined,
                name: undefined,
                isImageUpload: undefined,
            },
        }))
    }

    const onRemoveAuthor2 = () => {
        setAuthor(pre => ({
            author1: pre!.author1,
            author2: undefined,
        }))
    }

    return (
        <div className='flex flex-col gap-2 items-center w-full'>
            {Author?.author2 && <div className='text-2xl self-start text-white font-bold'>
                คนที่ 1
            </div>}
            <KratongAuthor onChange={(c) => setAuthor(pre => ({ author1: c, author2: pre?.author2 }))} />
            {Author?.author2 ? <>
                <Divider />
                <div className='text-2xl self-start text-white font-bold'>
                    คนที่ 2
                </div>
                <div className='relative w-full'>
                    <KratongAuthor onChange={(c) => setAuthor(pre => ({ author1: pre!.author1, author2: c }))} />
                </div>
                <button onClick={onRemoveAuthor2} className='button-sm w-fit items-center gap-1'><XIcon size={15} />  ลอยเดี่ยว</button>
            </> : <button onClick={onAddAuthor2} className='button-sm w-fit items-center gap-1'><PlusIcon size={15} /> ลอยคู่</button>}

            <Divider />
        </div>
    )
}

export default KratongAuthorWrapper