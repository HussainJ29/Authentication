//signup ka code
import Image from "next/image";
import { Inter } from "next/font/google";
import { User } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] });


const SignupPage = () => {

    const [userDetails, setUserDetails] = useState({
        fullname: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirmPassword: "",
    })

    const router = useRouter()

    const handleSignup = async () => {
      try {
          // Validation for Full Name
          if (!userDetails.fullname) throw new Error("Full Name is required");
          if (/[^a-zA-Z\s]/.test(userDetails.fullname)) throw new Error("Full Name should not have special characters or numbers");
  
          // Validation for Email
          if (!userDetails.email) throw new Error("Email is required");
          if (!/\S+@\S+\.\S+/.test(userDetails.email)) throw new Error("Email is not valid");
  
          // Validation for Phone Number
          if (!userDetails.phone) throw new Error("Phone Number is required");
          if (!/^\+?[1-9]\d{1,14}$/.test(userDetails.phone)) throw new Error("Phone Number is not valid");
  
          // Validation for Date of Birth
          if (!userDetails.dob) throw new Error("Date of Birth is required");
  
          // Validation for Password
          if (!userDetails.password) throw new Error("Password is required");
          if (userDetails.password.length < 6 || userDetails.password.length > 14) throw new Error("Password should be between 6 and 14 characters long");
          if (!/[a-z]/.test(userDetails.password)) throw new Error("Password should contain at least one lowercase letter");
          if (!/[A-Z]/.test(userDetails.password)) throw new Error("Password should contain at least one uppercase letter");
          if (!/[!@#$%^&*]/.test(userDetails.password)) throw new Error("Password should contain at least one special character");
  
          // Validation for Confirm Password
          if (!userDetails.confirmPassword) throw new Error("Confirm Password is required");
          if (userDetails.password !== userDetails.confirmPassword) throw new Error("Password and Confirm Password do not match");
  
          const response = await (await fetch("/api/signup", { method: "POST", body: JSON.stringify(userDetails) })).json();
  
          if (!response.success) throw new Error(response.message);
  
          alert(response.message);
          router.replace("/");
      } catch (error: any) {
          alert(error.message);
      }
  }
  

    return (<>
        <Navbar pathname="/signup" />
        <main
            className={`flex flex-col items-center justify-between p-16 ${inter.className} `}
        >
            <div className="max-w-lg w-full flex flex-col justify-center items-center gap-8 p-8 bg-white">
                <User className="size-20 text-rose-500" />
                <p>Already have an account <Link className="text-rose-500" href="/">Sign in</Link></p>

                <div className="w-full space-y-3">
                    <div className="w-full">
                        <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-rose-500 rounded-lg" placeholder="Full name" value={userDetails.fullname} onChange={({ target: { value } }) => setUserDetails({ ...userDetails, fullname: value })} />
                    </div>

                    <div className="w-full">
                        <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-rose-500 rounded-lg" placeholder="Email Address" value={userDetails.email} onChange={({ target: { value } }) => setUserDetails({ ...userDetails, email: value })} />
                    </div>

                    <div className="w-full">
                        <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-rose-500 rounded-lg" placeholder="Phone no" value={userDetails.phone} onChange={({ target: { value } }) => setUserDetails({ ...userDetails, phone: value })} />
                    </div>

                    <div className={`w-full${!userDetails.dob ? " text-gray-400" : ""}`}>
                        <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-rose-500 rounded-lg" placeholder="Date of birth" type="date" value={userDetails.dob} onChange={({ target: { value } }) => setUserDetails({ ...userDetails, dob: value })} />
                    </div>

                    <div className="w-full">
                        <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-rose-500 rounded-lg" placeholder="Password" type="password" value={userDetails.password} onChange={({ target: { value } }) => setUserDetails({ ...userDetails, password: value })} />
                    </div>

                    <div className="w-full">
                        <input className="w-full outline-none p-2 border border-gray-300 focus:ring-1 ring-rose-500 rounded-lg" placeholder="Confirm Password" type="password" value={userDetails.confirmPassword} onChange={({ target: { value } }) => setUserDetails({ ...userDetails, confirmPassword: value })} />
                    </div>
                </div>

                <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all ease-in-out duration-200" onClick={handleSignup}>Sign up</button>
            </div >
        </main ></>
    )
}

export default SignupPage