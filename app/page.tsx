import React from 'react'
import { Metadata } from 'next'
import '@/styles/globals.css'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

export const metadata: Metadata = {
  title: 'Meta Messengers',
}

function Homepage() {
  return (
    <div>
        {/* Message List */}
        <MessageList />
        {/* ChatInput */}
        <ChatInput />
    </div>
  )
}

export default Homepage
