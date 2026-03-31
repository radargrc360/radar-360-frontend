export interface ClientData {
  message: {
    id_clientes: number;
    nome_empresa: string;
    cliente_industria_id: number;
    cliente_jurisdicao_id: number;
    cliente_matriz_escala_id: number;
    nif: string;
    contacto: string;
    contacto_2: string;
    email: string;
    email_2: string;
    logo: string;
    bloqueio: boolean;
    ultimo_login: string;
    ultimo_logout: string;
    hash_autenticador: string;
    sector_atuacao: string;
    tamanho_organizacao: "Micro" | "Pequena" | "Media" | "Grande";
  };
}
