import { connectionOptions } from "@/db";
import { getNavLinks } from "@/db/layout/nav";
import NavLink from "@/types/Layout/Nav/navLink";
import { handleError } from "@/utils/error";
import { createConnection } from "mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const conn = await createConnection(connectionOptions);

    const results: NavLink[] = await conn.query(getNavLinks());

    conn.end();

    return NextResponse.json(results);
  } catch (err) {
    const message = handleError(err);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}