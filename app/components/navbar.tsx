import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar(){
    return (
        <nav className="w-full relative flex mx-auto max-w-2xl items-center justify-between px-4 py-5">
          <Link href="/" className="font-bold text-3xl">
            Latest<span className="text-primary">Blog</span>
          </Link>
    
          <ModeToggle />
        </nav>
      );
}