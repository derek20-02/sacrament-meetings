"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <ul className="flex flex-col space-y-2 md:space-x-4 text-align-center md:flex-row md:space-y-0 items-center margin-top-2">
            <li>
                <Link href="/" className={pathname === "/" ? "text-yellow-300" : ""}>
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="/meetings"
                    className={pathname === "/meetings" ? "text-yellow-300" : ""}>
                    Meetings
                </Link>
            </li>
        </ul>
    );
}