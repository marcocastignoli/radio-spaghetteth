import { sql } from "@vercel/postgres";
import { verifyMessage } from "ethers";

export async function GET() {
  const { rows } =
    await sql`SELECT * FROM events e INNER JOIN authors a ON a.id = e.author;`;

  return Response.json(rows);
}

export async function POST(request: Request) {
  const req = await request.json();

  const body = JSON.stringify({
    from: req.from,
    to: req.to,
    title: req.title,
  });
  const from = new Date(req.from).toISOString();
  const to = new Date(req.to).toISOString();
  const title = req.title;
  const signature = req.signature;

  const address = await verifyMessage(body, signature);

  const { rows } = await sql`SELECT id FROM authors WHERE address = ${address}`;

  const authorId = rows[0].id;

  await sql`INSERT INTO events ("from", "to", title, author) VALUES (${from}, ${to}, ${title}, ${authorId})`;

  return Response.json({
    success: true,
  });
}
