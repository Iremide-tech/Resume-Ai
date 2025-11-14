import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    console.log("PDF API called");
    const { html } = await req.json();

    if (!html) {
      return new NextResponse("Missing HTML", { status: 400 });
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Load HTML into Puppeteer
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error: unknown) {
    console.error("PDF ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse("PDF generation failed: " + errorMessage, {
      status: 500,
    });
  }
}
