'use client'
import { FormEvent, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

function ChatInput() {
  const [input,setInput] = useState("")

  const addMessage = (e: FormEvent<HTMLFormElement> ) =>{
    e.preventDefault(); //nothing refresh
    console.log("addMessage called")
    if (!input) return; //if no input just return
    const messageToSend = input; // saving input to a variable
    setInput("");//once press send input is blank
  }

  return (
    <form 
    onSubmit={addMessage} 
    className='fixed bottom-0 z-50 border-t border-gray-100 
    w-full flex space-x-2 p-2'>
      <input 
        type="text" 
        value={input}
        onChange={e=> setInput(e.target.value)}
        placeholder="Message" 
        className='flex-1 rounded-full border border-gray-300 
        focus:outline-none focus:right-2 focus:border-transparent
        px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
      />
      
      <button 
      type="submit"
      className=' disabled:bg-opacity-50 hover:bg-gray-300 border-none \
      rounded-full p-3'
      >
        <PaperAirplaneIcon 
        className='w-8 h-8 sm:w-6 sm:h-6 text-blue-500 ' />
      </button>
    </form>
  )
}

export default ChatInput
