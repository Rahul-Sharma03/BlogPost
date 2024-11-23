import React from "react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { ModeToggle } from "./theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
// import Signout from "./Signout";
// import { FaGithub } from "react-icons/fa";
import DropMenu from "./DropMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <nav className="flex h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur items-center justify-between z-20">
        {/* <div className="font-bold text-ld md:text-xl">Blog Application</div> */}
        <Image src="/images/logo.png" height={45} width={45} alt="logo" />

        <ul className="hidden md:flex w-full justify-end space-x-4 items-center">
          <li className="space-x-2">
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={buttonVariants({ variant: "outline" })}
            >
              Signup
            </Link>
          </li>

          <ModeToggle />
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="flex h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur items-center justify-between z-20">
        {/* <div className="font-bold text-ld md:text-xl">Blog Application</div> */}
        <Link href="/">
          <Image src="/images/logo.png" height={45} width={45} alt="logo" />
        </Link>
        <ul className="hidden md:flex w-full justify-end space-x-4 items-center">
          {/* <ModeToggle /> */}

          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link
              href="/create-post"
              className={buttonVariants({ variant: "default" })}
            >
              Create post
            </Link>
          </li> 
          <DropMenu />
        </ul>

        <div className="ml-[20px] flex items-center justify-center space-x-2">
          <Link className="md:hidden" href=""><DropMenu/></Link>
          <ModeToggle />
          {/* <FaGithub/> */}

          {/* <Link href="/" target="_blank" className="text-xl rounded-lg md:hidden ">< FaGithub/></Link> */}
          {/* this is for resposive side bar menu comming from shadcn */}
          <Sheet>
            <SheetTrigger>
              <RxHamburgerMenu className="size-7 md:hidden " />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-3xl underline">MENU</SheetTitle>
                <nav>
                  <ul className="flex  flex-col p-2">
                    <li>
                      <Link
                        href="/blog"
                        className="text-2xl font-light mt-[20px] "
                      >
                        Blog
                      </Link>
                    </li>
                    {/* <li >
              <Link href="/login" className="text-2xl font-light mt-[20px]  " >Login</Link>
            </li> */}
                    {/* <li>
              <Link href="/register" className="text-2xl font-light mt-[20px]  ">Register</Link>
            </li> */}

                    <li>
                      <Link
                        href="/create-post"
                        className="text-2xl font-light mt-[20px]  "
                      >
                        Create-post
                      </Link>
                    </li>
                  </ul>
                </nav>
                {/* <Signout /> */}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    );
  }
};

export default NavBar;
