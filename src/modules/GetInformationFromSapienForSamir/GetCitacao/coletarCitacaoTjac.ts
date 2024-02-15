import { downloadPDFWithCookies } from "../../GetPdfSapiens/downloadPDFWithCookies";
import { readPDF } from "../../GetPdfSapiens/readPDF";

export async function coletarCitacaoTjac(arrayDeDocument: any, cookie: string) {
    var paginaProcessoJudicial: any = arrayDeDocument.filter(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "PROCJUDIC");
    let idProcessoJudicial = paginaProcessoJudicial[0].documentoJuntado.componentesDigitais[0].id
    const urlProcesso = (`https://sapiens.agu.gov.br/documento/${idProcessoJudicial}`)
    await downloadPDFWithCookies(urlProcesso, cookie)
    const mesesDoAno = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ];
    const pdfString: string = (await readPDF('src/modules/GetPdfSapiens/pdfIsUser.pdf'))
    console.log(pdfString.split("MANDADO DE CITAÇÃO E DE INTIMAÇÃO"))
}