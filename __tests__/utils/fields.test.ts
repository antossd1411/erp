import { isFieldValid } from "@/utils/fields";
import { test, expect } from "vitest";

test("Should exists", () => {
  expect(isFieldValid).toBeDefined();
});

test("Should return boolean", () => {
  expect(isFieldValid("", "")).toBeTypeOf("boolean");
});

test("Should be true if Name has only letters", () => {
  expect(isFieldValid("first_name", "Antonio")).toBeTruthy();
  expect(isFieldValid("last_name", "Usher 3")).toBeFalsy();
});