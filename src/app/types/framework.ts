export interface Framework {
  jurisdicao_orgao_regulador: string;
  jurisdicao_activa_pais: string;
  framework_jurisdicao_id: number;
  aplicabilidade: "Obrigatória" | "Opcional";
  framework_id: number;
  framework_nome: string;
  framework_sigla: string;
  framework_tipo_id_fk: number;
  framework_orgao_id_fk: number;
  framework_descricao: string;
  framework_ano: number;
  framework_status: "Ativo" | "Inativo";
}

export interface FrameworkCliente {
  framework_id: number;
  framework_nome: string;
  framework_sigla: string;
  framework_tipo_id_fk: number;
  framework_orgao_id_fk: number;
  framework_descricao: string;
  framework_ano: number;
  framework_status: string;
  framework_time: string;
  framework_update: string;
  clientes_frameworks: number;
  clientes_id_fk: number;
  frameworks_id_fk: number;
  clientes_frameworks_time: string;
  clientes_frameworks_update: string;
}
