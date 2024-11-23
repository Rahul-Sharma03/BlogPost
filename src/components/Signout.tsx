"use client"
import React from 'react'
import { buttonVariants } from "@/components/ui/button"


import { signOut } from 'next-auth/react';
import { IoIosLogOut } from "react-icons/io";


const Signout = () => {
 

  return (
   <div>
    <button onClick={()=>signOut({callbackUrl:"/login",redirect:true})} className={buttonVariants({ variant: "default" })}><IoIosLogOut />Logout</button>
   </div>

  )
}

export default Signout