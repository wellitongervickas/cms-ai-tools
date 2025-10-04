import MarkdownIt from "markdown-it";
import puppeteer from "puppeteer";
import type { File } from "payload";

// Initialize markdown-it with your preferred options
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

/**
 * Convert markdown string to PDF buffer
 */
export async function markdownToPDF(
  markdownContent: string,
  options?: {
    css?: string;
    margins?: { top?: string; right?: string; bottom?: string; left?: string };
  }
): Promise<File["data"]> {
  // Convert markdown to HTML
  const htmlContent = md.render(markdownContent);

  // Default CSS for professional resume typography
  const defaultCSS = `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
    }
    h1 { 
      font-size: 2.5em; 
      border-bottom: 2px solid #eee; 
      padding-bottom: 0.3em; 
    }
    h2 { 
      font-size: 2em; 
      border-bottom: 1px solid #eee; 
      padding-bottom: 0.3em; 
    }
    h3 { 
      font-size: 1.5em; 
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 1em;
      color: #666;
      margin: 1em 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    table th, table td {
      border: 1px solid #ddd;
      padding: 0.5em;
      text-align: left;
    }
    table th {
      background: #f4f4f4;
      font-weight: 600;
    }
    ul, ol {
      margin: 0.5em 0;
      padding-left: 2em;
    }
    li {
      margin: 0.25em 0;
    }
    p {
      margin: 0.5em 0;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    strong {
      font-weight: 600;
    }
    em {
      font-style: italic;
    }
  `;

  // Complete HTML document
  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>${options?.css || defaultCSS}</style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  // Launch puppeteer and generate PDF
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHTML, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: options?.margins || {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
      printBackground: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
