export function getNavLinks() {
  return `
  SELECT
    link,
    route,
    icon
  FROM nav_links AS nav
  WHERE
    is_active = 1;`;
}