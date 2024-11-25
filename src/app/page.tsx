"use client";

import React from "react";
import Typewriter from "typewriter-effect";
import { useSession } from "next-auth/react";
const Home = () => {
  const { data: session } = useSession();
  
  if(!session){
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 md:px-24 py-12 flex-wrap ">
      <h1 className=" text-3xl md:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent  font-bold mb-[10vh] ">linkscribe</h1>
      <h1 className="text-2xl md:text-4xl text-center ">
        <Typewriter
          options={{
            strings: ["Here you can create blog"],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
    </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 md:px-24 py-12 flex-wrap ">
      <h1 className="md:text-6xl text-4xl mb-[5vh] capitalize">Welcome, {session?.user?.name}</h1>
      <h1 className=" text-3xl md:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent  font-bold mb-[10vh]  animate-bounce">linkscribe</h1>
      <h1 className="text-2xl md:text-4xl text-center ">
        <Typewriter
          options={{
            strings: ["Here you can create blog"],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
    </div>
  );
};

export default Home;
