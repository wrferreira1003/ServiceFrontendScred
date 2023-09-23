import { Document, Packer, Paragraph, TextRun } from "docx";

export function downloadWord(data: any) {
  const paragraphs = Object.entries(data).map(([key, value]) => {
      return new Paragraph({
          children: [
              new TextRun(`${key}: `),
              new TextRun({ text: String(value), bold: true })
          ],
      });
  });

  const doc = new Document({
      sections: [{
          properties: {},
          children: paragraphs
      }]
  });

  // Export the document
  Packer.toBlob(doc).then(blob => {
      // Use blob to create and download the file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'document.docx';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
  });
}