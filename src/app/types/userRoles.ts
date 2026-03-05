export type UserRole = {
  id_usuarios_funcoes: number;
  usuario_funcao: string;
  empresa_funcao_fk: number;
  usuarios_funcoes_time: string;
  usuarios_funcoes_update: string;

  id_clientes: number;
  nome_empresa: string;
  nif: string;
  contacto: string;
  contacto_2: string;
  email: string;
  email_2: string;
  senha: string;
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
};

export type UserRolesByClientResponse = {
  status: "sucesso" | "erro";
  statusCode: number;
  formato: "json";
  mensagem: UserRole[];
};
