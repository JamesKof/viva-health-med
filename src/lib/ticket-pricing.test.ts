import { test, expect } from "bun:test";
import { TEST_TICKET_PRICE, isTestTicketPage } from "./ticket-pricing";
test("test ticket costs exactly GH₵1", () => { expect(TEST_TICKET_PRICE).toBe(1); });
test("simple and original test URLs select test mode, regular tickets do not", () => {
  expect(isTestTicketPage("/test-ticket", "")).toBe(true);
  expect(isTestTicketPage("/tickets", "?test=1")).toBe(true);
  expect(isTestTicketPage("/tickets", "")).toBe(false);
});