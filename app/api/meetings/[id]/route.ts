// app/api/meetings/[id]/route.ts
import { getMeetingById } from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id)) {
    return Response.json(
      { error: 'Invalid id parameter' },
      { status: 400 }
    );
  }

  const meeting: SacramentMeeting | null = getMeetingById(id);

  if (!meeting) {
    return Response.json(
      { error: 'Meeting not found' },
      { status: 404 }
    );
  }

  return Response.json(meeting);
}