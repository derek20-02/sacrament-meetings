'use client';

import { useFormStatus } from 'react-dom';
import { deleteMeeting } from '@/lib/actions';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={label}
      className="rounded-md bg-red-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default function DeleteButton({
  id,
  date,
}: {
  id: number;
  date: string;
}) {
  return (
    <form
      action={deleteMeeting.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm('Delete this meeting? This cannot be undone.')) {
          e.preventDefault();
        }
      }}
    >
      <SubmitButton label={`Delete meeting ${date}`} />
    </form>
  );
}