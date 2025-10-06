
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  console.log("api called");
  const {html} = await req.json();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Render a Next.js page as HTML (could be an invoice page)
  await page.setContent(html, {
    waitUntil: "networkidle0"
  });

  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  return new NextResponse(Buffer.from(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    },
  });
}