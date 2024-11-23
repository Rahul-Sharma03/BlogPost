"use client";
import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router';


import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  const router=useRouter()

  const [authState, setAuthState] = useState({
    title: "",
    slug: "",
  });

  const submitdata=async (e:React.FormEvent)=>{
    e.preventDefault()
    try {
      console.log(authState);
  
      const res = await axios.post("/api/auth/blog", authState);
  
      const response = res.data;
      console.log(response);
  
      if (response.status === 200) { // Use strict equality
        console.log("Blog created successfully");
        router.push("/blog"); // Navigate to the blog page
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while creating the blog:", error);
    }
  }

 

  return (
    <div className=" flex items-center justify-center mt-[20vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>Deploy your new Blog in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitdata}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Title of your Blog"
                  required
                  onChange={(e) =>
                    setAuthState({ ...authState, title: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Slug</Label>
                <Input
                  type="url"
                  id="slug"
                  placeholder="enter URL of title from google"
                  required
                  onChange={(e) =>
                    setAuthState({ ...authState, slug: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className={buttonVariants({ variant: "default" })} >create</button>
                <button  className={buttonVariants({ variant: "default" })} onClick={()=>router.push("/")}>cancel</button>

              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
