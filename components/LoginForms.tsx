'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions-user';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <>
      <form
        action={formAction}
        className="mx-auto w-[calc(100%-2rem)] max-w-md space-y-5 rounded-lg border-2 border-gray-800 bg-white p-6 shadow-md sm:p-8"
      >
        <input type="hidden" name="redirectTo" value="/meetings/new" />
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Sign In
        </h1>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800/20"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            minLength={6}
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800/20"
            placeholder="••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="w-full rounded-md bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
        {errorMessage?.message && (
          <p role="alert">
            {errorMessage.message}
          </p>
        )}
      </form>

    </>
  );
}