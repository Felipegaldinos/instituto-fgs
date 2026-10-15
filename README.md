# Instituto FGS

Portal de cursos com páginas de apresentação, conteúdo, cadastro e chat.

## Recursos

Navegação por páginas HTML e histórico de conversas salvo no localStorage.

## Tecnologias

HTML, CSS e JavaScript; sem etapa de build npm na estrutura analisada.

## Executar localmente

Sirva os arquivos por HTTP; uma opção com Python 3 instalado:

```sh
git clone https://github.com/Felipegaldinos/instituto-fgs.git
cd instituto-fgs
python -m http.server 8000
```

Abra http://localhost:8000. Recursos de terceiros, quando usados, exigem conexão com a internet.

## Onde começar no código

- `index.html` — ponto de entrada para entender o projeto.

## Estado atual

O envio do chat está temporariamente desativado na correção de segurança: não há chave de API no JavaScript proposto nem chamadas ao provedor. O histórico local continua disponível. Uma credencial anteriormente pública deve ser revogada no provedor; este commit não remove o histórico Git. Para reativar IA, implemente um servidor autenticado com segredo no ambiente, limites de uso e validação das mensagens. Não coloque uma nova chave no navegador. As páginas de cadastro/login, por si só, não comprovam autenticação de servidor.

## Autoria

[Felipe Galdino](https://github.com/Felipegaldinos). Consulte os arquivos do repositório para os termos de licença aplicáveis.
