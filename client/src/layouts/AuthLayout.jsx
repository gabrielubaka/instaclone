import { Outlet } from "react-router";
import home from "../assets/home.png"

export default function AuthLayout() {
  return (
    <section className="container mx-auto grid grid-cols-12 items-center justify-center min-h-screen">
        {/* the first div is for the image*/}
      <div className="hidden lg:block col-span-6 mx-auto">
        <img src={home} alt="home" />
      </div>
      {/* the second div is for login and register page */}
      <div className="col-span-12 lg:col-span-6 mx-auto">
        <Outlet/>
      </div>
    </section>
  );
}
