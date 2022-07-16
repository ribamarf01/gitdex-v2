import { FC } from 'react'

import { toPng } from 'html-to-image'

interface CardDownloadProps {
  card?: React.MutableRefObject<null | any>
  name?: string
}

const CardDownload: FC<CardDownloadProps> = ({ card, name }) => {

  const takeSnapshot = () => {
    toPng(card?.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a')
        link.download = `${name}-${Date.now()}.png`
        link.href = dataUrl
        link.click()
      })
      .catch(err => console.error(err))
  }

  return <div onClick={() => takeSnapshot()} className='absolute left-8 dark:text-white border-2 dark:border-white border-gray-900 rounded-xl p-1 hover:bg-gray-900 hover:text-white hover:dark:bg-white hover:dark:text-black transition-all duration-200 cursor-pointer'>
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
  </div>

}

export default CardDownload