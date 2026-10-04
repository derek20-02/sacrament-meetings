import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const email = await rl.question("Correo del usuario: ");
const password = await rl.question("Nueva contraseña: ");
rl.close();

const hash = await bcrypt.hash(password, 10);
const sql = neon(process.env.DATABASE_URL);

const updated = await sql`
  UPDATE users
  SET password_hash = ${hash}
  WHERE email = ${email}
  RETURNING id
`;

if (updated.length === 0) {
  throw new Error(`No existe un usuario con el correo ${email}`);
}

console.log("Contraseña actualizada.");