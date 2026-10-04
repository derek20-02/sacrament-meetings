import Link from 'next/link';
import NavLinks from "./NavLinks";
import SingOut from "./SingOut";
import { auth } from "@/auth";

export default async function Header() {
  // Fetch the session on the server side  
  const session = await auth();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-gray-800 py-3 text-white shadow-md sm:py-4">
  <nav className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 sm:px-6 md:flex-row md:justify-between md:gap-6 lg:px-8">
    <div id="header-title" className="text-center md:text-left">
      <Link href="/" className="text-xl font-bold sm:text-2xl">
        Random Ward
      </Link>
      <div className="text-xs text-gray-400 sm:text-sm">{formattedDate}</div>
    </div>
    <ul className="flex flex-col items-center gap-2 text-center sm:gap-3 md:flex-row md:gap-6">
      <NavLinks />
    </ul>
    {session?.user && <SingOut/>}
  </nav>
</header>
  );
}