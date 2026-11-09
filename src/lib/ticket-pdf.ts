import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export interface PaidTicket {
  payment_reference: string;
  tier: string;
  quantity: number;
  amount_paid: number;
  full_name: string;
  created_at: string;
  payment_status: "paid";
}

export async function createTicketPdf(ticket: PaidTicket): Promise<Blob> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage([595, 842]);
  const green = rgb(0.12, 0.42, 0.23);
  const text = (value: string, y: number, size = 14, strong = false) => {
    // Standard PDF fonts require WinAnsi; preserve legible names without crashing on Unicode.
    const safe = value.normalize("NFKD").replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
    const words = safe.split(" ");
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if ((strong ? bold : font).widthOfTextAtSize(next, size) > 490 && line) {
        page.drawText(line, { x: 50, y, size, font: strong ? bold : font, color: green });
        y -= size + 6;
        line = word;
      } else line = next;
    }
    page.drawText(line, { x: 50, y, size, font: strong ? bold : font, color: green });
  };
  text("VIVA HEALTH MEDICAL FOUNDATION", 775, 19, true);
  text("5th Anniversary Dinner", 724, 24, true);
  text(ticket.tier === "test" ? "TEST TICKET - NOT VALID FOR EVENT ADMISSION" : "PAID EVENT TICKET", 675, 13, true);
  text(`Registered to: ${ticket.full_name}`, 618);
  text(`Category: ${ticket.tier.replace(/_/g, " ").toUpperCase()}`, 546);
  text(`Quantity: ${ticket.quantity}`, 506);
  text(`Amount paid: GHS ${ticket.amount_paid.toFixed(2)}`, 466, 20, true);
  text("Payment status: CONFIRMED", 420);
  text(`Reference: ${ticket.payment_reference}`, 362, 11);
  text(`Registered: ${new Date(ticket.created_at).toLocaleDateString("en-GB")}`, 322);
  text("Keep this ticket and payment reference for your records.", 220, 12);
  text("Event date, time and venue will be announced by the Foundation.", 185, 11);
  return new Blob([new Uint8Array(await pdf.save())], { type: "application/pdf" });
}

export async function downloadTicket(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: "application/pdf" });
  if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: "Your VivaHealth ticket" }); return; }
    catch (error) { if (error instanceof DOMException && error.name === "AbortError") return; }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}