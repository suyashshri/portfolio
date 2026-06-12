import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PORT = Number(process.env.PORT ?? 3001);
const DATA_DIR = path.join(import.meta.dir, "..", "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

async function readMessages(): Promise<ContactMessage[]> {
  const file = Bun.file(MESSAGES_FILE);
  if (!(await file.exists())) return [];
  try {
    return (await file.json()) as ContactMessage[];
  } catch {
    return [];
  }
}

async function saveMessage(msg: ContactMessage) {
  await mkdir(DATA_DIR, { recursive: true });
  const messages = await readMessages();
  messages.push(msg);
  await Bun.write(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

const app = new Elysia()
  .use(cors({ origin: true }))
  .get("/api/health", () => ({ status: "ok", uptime: process.uptime() }))
  .post(
    "/api/contact",
    async ({ body, set }) => {
      const msg: ContactMessage = {
        id: crypto.randomUUID(),
        name: body.name.trim(),
        email: body.email.trim(),
        subject: body.subject?.trim() || "(no subject)",
        message: body.message.trim(),
        receivedAt: new Date().toISOString(),
      };

      await saveMessage(msg);
      console.log(`📬 New message from ${msg.name} <${msg.email}>: ${msg.subject}`);

      // To forward messages to your inbox, plug in an email provider here
      // (e.g. Resend or Nodemailer) using the saved `msg` payload.

      set.status = 201;
      return { ok: true, id: msg.id };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 2, maxLength: 100 }),
        email: t.String({ format: "email", maxLength: 200 }),
        subject: t.Optional(t.String({ maxLength: 200 })),
        message: t.String({ minLength: 10, maxLength: 5000 }),
      }),
    },
  )
  .listen(PORT);

console.log(`🦊 Portfolio API running at http://localhost:${app.server?.port}`);
