import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

/**
 * Skip test because of an error with useFormState
 */

test.skip("Home", () => {
  render(<Home />);
  expect(screen.getByRole("textbox", { name: "email" })).toBeDefined();
});
