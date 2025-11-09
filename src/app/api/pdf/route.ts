import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  console.log("api called");
  const { html } = await req.json();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/",{ waitUntil: "networkidle0" });
  // wait 1 second

  const resumePreview = await page.$("#resume-preview");
  if (!resumePreview) {
    console.log("no resume preview found");
    return new NextResponse("No resume preview found", { status: 400 });
  }

  // Get the bounding box of the element
  const boundingBox = await resumePreview.boundingBox();

  if (!boundingBox) {
    console.log("could not determine bounding box");
    return new NextResponse("Could not determine bounding box", {
      status: 400,
    });
  }

  // Generate PDF clipped to the element’s bounding box
  const pdfBuffer = await page.pdf({
    format: "A4",
    // clip: {
    //   x: boundingBox.x,
    //   y: boundingBox.y,
    //   width: boundingBox.width,
    //   height: boundingBox.height,
    // },
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
}
