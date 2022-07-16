import { useState, useRef, FormEvent } from 'react'

import ThemeSwitcher from './components/ThemeSwitcher'
import CardDownload from './components/CardDownload'

interface Dev {
  name: string
  login: string
  bio: string
  avatarUrl: string
  location: string
}

const App = () => {

  const BASE_API_URL = 'https://api.github.com'

  const cardRef = useRef(null)
  const [name, setName] = useState<string>("")
  const [dev, setDev] = useState<Dev>()

  const fetchFromApi = async (e: FormEvent) => {
    e.preventDefault()

    const data = await fetch(`${BASE_API_URL}/users/${name}`)
    const devData = await data.json()

    const parsedDev: Dev = {
      login: devData.login,
      avatarUrl: devData.avatar_url,
      bio: devData.bio,
      location: devData.location,
      name: devData.name
    }

    setDev(parsedDev)
    setName('')

  }

  return <div className="flex relative flex-col items-center gap-y-8 p-8 w-full min-h-screen bg-gray-300 dark:bg-gray-900 font-pop transition-colors duration-200">
    <ThemeSwitcher />
    { dev ? <CardDownload card={cardRef} name={dev.name} /> : '' }
    <div className="flex flex-col items-center gap-y-6">
      <img className="dark:invert h-16" src="/img/github-logo.png" alt="Github Logo" />
      <h1 className="dark:text-white text-5xl font-extrabold">GitDex!</h1>
      <p className="text-2xl dark:text-white">Find your favorite dev!</p>
      <form className='flex flex-row items-center gap-x-4' onSubmit={e => fetchFromApi(e)}>
        <input className='w-full p-4 text-center dark:text-white bg-transparent border-2 rounded-xl border-gray-500 hover:border-gray-900 hover:dark:border-white transition-colors duration-300 outline-none' type="text" placeholder='Dev name' value={name} onChange={(e => setName(e.target.value))} />
        <button type='submit' className='border-2 p-3 rounded-xl border-gray-500 hover:border-gray-900 hover:dark:border-white hover:bg-gray-900 hover:dark:bg-white transition-colors duration-300 group'>
          <svg className="dark:text-white w-8 h-8 group-hover:text-white dark:group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </form>
    </div>
    {dev ? 
      <div className='flex flex-col items-center text-center dark:text-white border-2 border-gray-900 bg-white dark:bg-gray-900 dark:border-white lg:w-1/3 sm:w-2/3 w-full p-8 gap-y-4 rounded-xl' ref={cardRef}>
        <a target='_blank' href={`https://github.com/${dev.login}`} className='text-3xl cursor-pointer font-bold'>@{dev.login}</a>
        <img className='rounded-full border border-black dark:border-transparent' src={dev.avatarUrl} alt={`${dev.login} profile picture`} />
        <p className='text-xl'>{dev.name}</p>
        <p className='text-lg text-justify mt-2'>{dev.bio}</p>
        <p className='text-sm text-gray-500'>{dev.location}</p>
      </div>
      :
      ''
    }
  </div>

}

export default App