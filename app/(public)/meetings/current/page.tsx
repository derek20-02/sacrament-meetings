import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentMeetingId } from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "Current Meeting | Sacrament Meeting Planner",
  description: "View sacrament meeting details, speakers, and hymns.",
  openGraph: {
    title: "Current Meeting | Sacrament Meeting Planner",
    description: "View sacrament meeting details, speakers, and hymns.",
    images: ["/sacrament.webp"],
  },
};


export default async function Page() {
  const meetingId = await getCurrentMeetingId();

  if (meetingId === null) {
    notFound();
  }

  redirect(`/meetings/${meetingId}`);
}