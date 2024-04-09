import { test, expect } from "vitest";
import { validateEmail } from "../../src/utils/email";

test("Should exists", () => {
  expect(validateEmail).toBeDefined();
})

test("Should return boolean", () => {
  expect(validateEmail()).toBeTypeOf("boolean");
})

test("Should match an email format string", () => {
  expect(validateEmail("antoniosotillo14@hotmail.com")).toBeTruthy();
  expect(validateEmail()).toBeFalsy();
})