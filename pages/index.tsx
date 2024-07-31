import Image from "next/image";
import { Inter } from "next/font/google";
import { User } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] });

import React from 'react'

const Loginpage = () => {

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const router = useRouter()

  const handleLogin = async () => {
    try {

      if (!credentials.email || !credentials.password) throw new Error("Please fill all the fields")

      const response = await (await fetch("/api/login", { method: "POST", body: JSON.stringify(credentials) })).json()

      if (!response.success) throw new Error(response.message)

      alert(response.message)
      router.replace("/user")
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (<>
    <Navbar pathname="/"/>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} `}
    >
      <div className="max-w-sm w-full flex flex-col justify-center items-center gap-8">
        <User className="size-20 text-violet-500" />
        <p>Dont have an account <Link className="text-violet-500" href="/signup">Sign up</Link></p>

        <div className="w-full space-y-3">
          <div className="w-full">
            <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-violet-500 rounded-lg" placeholder="Email Address" value={credentials.email} onChange={({ target: { value } }) => setCredentials({ ...credentials, email: value })} />
          </div>

          <div className="w-full">
            <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-violet-500 rounded-lg" placeholder="Password" type="password" value={credentials.password} onChange={({ target: { value } }) => setCredentials({ ...credentials, password: value })} />
          </div>

        </div>
        <button className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all ease-in-out duration-200" onClick={handleLogin}>Sign in</button>
      </div >
    </main ></>
  )
}

export default Loginpage