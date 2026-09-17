import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}