// types/departamento.ts
export interface Departamento {
  id_departamento: number
  departamento: string
  empresa_dona: number
  departamento_time: string
  departamento_update: string
}

export interface DepartamentosResponse {
  status: string
  statusCode: number
  formato: string
  mensagem: Departamento[]
}
