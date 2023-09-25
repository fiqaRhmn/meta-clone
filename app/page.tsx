import { Metadata } from 'next'
import '@/styles/globals.css'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '@/typing'


export const metadata: Metadata = {
  title: 'Meta Messengers',
}

async function Homepage() {
  const data = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000/"}/api/getMessages`)
  .then((res) => res.json());
  const messages: Message[] = data.messages;

  return (
    
    <main>
        {/* Message List */}
        <MessageList initialMessages={messages} />
        {/* ChatInput */}
        <ChatInput/>
    </main>
    
  )
}

export default Homepage
