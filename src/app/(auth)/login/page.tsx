"use client";

import { logIn } from "@/handlers/auth";
import { useFormState } from "react-dom";

export default function Home() {
  const [message, formAction] = useFormState(logIn, null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <form
        action={formAction}
        className="border p-6 max-w-md rounded text-center"
      >
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={"admin@erp.com"}
          placeholder="email@example.com"
          className="border rounded p-1 w-full mb-2 outline-none"
        />
        <input
          type="password"
          name="password"
          id="password"
          defaultValue={"123456"}
          placeholder="Password..."
          className="border rounded p-1 w-full mb-2 outline-none"
        />
        <input type="submit" value="Go!" className="btn" />
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
