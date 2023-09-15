'use client'
import { FormEvent, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { v4 as uuid } from 'uuid'
import { Message } from '@/typing'
import useSWR from 'swr'
import fetcher from '@/util/fetchMessages'

function ChatInput() {
  const [input,setInput] = useState("")
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  console.log(messages);
  const addMessage = async (e: FormEvent<HTMLFormElement> ) =>{
    e.preventDefault(); //nothing refresh

    if (!input) return; //if no input just return
    const messageToSend = input; // saving input to a variable
    setInput("");//once press send input is blank
    const id = uuid();
    
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      user: 'Afiqah',
      profilePic: '/selfie2.jpg',
      email:' afiqah_ika@hotmail.com'
    };
    
    const uploadMessageTpUpstash = async() => {
      const data = await fetch('/api/addMessage',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        message,
        }),
      }).then(res => res.json());

      return [data.message, ...messages!];
    };
    await mutate(uploadMessageTpUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };


  return (
    <form 
    onSubmit={addMessage} 
    className='fixed bottom-0 z-50 border-t border-gray-100 
    w-full flex space-x-2 p-2 bg-white'>
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
      disabled={!input}
      className='disabled:opacity-50 hover:bg-gray-300 border-none \
      rounded-full p-3'
      >
        <PaperAirplaneIcon 
        className='w-8 h-8 sm:w-6 sm:h-6 text-blue-500 ' />
      </button>
    </form>
  )
}

export default ChatInput
