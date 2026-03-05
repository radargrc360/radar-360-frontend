export interface IndustriaPrincipal {
  id_industrias_principal: number;
  industrias_principal_descricao: string;
  industrias_principal_time: string;
  industrias_principal_update: string;
  jurisdicao_orgao_regulador: string;
  jurisdicao_activa_pais: string;
}

export interface IndustriasResponse {
  status: string;
  statusCode: number;
  formato: string;
  registros: {
    paginas: number;
    pagina_actual: number;
    total: number;
    limite: number;
    count: number;
    total_apresentados: number;
    industrias_principal_descricao: string;
  };
  mensagem: IndustriaPrincipal[];
}
