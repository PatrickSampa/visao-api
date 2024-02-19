import fs from 'fs';
import path from 'path';



export function deletePDF(filename: string): void {
    const filePath = path.join("C:/Users/Dev/Desktop/samir/visao-api/src/modules/PDFS", `pdfIsUser.pdf`);
    /* const filePath = path.join('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf'); */
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${filename} was deleted successfully`);
    });
  }