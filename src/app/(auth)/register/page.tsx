"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaRegEye } from "react-icons/fa6";//hide
import { FaRegEyeSlash } from "react-icons/fa6";//see
import axios from "axios"
import { useRouter } from "next/navigation";

const Register = () => {
  const router=useRouter()
  const [toggle,setToggle]=useState(false)
  const[loading,setLoading]=useState<boolean>(false)
  const[errors,setErrors]=useState<registerErrorType>({})
  const[authState,setAuthState]=useState({
    name:"",
    email:"",
    password:"",
    password_confirmation:""
  })

  const googleLogin = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const githubLogin = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const submitData=async (e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    await axios.post("/api/auth/register",authState)
    .then((res)=>{
      setLoading(false)
      const response=res.data
      if(response.status==200){
        console.log("user signup")
        router.push(`/login?message=${response.message}`)
      }
      else if(response?.status==400){
        setErrors(response?.errors)
      }
    })
    .catch((err)=>{
      setLoading(false)
      console.log("somethinf went wrong",err)
    })


  }
  return (
    <>
      <div className="flex items-center justify-center  ">
        <div className="w-full border  max-w-md p-8 space-y-6  rounded-lg shadow-lg mt-[2vh] ">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full shadow ">
              <Image
                src="/images/register.png"
                height={50}
                width={50}
                alt="logo"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center ">
            Create your account
          </h2>

          <form className="space-y-4 " onSubmit={submitData}>
            <div className="name">
              <input

                type="text"
                onChange={(e)=>setAuthState({...authState,name:e.target.value})}
                id="name"
                placeholder="Enter your name  "
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 border-gray-300"
                required
              />
              <span className="text-red-500 font-semibold">{errors.name}</span>
            </div>

            <div className="email">
              <input
                type="email"
                onChange={(e)=>setAuthState({...authState,email:e.target.value})}
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 border-gray-300"
                required
              />
              <span className="text-red-500 font-semibold">{errors.email}</span>

            </div>

            <div className="relative password">
              <input
                type={toggle?"text":"password"}
                onChange={(e)=>setAuthState({...authState,password:e.target.value})}
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 border-gray-300"
                required
              />
              {
                toggle?<FaRegEye className="absolute top-4 right-2" onClick={()=>setToggle(!toggle)}/>:<FaRegEyeSlash className="absolute top-4 right-2" onClick={()=>setToggle(!toggle)}/>

              }
              <span className="text-red-500 font-semibold">{errors.password}</span>

              
            </div>

            <div className="relative password">
              <input
                type="password"
                onChange={(e)=>setAuthState({...authState,password_confirmation:e.target.value})}
                id="confirm-password"
                placeholder="confirm password"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 border-gray-300"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white  rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600
              }`}
            >
              {loading?"creating...":"create account"}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-3 mt-6">
            <p className="text-sm text-gray-500">Or sign in with</p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              className="p-3  bg-white rounded-full shadow "
              onClick={googleLogin}
            >
              <Image
                src="/images/google.png"
                alt="Google"
                className="w-5 h-5"
                height={30}
                width={30}
              />
            </button>
            <button
              className="p-3 bg-white rounded-full shadow "
              onClick={githubLogin}
            >
              <Image
                src="/images/github.png"
                alt="github"
                className="w-5 h-5"
                height={30}
                width={30}
              />
            </button>
          </div>
          <p className="text-center text-sm">
            already have an account?
            <Link
              href="/login"
              className="text-sm text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
