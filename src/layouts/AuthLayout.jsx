import { Outlet } from "react-router-dom";


export default function AuthLayout() {
  return (
    <>
    <main className="container mx-auto mt-2 md:mt-15 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5 ">
            <Outlet />
        </div>
    </main>
    </>
  )
}
