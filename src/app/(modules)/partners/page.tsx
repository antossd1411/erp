"use client";

import { useRouter } from "next/navigation";

export default function Partners() {
  const router = useRouter();
  return (
    <main>
      <section className="border p-2 text-end">
        <button
          type="button"
          onClick={() => router.push("/partners/create")}
          className="btn"
        >
          Add
        </button>
      </section>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </main>
  );
}
