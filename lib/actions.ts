'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';
import { requireAdmin } from './auth-guard';
import { addMeeting, 
        updateMeeting as updateMeetingDb,
        deleteMeeting as deleteMeetingDb} from './meetings-db';

const HymnSchema = z.object({
  number: z.coerce
    .number({ message: 'Hymn number must be a number.' })
    .int()
    .positive('Hymn number is required.'),
  title: z.string().trim().min(1, 'Hymn title is required.'),
});

const SpeakerSchema = z.object({
  name: z.string().trim().min(1, 'Speaker name is required.'),
  topic: z.string().trim(),
  type: z.enum(['speaker', 'musical-number']),
});

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'A valid date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    message: 'Please select a meeting type.',
  }),
  presiding: z.string().trim().min(1, 'Presiding is required.'),
  conducting: z.string().trim().min(1, 'Conducting is required.'),
  announcements: z.array(z.string()),
  openingHymn: HymnSchema,
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  wardBusiness: z.array(z.object({ description: z.string() })),
  stakeBusiness: z.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerSchema),
  closingHymn: HymnSchema,
  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
});

export type State = {
  message?: string | null;
  errors?: Record<string, string[] | undefined>;
};

// Convierte un textarea (un elemento por línea) en array
function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

// Convierte el FormData en el objeto que espera el esquema
function parseMeetingFormData(formData: FormData) {
  const names = formData.getAll('speakerName');
  const topics = formData.getAll('speakerTopic');
  const types = formData.getAll('speakerType');

  const speakers = names
    .map((name, i) => ({
      name: String(name),
      topic: String(topics[i] ?? ''),
      type: String(types[i] ?? 'speaker'),
    }))
    .filter((s) => s.name.trim() !== '' || s.topic.trim() !== '');

  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: linesToArray(formData.get('announcements')),
    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: linesToArray(formData.get('wardBusiness')).map(
      (description) => ({ description })
    ),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },
    speakers,
    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },
    closingPrayer: formData.get('closingPrayer'),
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireAdmin();

  const validated = MeetingFormSchema.safeParse(parseMeetingFormData(formData));

  if (!validated.success) {
    return {
      message: 'Please fix the errors below.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(validated.data);
  } catch (error) {
    console.error('createMeeting failed:', error);
    throw new Error('Failed to create the meeting. Please try again.');
  }

 
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {

  await requireAdmin();
  
  const validated = MeetingFormSchema.safeParse(parseMeetingFormData(formData));

  if (!validated.success) {
    return {
      message: 'Please fix the errors below.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  let updated;
  try {
    updated = await updateMeetingDb(id, validated.data);
  } catch (error) {
    console.error('updateMeeting failed:', error);
    throw new Error('Failed to update the meeting. Please try again.');
  }

  if (!updated) notFound(); 

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  await requireAdmin();
  try {
    await deleteMeetingDb(id);
  } catch (error) {
    console.error('deleteMeeting failed:', error);
    throw new Error('Failed to delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}