import { createClient } from "@prismicio/client";

//essas variaveis pegan os seus valores das variaveis de ambiente
const prismicAccessToken = process.env.PRISMIC_ACCESS_TOKEN ?? "";
const prismicEndpoint = process.env.PRISMIC_ENDPOINT ?? "";

/* Estamos verificando se o token de acesso do Prismic foi fornecido.
 Se não tiver sido fornecido (ou seja, a variável prismicAccessToken 
está vazia), lançamos um erro informando que o token não foi fornecido.*/

if (!prismicAccessToken) {
  throw new Error("Error: PRISMIC_ACCESS_TOKEN not provided.");
}

export function getPrismicClient(req: Record<string, unknown> | null = null) {
  const options = {
    accessToken: prismicAccessToken,
    ...(req && { req }),
  };

  const prismic = createClient(prismicEndpoint, options);

  return prismic;
}
