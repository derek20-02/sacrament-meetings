import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Meeting not found
      </h1>
      <p className="text-gray-700">
        The page or meeting you&apos;re looking for doesn&apos;t exist or may
        have been deleted.
      </p>
      <Link
        href="/meetings"
        className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
      >
        Back to meetings
      </Link>
    </div>
  );
}