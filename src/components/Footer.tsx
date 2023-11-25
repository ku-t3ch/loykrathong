import { NextPage } from 'next'

interface Props { }

const Footer: NextPage<Props> = () => {
    return (
        <div className='flex text-white flex-col items-center justify-center'>
            <div><a className='font-bold underline' href="https://www.facebook.com/ku.t3ch" target='_blank'>KU Tech</a> x <a className='font-bold underline' href="https://www.facebook.com/kusab.bk" target='_blank'>KU SAB</a></div>
            <div>Made by <a className='font-bold underline' target='_blank' href="https://www.instagram.com/teerut_1t">Teerut</a></div>
            <a className='text-blue-500 underline' href="https://tech.nisit.ku.ac.th/privacy" target='_blank'>นโยบายความเป็นส่วนตัว</a>
        </div>
    )
}

export default Footer