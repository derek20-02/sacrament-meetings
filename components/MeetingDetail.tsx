
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import type { SacramentMeeting, Hymn } from "@/lib/types";
import { auth } from "@/auth";

function HymnDetails({ label, hymn }: { label: string; hymn: Hymn }) {
  return (
    <p>
      <strong>{label}:</strong> #{hymn.number} - {hymn.title}
    </p>
  );
}

export default async function MeetingDetail({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {

  //Validate the session to check if the user is logged in
  const session = await auth();

  return (
    <>
    <article className="mx-auto my-4 w-[calc(100%-2rem)] max-w-3xl space-y-4 break-words rounded-lg border-2 border-gray-800 p-4 sm:my-6 sm:space-y-6 sm:p-6 lg:p-8">
      <header>
        <p className="text-sm uppercase tracking-wide text-gray-500">
          {meeting.meetingType} meeting
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Sacrament Meeting - {meeting.date}
        </h1>
        <p className="text-gray-900">Presiding: {meeting.presiding}</p>
        <p className="text-gray-900">Conducting: {meeting.conducting}</p>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
          <ul className="list-disc pl-5 text-gray-900">
            {meeting.announcements.map((announcement, index) => (
              <li key={`${announcement}-${index}`}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="text-gray-900">
        <h2 className="text-xl font-semibold ">Opening</h2>
       
        <HymnDetails label="Opening hymn" hymn={meeting.openingHymn} />
        <p className="">Opening prayer: {meeting.openingPrayer}</p>
      </section>

      <section className="text-gray-900">
        <h2 className="text-xl font-semibold ">Ward Business</h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-900">
            {meeting.wardBusiness.map((item, index) => (
              <li key={`${item.description}-${index}`}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No ward business.</p>
        )}
        <p>Stake business: {meeting.stakeBusiness ? "Yes" : "No"}</p>
      </section>

      <section className="text-gray-900">
        <h2 className="text-xl font-semibold">Sacrament</h2>
     
        <HymnDetails label="Sacrament hymn" hymn={meeting.sacramentHymn} />
      </section>

      <section className="text-gray-900">
        <h2 className="text-xl font-semibold">Speakers and Music</h2>
   
        {meeting.speakers.length > 0 ? (
          <ul className="space-y-2">
            {meeting.speakers.map((item, index) => (
              <li key={`${item.type}-${item.name}-${index}`}>
                <strong>
                  {item.type === "musical-number"
                    ? "Musical number"
                    : "Speaker"}
                  :
                </strong>{" "}
                {item.name} - {item.topic}
              </li>
            ))}
          </ul>
        ) : (
          <p>No speakers or musical numbers listed.</p>
        )}
      </section>

      <section className="text-gray-900">
        <h2 className="text-xl font-semibold">Closing</h2>
        <HymnDetails label="Closing hymn" hymn={meeting.closingHymn} />
        <p>Closing prayer: {meeting.closingPrayer}</p>
      </section>

      {session?.user && (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Edit
          </Link>
          <DeleteButton id={meeting.id} date={meeting.date} />
        </div>
      )}
  
    </article>
    </>
  );
}