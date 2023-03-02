export type ResponseGetPasta = [
    {
        id: number;
        uuid: string;
        documentoAvulso: boolean;
        unidadeArquivistica: number;
        tipoProtocolo: number;
        valorEconomico: number;
        novo: boolean;
        protocoloEletronico: boolean;
        semValorEconomico: boolean;
        emTramitacao: number;
        NUP: string;
        visibilidadeRestrita: boolean;
        visibilidadeExterna: boolean;
        visibilidadeDisciplinar: boolean;
        encerrado: boolean;
        dataHoraAbertura: {
          date: string;
        };
        dataHoraTransicao: {
          date: string;
        };
        titulo: string;
        chaveAcesso: string;
        criadoEm: {
          date: string;
        };
        atualizadoEm: {
          date: string;
        };
        acompanhada: boolean;
      }
]