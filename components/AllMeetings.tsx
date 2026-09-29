import MeetingCard from "./MeetingCard";
import { Pagination } from "./Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
export async function AllMeetings({
  query = "",
  page = 1,
}: {
  query?: string;
  page?: number;
}) {

    const [visibleMeetings, totalPages] = await Promise.all([
    getMeetings(query, page),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
     <Pagination totalPages={totalPages} />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {visibleMeetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
    </>
  );
}