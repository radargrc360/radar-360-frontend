import { Framework } from "./framework";

export type CategoriaRisco = {
  id_categoria_de_risco: number;
  categoria_risco: number;
  materialidade:
    | "Reduzido"
    | "Baixo"
    | "Moderado"
    | "Elevado"
    | "Muito Elevado";
  cliente_categorizado: number;
  categoria_time: Date;
  categoria_update: Date;
  id_lista_de_categoria_de_risco: number;
  categoria: string;
  lista_time: Date;
  lista_update: Date;
  frameworks: Framework[]
};

export type CategoriaRiscoResponse = {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: CategoriaRisco[];
};
