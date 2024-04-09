"use client";

import NavBar from "@/components/layout/nav/NavBar";
import NavButton from "@/components/layout/nav/NavButton";
import React, { Fragment, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [navActive, setNavActive] = useState(false);

  return (
    <Fragment>
      <header className="p-4 flex justify-between border-b">
        <NavButton onClick={() => setNavActive(true)} />
      </header>
      <NavBar active={navActive} onClickClose={() => setNavActive(false)} />
      {children}
    </Fragment>
  );
}
