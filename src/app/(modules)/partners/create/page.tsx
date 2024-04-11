"use client";

import { isFieldValid } from "@/utils/fields";
import { ChangeEvent, useState } from "react";

export default function PartnerDetail() {
  const [partner, setPartner] = useState(); // new Partner();

  const handleInputsChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = ev.currentTarget;
    if (isFieldValid(name, value)) {
      // const newPartner = {...partner};
      // newPartner[name] = value.trim();
      // setPartner(newPartner);
    }
  };

  return (
    <main>
      <form method="post" className="border rounded p-2 max-w-lg">
        <section>
          {/* Personal Data */}
          <div>
            <label htmlFor="">First name</label>
            <input
              type="text"
              name="first_name"
              id=""
              required
              className="w-100 rounded"
              onChange={handleInputsChange}
            />
          </div>
          <div>
            <label htmlFor="">Last name</label>
            <input
              type="text"
              name="last_name"
              id=""
              required
              className="w-100 rounded"
            />
          </div>
          <div>
            <label htmlFor="">DNI type</label>
            <select onChange={(ev) => null}></select>
          </div>
          <div>
            <label htmlFor="">DNI</label>
            <input
              type="text"
              name="dni"
              id=""
              required
              className="w-100 rounded"
            />
          </div>
          <div>
            <label htmlFor="">Birth date</label>
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              id=""
              required
              className="w-100 rounded"
            />
          </div>
        </section>
        <section>{/* Phone Number */}</section>
        <section>{/* Address */}</section>
        <div>
          <button type="reset" className="btn">
            Clear
          </button>
          <button type="submit" className="btn ms-2">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
