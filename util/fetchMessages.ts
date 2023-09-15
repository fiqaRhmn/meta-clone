import { Message } from "@/typing"

const fetcher = async() =>{
    const res = await fetch('/api/getMessages');
    const data = res.ok?await res.json() : [];
    const messages: Message[] = data.messages || [];

    return messages;
}

export default fetcher;