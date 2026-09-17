import { getAllMeetings } from "@/lib/meetings-db";
import MeetingCard from "./MeetingCard";

export default function AllMeetings() {
  const meetings = getAllMeetings();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}