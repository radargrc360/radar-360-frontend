
export type RiscosByClienteResponse = {
  status: "sucesso" | "erro";
  statusCode: number;
  formato: "json";
  mensagem: Risk[];
};

export type RiscoByIdResponse = {
  status: "sucesso" | "erro";
  statusCode: number;
  formato: "json";
  mensagem: Risk;
};

export type Risk = {
  riscos_id: number;
  empresa_id: number;
  codigo_risco: string;
  titulo: string;
  departamento_organizacional_id: number;
  descricao_risco: string;
  categoria_risco_fk_id: number;
  categora_sub_risco_fk_id: number;
  fonte: string;
  causa: string;
  consequencia: string;
  score: string;
  niveis_aceitacao_id: number;
  probabilidade: number;
  impacto: number;
  niveis_resudual_idd: number | null;
  apetite_risco_id: number;
  arquivo_de_evidencias: string;
  responsavel: string;
  status_riscos: string;
  risco_time: string;
  risco_update: string;
};