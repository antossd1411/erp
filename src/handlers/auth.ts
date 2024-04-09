'use server';

import { validateEmail } from "@/utils/email";
import { handleError } from "@/utils/error";
import { connectionOptions } from "@/db/index";
import { createConnection } from "mariadb";
import { dbLogIn } from "@/db/auth";
import { redirect } from "next/navigation";
import People from "@/types/People/people";
import useSession from "@/hooks/useSession";

export async function logIn(prevState, formData: FormData) {
  let error: string = "";
  
  let session = await useSession();

  if (session.user) {
    redirect("/dashboard");
  }

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  
  try {
    if (!validateEmail(email) || password?.trim().length == 0) {
      error = "Invalid data was submitted.";
    }

    if (error.length > 0) {
      throw new Error(error, {});
    }
 
    const conn = await createConnection(connectionOptions);

    const results = await conn.query(dbLogIn(email, password)) as People[];

    await conn.end();

    if (results.length == 0) {
      throw new Error("Invalid credentials.");
    }

    session.user = results.shift() as People;

    await session.save();

  } catch (err) {
    return handleError(err);
  }

  redirect("/dashboard");
}