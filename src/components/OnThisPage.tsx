"use client"
import React, { useEffect, useState } from 'react'

interface LinkType{
  id:string
  text:string
}
const OnThisPage = ({htmlContent}:{htmlContent:string}) => {
  const [links,setLinks]=useState<null|LinkType[]>(null)

  useEffect(()=>{
    const temp=document.createElement("div")
    temp.innerHTML=htmlContent
    
    const headings=temp.querySelectorAll("h2,h3")

    const generatedLinks:LinkType[]=[];
     headings.forEach((heading,index)=>{
      const id=heading.id || `heading-${index}`
      heading.id=id

      generatedLinks.push({
        id:id,
        text:(heading as HTMLElement).innerText
       })

     })
     setLinks(generatedLinks)
     

  },[htmlContent])  

  return (
   <div className='hidden md:block'>
    <div className='sticky top-10 right-0 w-[20vw] flex flex-col items-center justify-center'>
      <h2 >on this page</h2>
      <ul className='not-prose'>
        {links && links.map((link)=>{
         return  <li key={link.id} className='pt-1'>
            <a href={`#${link.id}`}>{link.text}</a>
          </li>
        })}
      </ul>
    </div>
   </div>
  )
}

export default OnThisPage