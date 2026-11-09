export const TEST_TICKET_PRICE = 1;
export function isTestTicketPage(path: string, query: string) {
  return path === "/test-ticket" || new URLSearchParams(query).get("test") === "1";
}