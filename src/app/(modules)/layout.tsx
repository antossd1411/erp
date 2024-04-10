"use client";

import NavBar from "@/components/layout/nav/NavBar";
import NavButton from "@/components/layout/nav/NavButton";
import React, { Fragment, useEffect, useState } from "react";
import fetcher from "../api/fetch";
import NavLink from "@/types/Layout/Nav/navLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [navItems, setNavItems] = useState<NavLink[]>([]);
  const [error, setError] = useState("");
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    fetchNavItems().then((data: NavLink[]) => {
      setNavItems(data);
    });
  }, []);

  const fetchNavItems = async () => {
    try {
      const response: Response = await fetcher("/api/layout/nav");

      const data: NavLink[] | any = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    } catch (err) {
      let errorMessage = "An error has occured.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <Fragment>
      <header className="p-4 flex justify-between border-b">
        <NavButton onClick={() => setNavActive(true)} />
      </header>
      <NavBar
        active={navActive}
        items={navItems}
        error={error}
        onClickClose={() => setNavActive(false)}
      />
      {children}
    </Fragment>
  );
}
