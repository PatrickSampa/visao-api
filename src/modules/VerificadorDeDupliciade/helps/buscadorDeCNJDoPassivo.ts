import { correçaoDoErroDeFormatoDoSapiens } from "../../../helps/CorreçaoDoErroDeFormatoDoSapiens";
import { getXPathText } from "../../../helps/GetTextoPorXPATH";
import { getCapaDoPassivaUseCase } from "../../GetCapaDoPassiva";
import { getPastaUseCase } from "../../GetPasta";
const { JSDOM } = require('jsdom');


export async function buscadorDeCNJDoPassivo(nup: string, cookie: string):Promise<string>{
    const capaHTMLDoPassivo = await getCapaDoPassivaUseCase.execute(nup, cookie)
    const capaDoPassivoFormata =  new JSDOM(capaHTMLDoPassivo)
    const xphatDaNUP_Principal =  "/html/body/div/div[4]/table/tbody/tr[13]/td[2]/a[1]/b"
    try {
        nup = await correçaoDoErroDeFormatoDoSapiens(getXPathText(capaDoPassivoFormata, xphatDaNUP_Principal)).replace("(PRINCIPAL)", "").replace("-","").replace("/", "").replace(".","");
        const capaDoProcessoPrincipal = new JSDOM(await getCapaDoPassivaUseCase.execute(nup, cookie));
        const xphatDoCNJ =  "/html/body/div/div[4]/table/tbody/tr[1]/td[2]"
        const cnj = await correçaoDoErroDeFormatoDoSapiens(getXPathText(capaDoProcessoPrincipal, xphatDoCNJ));
        return cnj;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}