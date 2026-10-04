import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import DeleteButton from "@/components/DeleteButton";
import { auth } from "@/auth";

export default async function MeetingCard({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {

  //Validate the session to check if the user is logged in
  const session = await auth();

  return (
    <div className="m-4 flex flex-col justify-between rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <Link
        href={`/meetings/${meeting.id}`}
        className="p-2 m-4"
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

      {session?.user && (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            aria-label={`Edit meeting ${meeting.date}`}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Edit
          </Link>
          <DeleteButton id={meeting.id} date={meeting.date} />
        </div>
      )}
    </div>
  );
}