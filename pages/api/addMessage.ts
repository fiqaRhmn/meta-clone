// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serverPusher } from '@/pusher';
import redis from '@/redis'
import { Message } from '@/typing'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: Message;
}

type ErrorData = {
    error: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if(req.method!== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  } 

  const {message} = (req.body) //destructuring the body
  
  const newMessage = {
    ...message,
    created_at: Date.now(), //replace with user Date.now() with server timestamp
  };

  //push newMessage to the database(redis)
  await redis.hset('messages', newMessage.id, JSON.stringify(newMessage))
  serverPusher.trigger('messages','new-message', newMessage)
  res.status(200).json({ message: newMessage })
}
