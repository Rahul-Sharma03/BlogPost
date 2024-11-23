import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connect} from "@/database/mongo.config"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import { User } from "@/model/User";
export const authOptions:AuthOptions={
  pages:{
    signIn:"/login"
  },
  providers:[
    CredentialsProvider({
        name:"next auth",
        credentials:{
            email:{label:"email",type:"email", placeholder:"enter your email"},
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          connect()
          const user=await User.findOne({email:credentials?.email})
    
          if (user) {
            // Any object returned will be saved in user property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
}