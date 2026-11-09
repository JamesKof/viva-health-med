import { test, expect } from "bun:test";
import { ticketAccessToken, verifiedTicketPayment } from "./ticket-access";

test("a GH₵1 ticket requires a successful GH₵1 merchant payment", () => {
  const payment = { ClientReference: "test-ref", TransactionStatus: "Success", CurrencyCode: "GHS", AmountAfterFees: 1, TransactionAmount: 1.01 };
  expect(verifiedTicketPayment(payment, "test-ref", 1)).toBe(true);
  expect(verifiedTicketPayment({ ...payment, AmountAfterFees: 0.5 }, "test-ref", 1)).toBe(false);
});
test("pending and failed payments cannot issue tickets", () => {
  for (const status of ["Pending", "Failed"]) {
    expect(verifiedTicketPayment({ ClientReference: "test-ref", TransactionStatus: status, CurrencyCode: "GHS", AmountAfterFees: 1 }, "test-ref", 1)).toBe(false);
  }
});
test("ticket access is specific to its payment reference", async () => {
  expect(await ticketAccessToken("ref-1", "test-only-secret")).not.toBe(await ticketAccessToken("ref-2", "test-only-secret"));
});