import { getXPathText } from "../../../helps/GetTextoPorXPATH";
import { VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie } from "../../../helps/VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie";
import { MinhaErroPersonalizado } from "../helps/ErrorMensage";
import { getInformaçoesIniciasDosBeneficiosSuperDosprev } from "../helps/getInformaçoesIniciasDosBeneficiosSuperDosprev";
import { getInformaçoesSecudariaDosBeneficiosSuperDossie } from "../helps/getInformaçoesSecudariaDosBeneficiosSuperDossie";

export class SuperDossie {
    async handle(paginaDosprev: any) {
        const xpaththInformacaoCabecalho = "/html/body/div/div[3]/p/strong/text()"

        const informacaoDeCabeçalho = getXPathText(paginaDosprev, xpaththInformacaoCabecalho);
        const informacaoDeCabecalhoNaoExiste = !informacaoDeCabeçalho;
        if (informacaoDeCabecalhoNaoExiste) {
            throw new MinhaErroPersonalizado('DOSPREV FORA DO PRAZO DO PRAZO DE VALIDADE');
        }

        if (0 > VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie(informacaoDeCabeçalho)) {
            throw new MinhaErroPersonalizado('DOSPREV FORA DO PRAZO DO PRAZO DE VALIDADE');
        }

        var beneficios = await getInformaçoesIniciasDosBeneficiosSuperDosprev(paginaDosprev);
        if (beneficios.length <= 0) {
                    throw new MinhaErroPersonalizado('DOSPREV SEM BENEFICIO VALIDOS');
        }
        beneficios = await getInformaçoesSecudariaDosBeneficiosSuperDossie(beneficios, paginaDosprev); 
        console.log("BENEFICIOS TESTE = " +JSON.stringify(beneficios))       

    }

}