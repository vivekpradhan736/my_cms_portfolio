import SignupForm from "@/components/SignupForm"
import { Suspense } from "react"

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string }
}) {


  return (
    <div className="h-screen w-72 flex justify-center flex-col m-auto items-center">
      <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
          </Suspense>
    </div>
  )
}