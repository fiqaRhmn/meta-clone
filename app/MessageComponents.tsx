import React from 'react'
import { Message } from '@/typing'
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import TimeAgo from'react-timeago';

type Props ={
    message: Message;
    key: string;
}
function MessageComponents({message, key}: Props) {
  
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`hidden sm:inline-block flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
        className='rounded-full mx-2'
        src={message.profilePic}
        alt="profilePicture"
        height={10}
        width={50}
        />
      </div>

      <div>
        <p className={`text-[0.65rem] px-[2px] pb-[2px]  ${isUser ? "text-blue-400 text-right" : "text-red-400 text-left"}`}>{message.user}</p>
        
        <div className={'flex items-end'}>
            <div className={`text-sm sm:text-md px-2 py-1 sm:px-3 sm:py-2 rounded-lg w-fit text-white ${isUser ? "bg-blue-400 ml-auto order-2 " : "bg-red-400"}`}>
                <p>{message.message}</p>
            </div>
       
            <p className={`text-[0.65rem] italic text-gray-300 px-2 ${isUser && "text-right"}`}>
              <TimeAgo date={new Date(message.created_at)} />
            </p>
        </div> 

      </div>
    </div>
  )
}

export default MessageComponents
