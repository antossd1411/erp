import useSession from "@/hooks/useSession";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const { url } = request;
  const session = await useSession();
  if (session.user) {
    session.destroy();
  }
  return Response.redirect(new URL("/", url));
}