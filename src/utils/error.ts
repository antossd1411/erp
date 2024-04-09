import { SqlError } from "mariadb";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (error instanceof SqlError) {
    return error.sqlMessage;
  }

  return "An error has ocured."
}