export interface RiscoClassificacao {
  risco_classificacao_id: number;
  risco_classificacao_nome: string;
  risco_classificacao_descricao: string;
  valor_min: number;
  valor_max: number;
  risco_classificacao_time: string;
  risco_classificacao_update: string;
}

export interface RiscoEscala {
  risco_escala_id: number;
  risco_escala_nome: string;
  risco_escala_descricao: string;
  risco_escala_tamanho: number;
  probabilidade_max: number;
  impacto_max: number;
  risco_escala_ativa: "0" | "1";
  risco_escala_time: string;
  risco_escala_update: string;
  classifacoes: RiscoClassificacao[];
}

export interface GetEscalasMatrizResponse {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: RiscoEscala[];
}
