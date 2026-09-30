"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <ul className="flex flex-col items-center gap-2 text-center sm:gap-3 md:flex-row md:gap-6">
            <li>
                <Link
                    href="/"
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-yellow-200 md:text-lg ${pathname === "/" ? "text-yellow-300" : ""
                        }`}
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="/meetings"
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-yellow-200 md:text-lg ${pathname === "/meetings" ? "text-yellow-300" : ""
                        }`}
                >
                    Meetings
                </Link>
            </li>
            <li>
                <Link
                    href="/meetings/new"
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-yellow-200 md:text-lg ${pathname === "/meetings/new" ? "text-yellow-300" : ""
                        }`}
                >
                    New Meeting
                </Link>
            </li>
        </ul>
    );
}