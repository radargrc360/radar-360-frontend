import { Framework } from "./framework";

export interface ClienteFrameworksResponse {
  id_clientes: number;
  cliente_industria_id: number;
  cliente_jurisdicao_id: number;
  cliente_matriz_escala_id: number;
  nome_empresa: string;
  nif: string;
  contacto: string;
  contacto_2: string;
  email: string;
  email_2: string;
  logo: string;
  bloqueio: string;
  ultimo_login: string;
  ultimo_logout: string;
  hash_autenticador: string;
  sector_atuacao: string | null;
  tamanho_organizacao: string;
  cliente_time: string;
  cliente_update: string;
  novo_cliente: string;

  frameworks: Framework[];

  industria: {
    id_industrias_principal: number;
    industrias_principal_descricao: string;
  };

  jurisdicao: {
    jurisdicao_activa_id: number;
    jurisdicao_orgao_regulador: string;
    jurisdicao_activa_pais: string;
  };

  hashId: string;

  escalaMatriz: {
    risco_escala_id: number;
    risco_escala_nome: string;
    risco_escala_descricao: string;
    risco_escala_tamanho: number;
    probabilidade_max: number;
    impacto_max: number;
    risco_escala_ativa: string;
    risco_escala_recomendada: string;
    risco_escala_time: string;
    risco_escala_update: string;
  };
}
