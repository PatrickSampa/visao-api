import axios from "axios";
import path from 'path';
import fs from 'fs';

export async function downloadPDFWithCookies(url: string, cookies: string): Promise<void> {
    const response = await axios.get(url, {
      headers: {
        Cookie: cookies,
        'Content-Type': 'application/pdf',
      },
      responseType: 'arraybuffer',
    });
  
    const filePath = path.join(__dirname, 'pdfIsUser.pdf');
   /* const filePath = path.join('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf'); */
    //console.log(filePath);
    fs.writeFileSync(filePath, response.data);
  }