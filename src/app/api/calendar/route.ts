import { sql } from "@vercel/postgres";

export async function GET() {
  const { rows } =
    await sql`SELECT * FROM events e INNER JOIN authors a ON a.id = e.author;`;

  return Response.json({
    events: rows,
  });
}
