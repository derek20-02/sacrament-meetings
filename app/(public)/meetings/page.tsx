import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import {AllMeetings} from "@/components/AllMeetings";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 mt-4 p-4">
        <h1 className="text-4xl font-bold text-center text-gray-700">Meetings</h1>
        <p className="text-lg text-center text-gray-700">
          View all upcoming sacrament meetings and their details.
        </p>
        <MeetingSearch />
       <AllMeetings  query={query} page={currentPage} />
      </section>
    </>
  );
}