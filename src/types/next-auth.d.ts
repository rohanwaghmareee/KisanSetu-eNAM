import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      studentId?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    studentId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    studentId?: string
  }
}