import { getProviders } from "next-auth/react"
import Image from 'next/image'
import SignInComponent from "./SignInComponent"
import { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'Sign In to Messenger',
}

async function SignInPage() {
  const providers = await getProviders() 
  
  return (
    <div>
      <div className="flex justify-center mt-20 mb-10">
        <Image
        className="rounded-full mx-2 object-cover"
        src='/messenger logo.png'
        alt='meta logo' 
        width={200}
        height={200}/>
      </div>
      <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignInPage
