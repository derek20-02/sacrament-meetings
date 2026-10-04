import { neon } from '@neondatabase/serverless';
import type { User } from './types';

const sql = neon(process.env.DATABASE_URL!);

export async function getUserByEmail(email: string): Promise<User | null>
{
  const rows = await sql`
    SELECT id, 
    email, 
    name, 
    password_hash AS "passwordHash", 
    role
    FROM users
    WHERE email = ${email}
  `;

  if (rows.length > 0) {
   
    return rows[0] as User;
  }

  return null;
}

//ACTION FOR THE FUTURE: Create a new user in the database
export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const rows = await sql`
    INSERT INTO users (email, name, passwordHash, role)
    VALUES (${user.email}, ${user.name}, ${user.passwordHash}, ${user.role})
    RETURNING id, email, name, passwordHash, role
  `;
  return rows[0] as User;
}

