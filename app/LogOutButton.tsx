"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

function LogOutButton() {
  return (
    <div>
        <button   
        onClick={() => signOut()}   
        className='bg-blue-400 hover:bg-blue-700 text-white rounded font-xs 
        sm:font-sm font-bold mr-2
        py-1 px-2 sm:py-2 sm:px-4'>
            Sign Out
        </button>
    </div>
  )
}

export default LogOutButton
