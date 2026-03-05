import { Framework } from "./framework";

export interface JurisdicaoActiva {
  jurisdicao_activa_id: number;
  jurisdicao_orgao_regulador: string;
  jurisdicao_activa_pais: string;
  jurisdicao_activa_time: string;
  jurisdicao_activa_update: string;
  frameworks: Framework[];
}

export interface GetJurisdicaoResponse {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: JurisdicaoActiva[];
}
