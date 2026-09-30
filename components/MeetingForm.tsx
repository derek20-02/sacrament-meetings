'use client';

import { startTransition, useActionState } from 'react';
import Link from 'next/link';
import type { State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type Props = {
  action: (prevState: State, formData: FormData) => Promise<State>;
  initialData?: SacramentMeeting;
  submitLabel: string;
};

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800/20 aria-[invalid=true]:border-red-600 sm:text-base';
const labelClass = 'mb-1 block text-sm font-medium text-gray-700';
const SPEAKER_ROWS = 4;

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-700">
      {errors?.map((e) => <p key={e}>{e}</p>)}
    </div>
  );
}

function TextField(props: {
  name: string;
  label: string;
  errors?: string[];
  defaultValue?: string;
  type?: string;
}) {
  const { name, label, errors, defaultValue, type = 'text' } = props;
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        aria-describedby={errorId}
        aria-invalid={!!errors?.length}
        className={inputClass}
      />
      <FieldError id={errorId} errors={errors} />
    </div>
  );
}

function HymnField(props: {
  prefix: 'opening' | 'sacrament' | 'closing';
  label: string;
  errors?: string[];
  defaultValue?: { number: number; title: string };
}) {
  const { prefix, label, errors, defaultValue } = props;
  const errorId = `${prefix}Hymn-error`;
  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[8rem_1fr]">
        <div>
          <label htmlFor={`${prefix}HymnNumber`} className="sr-only">
            {label} number
          </label>
          <input
            id={`${prefix}HymnNumber`}
            name={`${prefix}HymnNumber`}
            type="number"
            min={1}
            placeholder="No."
            defaultValue={defaultValue?.number}
            aria-describedby={errorId}
            aria-invalid={!!errors?.length}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${prefix}HymnTitle`} className="sr-only">
            {label} title
          </label>
          <input
            id={`${prefix}HymnTitle`}
            name={`${prefix}HymnTitle`}
            placeholder="Title"
            defaultValue={defaultValue?.title}
            aria-describedby={errorId}
            aria-invalid={!!errors?.length}
            className={inputClass}
          />
        </div>
      </div>
      <FieldError id={errorId} errors={errors} />
    </fieldset>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {children}
    </section>
  );
}

export default function MeetingForm({ action, initialData, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState<State, FormData>(action, {
    message: null,
    errors: {},
  });
  const errors = state.errors ?? {};
  const d = initialData;
  const speakerRows = Math.max(SPEAKER_ROWS, d?.speakers.length ?? 0);

  return (
    <form
      // cuando la validación falla (el reset automático solo ocurre con action={...})
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-10"
    >
      <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">
        {d ? 'Edit meeting' : 'New meeting'}
      </h1>

      {state.message && (
        <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {state.message}
        </div>
      )}

      <Section title="General">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField name="date" label="Date" type="date" defaultValue={d?.date} errors={errors.date} />
          <div>
            <label htmlFor="meetingType" className={labelClass}>Meeting type</label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={d?.meetingType ?? ''}
              aria-describedby="meetingType-error"
              aria-invalid={!!errors.meetingType?.length}
              className={inputClass}
            >
              <option value="" disabled>Select a type</option>
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>
            <FieldError id="meetingType-error" errors={errors.meetingType} />
          </div>
          <TextField name="presiding" label="Presiding" defaultValue={d?.presiding} errors={errors.presiding} />
          <TextField name="conducting" label="Conducting" defaultValue={d?.conducting} errors={errors.conducting} />
        </div>
        <div>
          <label htmlFor="announcements" className={labelClass}>Announcements (one per line)</label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={d?.announcements?.join('\n')}
            aria-describedby="announcements-error"
            className={inputClass}
          />
          <FieldError id="announcements-error" errors={errors.announcements} />
        </div>
      </Section>

      <Section title="Opening">
        <HymnField prefix="opening" label="Opening hymn" defaultValue={d?.openingHymn} errors={errors.openingHymn} />
        <TextField name="openingPrayer" label="Opening prayer" defaultValue={d?.openingPrayer} errors={errors.openingPrayer} />
      </Section>

      <Section title="Business">
        <div>
          <label htmlFor="wardBusiness" className={labelClass}>Ward business (one item per line)</label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={d?.wardBusiness.map((w) => w.description).join('\n')}
            aria-describedby="wardBusiness-error"
            className={inputClass}
          />
          <FieldError id="wardBusiness-error" errors={errors.wardBusiness} />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="stakeBusiness"
            defaultChecked={d?.stakeBusiness}
            className="h-4 w-4 rounded border-gray-300"
          />
          Includes stake business
        </label>
      </Section>

      <Section title="Sacrament & speakers">
        <HymnField prefix="sacrament" label="Sacrament hymn" defaultValue={d?.sacramentHymn} errors={errors.sacramentHymn} />
        <div className="space-y-4">
          {Array.from({ length: speakerRows }).map((_, i) => {
            const s = d?.speakers[i];
            return (
              <fieldset key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <legend className="sr-only">Speaker {i + 1}</legend>
                <div>
                  <label htmlFor={`speakerName-${i}`} className={labelClass}>Name {i + 1}</label>
                  <input id={`speakerName-${i}`} name="speakerName" defaultValue={s?.name} aria-describedby="speakers-error" className={inputClass} />
                </div>
                <div>
                  <label htmlFor={`speakerTopic-${i}`} className={labelClass}>Topic</label>
                  <input id={`speakerTopic-${i}`} name="speakerTopic" defaultValue={s?.topic} className={inputClass} />
                </div>
                <div>
                  <label htmlFor={`speakerType-${i}`} className={labelClass}>Type</label>
                  <select id={`speakerType-${i}`} name="speakerType" defaultValue={s?.type ?? 'speaker'} className={inputClass}>
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical number</option>
                  </select>
                </div>
              </fieldset>
            );
          })}
          <FieldError id="speakers-error" errors={errors.speakers} />
        </div>
      </Section>

      <Section title="Closing">
        <HymnField prefix="closing" label="Closing hymn" defaultValue={d?.closingHymn} errors={errors.closingHymn} />
        <TextField name="closingPrayer" label="Closing prayer" defaultValue={d?.closingPrayer} errors={errors.closingPrayer} />
      </Section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/meetings"
          className="rounded-lg border border-gray-300 px-4 py-2 text-center text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}