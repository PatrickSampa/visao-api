import fs from 'fs';
import path from 'path';



export function deletePDF(filename: string): void {
  try{
    
  }catch(e){

    const filePath = path.join("src/modules/PDFS", `${filename}.pdf`);
    /* const filePath = path.join('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf'); */
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${filename} was deleted successfully`);
    });

  }
    console.log("ERRO AO DELETAR PDF")
  }