import Logo from "@components/logo";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { PiBagSimpleBold } from "react-icons/pi";
import Input from "../components/input";
export default function Navbar() {
  const [username, setUsername] = useState("");
  return (
    <header className="bg-primary h-auto lg:h-12 w-full px-6 lg:px-0 fixed py-4 lg:py-2 flex items-center">
      <div className="container mx-auto ">
        <div className="flex items-center">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="hidden flex-[3.5] lg:flex">
            <Input
              label="Username"
              placeholder="Search"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={IoSearchSharp}
            />
          </div>
          <div className="flex-1 flex justify-end lg:justify-start gap-6">
            <div className="flex gap-2 text-white items-center">
              <PiBagSimpleBold size={22} />
              <p className="leading-4">117.00₺</p>
            </div>
            <div className="flex gap-2 text-white items-center">
              <FaRegUser size={16} />
              <p className="leading-4">Ahmet</p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex lg:hidden">
          <Input
            label="Username"
            placeholder="Search"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={IoSearchSharp}
          />
        </div>
      </div>
    </header>
  );
}
