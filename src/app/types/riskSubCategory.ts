// types/riskSubCategory.ts

export type RiskSubCategory = {
  id_lista_categoria_sub_de_risco: number;
  categoria_de_risco_id_fk: number;
  descricao_categoria_sub: string;
  categoria_sub_time: string;
  categoria_sub_update: string;

  id_lista_de_categoria_de_risco: number;
  categoria: string;
  lista_time: string;
  lista_update: string;
};

export type RiskSubCategoryResponse = {
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
    descricao_categoria_sub: string;
    categoria_de_risco_id_fk: string;
  };
  mensagem: RiskSubCategory[];
};
