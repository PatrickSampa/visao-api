import { correçaoDoErroDeFormatoDoSapiens } from "../../../helps/CorreçaoDoErroDeFormatoDoSapiens";
import { getXPathText } from "../../../helps/GetTextoPorXPATH";
import { getCapaDoPassivaUseCase } from "../../GetCapaDoPassiva";
import { getPastaUseCase } from "../../GetPasta";
const { JSDOM } = require('jsdom');


export async function getPastaDoProcessoAdministrativo(nup: string, cookie: string):Promise<number>{
    const capaHTMLDoPassivo = await getCapaDoPassivaUseCase.execute(nup, cookie)
    const capaDoPassivoFormata =  new JSDOM(capaHTMLDoPassivo)
    const xphatDaNUP_Principal =  "/html/body/div/div[4]/table/tbody/tr[13]/td[2]/a[1]/b"
    try {
        nup = await correçaoDoErroDeFormatoDoSapiens(getXPathText(capaDoPassivoFormata, xphatDaNUP_Principal)).replace("(PRINCIPAL)", "").replace("-","").replace("/", "").replace(".","");
        const responseGetPasta = await getPastaUseCase.execute(nup, cookie);
        return responseGetPasta[0].id;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}