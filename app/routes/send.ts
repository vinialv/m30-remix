import { Resend } from "resend";
import { ActionFunctionArgs, json } from "@remix-run/node";

import { EmailForm } from "@/components/EmailForm";

const resend = new Resend(process.env.RESEND_API_KEY);
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const registro = JSON.parse(formData.get("registro") as string);
  const files = Array.from(formData.entries())
    .filter(([name, value]) => value instanceof File)
    .map(([name, value]) => ({ name, file: value as File }));

  const attachments = await Promise.all(
    files.map(async ({ name, file }) => ({
      content: Buffer.from(await file.arrayBuffer()),
      filename: file.name,
      type: file.type,
    }))
  );
  const { data, error } = await resend.emails.send({
    from: "vinicius@viniciusalves.dev",
    to: ["muriloalves@m30.arq.br"],
    subject: "Novo formulário enviado",
    react: EmailForm({ registro }),
    attachments,
  });
  if (error) {
    return json({ error }, 400);
  }
  return json(data, 200);
};
