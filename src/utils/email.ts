export function validateEmail(email: string = "") {
  const regex = new RegExp(/^[A-z0-9-_]+@{1}[A-z]+\.[A-z]{2,5}(\.[A-z]{2,5})?$/, "gi");

  const matches = email.match(regex);

  if (matches) return true;

  return false;
}