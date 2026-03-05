export interface FrameworkRisco {
  framework_risco_categoria_id: number;
  risco_categoria_id_fk: number;
  nivel_cobertura: "Total" | "Parcial";
  framework_id: number;
  framework_nome: string;
  framework_sigla: string;
  framework_descricao: string;
  framework_ano: number;
  framework_status: string;
}

export interface CategoriaRisco {
  id_lista_de_categoria_de_risco: number;
  categoria: string;
  categoria_descricao: string;
  lista_time: string;
  lista_update: string;
  frameworks: FrameworkRisco[];
}

export interface RegistrosPaginacao {
  paginas: number;
  pagina_actual: number;
  total: number;
  limite: number;
  total_apresentados: number;
  categoria: string;
}

export interface GetCategoriasRiscoResponse {
  status: string;
  statusCode: number;
  formato: string;
  registros: RegistrosPaginacao;
  mensagem: CategoriaRisco[];
}
