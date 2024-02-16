import { downloadPDFWithCookies } from "../../GetPdfSapiens/downloadPDFWithCookies";
import { readPDF } from "../../GetPdfSapiens/readPDF";

export async function coletarCitacaoTjac(arrayDeDocument: any, cookie: string) {

    try{

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
        const pdfStringWithSplit = pdfString.split("MANDADO DE CITAÇÃO E DE INTIMAÇÃO")[1]
        //console.log(pdfStringWithSplit)
        const gerexMeses = new RegExp(mesesDoAno.join("|"), "gi")
        const MonthSeacrch = pdfStringWithSplit.match(gerexMeses)[0]
        const MounthNumber = (mesesDoAno.indexOf(MonthSeacrch) + 1)
    
        const expressaoRegular = new RegExp(`\\b${MonthSeacrch}\\b`, "gi");
        const matchEletronico = pdfStringWithSplit.match(expressaoRegular);
    
        const indexPalavraChave = pdfStringWithSplit.indexOf(matchEletronico[0]);
    
        // Extrair os 6 caracteres antes da palavra-chave
        const dia = pdfStringWithSplit.substring(indexPalavraChave - 6, indexPalavraChave).trim().split(" ")[0]
        const ano = pdfStringWithSplit.substring(indexPalavraChave + 13, indexPalavraChave).trim().split(" ")[2]
        const mes = MounthNumber
    
        return `${dia}/${mes < 10 ? '0' + mes : mes}/${ano}`


    }catch(e){
        console.log("ERRO NO COLETACITACAOTJAC")
        return null
    }
}