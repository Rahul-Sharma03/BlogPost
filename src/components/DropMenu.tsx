"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Signout from './Signout';
import { IoMdSettings } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropMenu = () => {
  const [position, setPosition] = React.useState("bottom")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><IoMdSettings/></Button>
        {/* <Profile/> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <h1 className='text-center underline'>Developer Info</h1>
          <Link href="/">
          <DropdownMenuRadioItem value="top" className='gap-[10px] cursor-pointer'>Github<FaGithub/></DropdownMenuRadioItem>

          </Link>
          <Link href="https://www.linkedin.com/in/rahul-sharma-a10b2b239/"  >
          <DropdownMenuRadioItem value="bottom" className='gap-[10px] cursor-pointer'>Linkedin<FaLinkedin /></DropdownMenuRadioItem>
          </Link>
          <DropdownMenuRadioItem value="right"><Signout/></DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropMenu