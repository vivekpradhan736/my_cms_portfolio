import SignupForm from "@/components/SignupForm"

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string }
}) {


  return (
    <div className="h-screen w-72 flex justify-center flex-col m-auto items-center">
      <SignupForm/>
    </div>
  )
}