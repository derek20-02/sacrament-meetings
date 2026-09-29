import { redirect, notFound } from "next/navigation";
import { getCurrentMeetingId } from "@/lib/meetings-db";

export default async function Page() {
  const meetingId = await getCurrentMeetingId();

  if (meetingId === null) {
    notFound();
  }

  redirect(`/meetings/${meetingId}`);
}