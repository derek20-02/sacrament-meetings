import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";


export default function MeetingCard({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow m-4 border-2 border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-900">
        Meeting: {meeting.meetingType}
      </h2>
      <div className="text-gray-900">
        <p >{meeting.date}</p>
        <p >Presiding: {meeting.presiding}</p>
        <p >Conducting: {meeting.conducting}</p>
      </div>
    </Link>
  );
}