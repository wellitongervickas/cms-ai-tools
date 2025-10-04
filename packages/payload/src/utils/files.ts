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
    /* --- Root --- */
    * {
      box-sizing: border-box;
    }

    body {
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.55;
      color: #222;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 2.5rem;
      background: #fff;
      font-size: 11.5pt;
    }

    /* --- Headings --- */
    h1, h2, h3, h4 {
      font-weight: 600;
      color: #111;
      margin: 1.4em 0 0.6em;
      line-height: 1.25;
    }

    h1 {
      font-size: 26pt;
      border-bottom: 3px solid #000;
      padding-bottom: 0.25em;
      margin-bottom: 0.6em;
      letter-spacing: -0.5px;
    }

    h2 {
      font-size: 16pt;
      color: #2a2a2a;
      border-bottom: 1.5px solid #ccc;
      padding-bottom: 0.2em;
      margin-top: 2em;
    }

    h3 {
      font-size: 13pt;
      color: #333;
      margin-top: 1.2em;
    }

    /* --- Text Elements --- */
    p {
      margin: 0.4em 0 0.6em;
    }

    strong {
      font-weight: 600;
    }

    em {
      color: #555;
    }

    a {
      color: #0077cc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* --- Lists --- */
    ul, ol {
      margin: 0.4em 0 0.8em;
      padding-left: 1.5em;
    }

    li {
      margin-bottom: 0.25em;
    }

    /* --- Tables --- */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
      font-size: 10.5pt;
    }

    table th, table td {
      border: 1px solid #ddd;
      padding: 0.4em 0.6em;
      text-align: left;
    }

    table th {
      background: #f7f7f7;
      font-weight: 600;
    }

    /* --- Blockquotes --- */
    blockquote {
      border-left: 3px solid #999;
      margin: 1em 0;
      padding-left: 1em;
      color: #555;
      font-style: italic;
    }

   
    /* --- Page Breaks --- */
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
      h1, h2, h3 {
        page-break-after: avoid;
      }
      p, li {
        orphans: 3;
        widows: 3;
      }
    }
  `;

  // Complete HTML document
  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        top: "8mm",
        right: "8mm",
        bottom: "8mm",
        left: "8mm",
      },
      printBackground: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
