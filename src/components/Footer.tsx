import { NextPage } from 'next'

interface Props { }

const Footer: NextPage<Props> = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='flex text-white flex-col items-center justify-center'>
            <div><a className='' href="https://tech.nisit.ku.ac.th" target='_blank'>Copyright © {currentYear} KU Tech All rights reserved.</a></div>
            <div>Made by <a className='underline' target='_blank' href="https://www.instagram.com/teerut_1t">Teerut</a></div>
            <a className='text-blue-500 underline' href="https://tech.nisit.ku.ac.th/privacy" target='_blank'>นโยบายความเป็นส่วนตัว</a>
        </div>
    )
}

export default Footer