import SessionData, { sessionOptions } from "@/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default async function useSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}