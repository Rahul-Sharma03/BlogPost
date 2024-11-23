
interface BlogType{
  title:string
  content:string
  slug:string
}

const blogData:BlogType[]= [
  {
    title: "How to Build a Food Delivery App with Next.js",
    content: "Learn the basics of building a food delivery app using Next.js and Tailwind CSS.",
    slug: "food-delivery-app",
    // image: "https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Understanding NextAuth Authentication",
    content: "A guide on setting up GitHub authentication in your Next.js project with NextAuth.",
    slug: "nextauth-guide",
    // image:"https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Responsive Design with Tailwind CSS",
    content: "Tips and tricks for creating responsive UIs quickly with Tailwind CSS.",
    slug: "responsive-tailwind",
    // image: "https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];
export default blogData