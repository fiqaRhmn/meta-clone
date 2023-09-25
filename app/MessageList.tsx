'use client'
import { Message } from '@/typing';
import fetcher from '@/util/fetchMessages';
import { useEffect } from 'react';
import useSWR from 'swr';
import MessageComponents from './MessageComponents';
import { clientPusher } from '@/pusher';

type Props = {
    initialMessages: Message[]
}

function MessageList({initialMessages}:Props) {
  // Fetch messages using SWR
  const { data: messages, error, mutate } = useSWR<Message[]>('/api/getMessages', fetcher);

  useEffect(() => {
    // Subscribe to the 'messages' channel using Pusher
    const channel = clientPusher.subscribe('messages');
    
    channel.bind('new-message', async (data: Message) => {
      // Check if the message already exists
      if (messages?.find((message) => message.id === data.id)) return;

      // Update messages with the new message
      if (!messages) {
        // If messages is null, re-fetch data
        mutate(fetcher);
      } else {
        // Add the new message to the beginning of the list
        mutate(fetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });
  }, [messages, mutate, clientPusher]);  

  return (
    <div className='space-y-3 px-3 pt-8 pb-32 max-w-2xl mx-auto overflow-hidden'>
      {error ? (
        // Handle the error condition
        <div>Error fetching messages: {error.message}</div>
      ) : messages ? (
        // Render messages if available
        (messages || initialMessages).map((message) => (
          <MessageComponents key={message.id} message={message} />
        ))
      ) : (
        // Show a loading spinner or message while fetching data
        <div className="text-center text-blue-300">
          Loading your messages...
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
