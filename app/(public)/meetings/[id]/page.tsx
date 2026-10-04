import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const meeting = await getMeetingById(id);

  if (!meeting) {
    return { title: "Meeting Not Found" };
  }

  return {
    title: `Meeting ${meeting.date}`,
    description: `Sacrament meeting program for ${meeting.date}`,
  };
}

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