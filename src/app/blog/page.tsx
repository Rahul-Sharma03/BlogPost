"use client";
import React, { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
// import { MdDelete } from "react-icons/md";
// import axios from "axios";
interface BlogType {
  title: string;
  slug: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/auth/blog");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: BlogType[] = await response.json();
        setBlogs(result);
        console.log("Blogs fetched:", result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs(); // Call the fetch function
  }, []);


  return (
    <div className="main-container w-full h-auto p-2">
        <h1 className="md:text-4xl text-3xl font-bold text-center">Our Blogs</h1>

      <div className="w-full flex flex-wrap justify-center gap-6 p-4">
  {blogs.length > 0 ? (
    blogs.map((blog, index) => (
      <div
        key={index} // Prefer unique ID over index for keys
        className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] h-auto border rounded-xl p-4 flex flex-col justify-between shadow-md overflow-hidden"
      >
        <div className="relative">
          {/* <h1 className="">{index+1}</h1> */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-noraml mb-3">
            {blog.title}
          </h2>
          {/* <MdDelete className="absolute top-2 right-1 text-lg cursor-pointer"  /> */}
          {/* Add description if required */}
          <p className="text-sm text-gray-600 mb-3 ">{blog.slug}</p>
        </div>
        <Link
          href={blog.slug} target="_blank"
          className={buttonVariants({ variant: "default" })}
        >
          Read more
        </Link>
      </div>
    ))
  ) : (
    <p className="w-full text-center text-gray-500 text-sm md:text-base">
      No blogs available. Click Refresh to load blogs.
    </p>
  )}
</div>

    </div>
  );
};

export default Blog;
