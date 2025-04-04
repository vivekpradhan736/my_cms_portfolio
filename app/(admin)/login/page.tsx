import LoginForm from "@/components/LoginForm"
import { Suspense } from "react"

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {


  return (
    <div className="h-screen w-72 flex justify-center flex-col m-auto items-center">
      <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
    </div>
  )
}