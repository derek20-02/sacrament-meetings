'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export type State = {
  message?: string | null;
  errors?: Record<string, string[] | undefined>;
};

export async function authenticate(
  prevState: State | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid email or password.',
          };
        default:
          return {
            message: 'Something went wrong.',
          };
      }
    }
    throw error; 
  }
}
