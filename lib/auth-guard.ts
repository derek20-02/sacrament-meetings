import { auth } from '@/auth';
import { getUserByEmail } from '@/lib/user-db';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect('/login');
  }

  const user = await getUserByEmail(email);

  if (!user || user.role !== 'ADMIN') {  
    redirect('/');
  }
}
