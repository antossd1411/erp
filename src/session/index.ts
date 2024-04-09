import People from "@/types/People/people";
import { SessionOptions } from "iron-session";

export default interface SessionData {
  user: People;
}

const {
  SESSION_PASSWORD,
} = process.env;

const cookieOptions = {
  secure: process.env.NODE_ENV == "production",
}

export const sessionOptions: SessionOptions = {
  password: SESSION_PASSWORD ?? "", // Check this
  cookieName: "session-data",
  ttl: 60 ** 2 * 24, // A day
  cookieOptions
};