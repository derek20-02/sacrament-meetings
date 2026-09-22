import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    notFound();
  }

   const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }
  
  return <MeetingDetail meeting={meeting} />;
}