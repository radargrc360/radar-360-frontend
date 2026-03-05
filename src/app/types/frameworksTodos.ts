import { Framework } from "./framework";
import { IndustriaPrincipal } from "./industria";
import { JurisdicaoActiva } from "./juridisdicao";

export interface ClienteFrameworksData {
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
  jurisdicao: JurisdicaoActiva;
  industria: IndustriaPrincipal;
  hashId: string;
}

export interface ClienteFrameworksResponse {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: ClienteFrameworksData;
}
