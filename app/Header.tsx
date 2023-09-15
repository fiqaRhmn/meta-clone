import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogOutButton from './LogOutButton';

function Header() {
    const session = true;

    if (session) 
    return(
        <header className='sticky top-0 z-50 bg-white flex
                justify-between items-center shadow-sm
                p-2 sm:p-5'>
        
            <div className='flex space-x-2'>
            <Image 
                className='rounded-full mx-2 object-contain'
                src='/selfie2.jpg'
                alt='profile picture'
                width="50"
                height="10" 
            />
            <div className='flex flex-col text-left justify-center'>
                <p className='text-[10px] sm:text-sm text-blue-400'>Logged in as:</p>
                <p className='text-sm font-bold sm:text-lg'>Afiqah Rahman</p>
            </div>
            </div>

                <LogOutButton />

        </header>
    );  
    else
    return (
        <header className='sticky top-0 z-50 bg-white flex
        justify-center items-center shadow-sm
        p-2 sm:p-5'>
            <div className='flex flex-col items-center space-y-2 sm:space-y-5'>
                <div className='flex space-x-2 items-center'>
                    <Image 
                    src="/logo-meta.png"
                    alt="logo"
                    width="50"
                    height="10"
                    />

                    <p className='text-blue-400'>Welcome to Meta Messanger</p>
                </div>

                <Link 
                href='/auth/signin' 
                className='bg-blue-400 hover:bg-blue-700 text-white rounded font-xs 
                sm:font-sm font-bold
                py-1 px-2 sm:py-2 sm:px-4'>
                    Sign In
                </Link>
            </div> 
        </header>
    ) 
}

export default Header
