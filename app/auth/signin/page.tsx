import { getProviders, signIn } from "next-auth/react"
import Image from 'next/image'
import SignInComponent from "./SignInComponent"


async function SignInPage() {
  const providers = await getProviders() 
  
  return (
    <div>
      <div>
        <Image
        className="rounded-full mx-2 object-cover"
        src='/messenger logo.png'
        alt='meta logo' 
        width={500}
        height={500}/>
      </div>
      <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignInPage
