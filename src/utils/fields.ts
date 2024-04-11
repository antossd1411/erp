import { validateEmail } from "./email";

export function isFieldValid(key: string, value: string) {
  if (typeof key !== "string" || typeof value !== "string") {
    throw new Error();
  }

  value = value.trim();

  if (key.includes("name")) {
    return value.match(/^[A-z\s]+$/g) !== null;
  }

  if (key === "email") {
    return validateEmail(value);
  }

  return false;
}