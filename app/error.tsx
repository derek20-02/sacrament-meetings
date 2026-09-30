'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-16 text-center"
    >
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Something went wrong
      </h1>
      <p className="text-gray-700">
        We couldn&apos;t complete that action. Please try again, or go back to
        the meetings list.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
        >
          Try again
        </button>
        <Link
          href="/meetings"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          Back to meetings
        </Link>
      </div>
    </div>
  );
}