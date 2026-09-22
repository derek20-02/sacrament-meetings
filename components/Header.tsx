import Link from 'next/link';
import NavLinks from "./NavLinks";

export default function Header() {
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
     <header className="bg-gray-800  text-white py-4 shadow-md">
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
      <div id="header-title" className="text-2xl font-bold">
        <Link href="/">Random Ward</Link>
        <div className="text-sm text-gray-400">{formattedDate}</div>
        </div>
      <div>
        <ul className="flex gap-6">
        <NavLinks/>
        </ul>
        </div>
      </nav>
    </header>
  );
}