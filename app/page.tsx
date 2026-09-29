import Image from "next/image";

export default function Home() {
  return (
     <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-4 py-6 sm:gap-8 sm:px-8 sm:py-10 lg:px-0">
        <h1 className="text-center text-2xl font-bold text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl">
          Sacrament Meeting Planner
        </h1>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-md sm:aspect-[2/1]">
          <Image
            src="/sacrament.webp"
            alt="Sacrament Meeting"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <p className="max-w-prose text-center text-base leading-relaxed text-gray-800 sm:text-lg">
          An app for organizing sacramental meetings—you can view meeting
          details, speakers, hymns, and much more.
        </p>
      </main>
    </div>
  );
}
