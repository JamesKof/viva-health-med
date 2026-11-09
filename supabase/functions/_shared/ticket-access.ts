export async function ticketAccessToken(reference: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`ticket:${reference}`)));
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

export function verifiedTicketPayment(transaction: Record<string, unknown>, reference: string, total: number) {
  // Hubtel adds its fee to TransactionAmount; AmountAfterFees is the merchant's ticket amount.
  const received = Number(transaction.AmountAfterFees ?? transaction.TransactionAmount);
  return transaction.ClientReference === reference && transaction.TransactionStatus === "Success" &&
    transaction.CurrencyCode === "GHS" && Number.isFinite(received) && Math.abs(received - total) < 0.005;
}