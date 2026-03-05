export type ClientUser = {
  id_usuarios: number;
  primeiro_nome_usuario: string;
  segundo_nome_usuario: string;
  email_: string;
  tipo_usuario: number;
  usuario_empresa_fk: number;
  cadastrado_em: string;
  actualizado_em: string;
  acesso: "true" | "false";
  gerado_por: number;
  login_usuario: string | null;
  hash_login: string | null;

  id_usuarios_funcoes: number;
  usuario_funcao: string;
  empresa_funcao_fk: number;
  usuarios_funcoes_time: string;
  usuarios_funcoes_update: string;
};

export type UsersByClientResponse = {
  status: "sucesso" | "erro";
  statusCode: number;
  formato: "json";
  mensagem: ClientUser[];
};
