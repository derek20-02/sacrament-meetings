import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import { requireAdmin } from '@/lib/auth-guard';
export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Ensure the user is an admin before proceeding
  await requireAdmin();
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) notFound();

  const meeting = await getMeetingById(meetingId);
  if (!meeting) notFound();

  return (
    <MeetingForm
      action={updateMeeting.bind(null, meetingId)}
      initialData={meeting}
      submitLabel="Save changes"
    />
  );
}