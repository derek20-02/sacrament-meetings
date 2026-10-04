import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';
import { requireAdmin } from '@/lib/auth-guard';

export default async function NewMeetingPage() {
  await requireAdmin();

  return <MeetingForm action={createMeeting} submitLabel="Create meeting" />;
}