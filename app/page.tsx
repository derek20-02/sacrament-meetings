import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-6 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-center">
          Sacrament Meeting Planner
        </h1>
        <picture className="relative block aspect-[2/1] w-full max-w-5xl overflow-hidden rounded-lg">

          <source media="(max-width: 600px)" srcSet="/sacrament.webp" />
          <source media="(max-width: 1000px)" srcSet="/sacrament.webp" />
          <Image
            src="/sacrament.webp"
            alt="Sacrament Meeting"
            fill
            sizes="(max-width: 600px) 100%, (max-width: 1000px) 90%, 1200px"
            className="object-cover"
            priority
          />

        </picture>
        <p className="text-lg text-center text-gray-600">
          An app for organizing sacramental meetings—you can view
          meeting details, speakers, hymns, and much more.
        </p>
      </main>
    </div>
  );
}
