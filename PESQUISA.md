# Diário de pesquisa

## Contexto do TCC

O ZYRA é um app mobile que ajuda pessoas com daltonismo a se vestir: identifica a cor da roupa pela câmera, mostrando o nome e o símbolo ColorADD, guarda as peças num closet virtual e sugere looks com um assistente de IA que só usa as roupas da própria pessoa. No cadastro de peça, uma IA (gpt-4.1-mini, rota /analyze-clothing) preenche sozinha categoria, material, manga, cano, aquecimento, ocasiões e cor.

## Pergunta de pesquisa

Como o react-hook-form com zod permite que a pessoa revise e corrija os campos de uma peça preenchidos automaticamente pela IA do ZYRA antes de salvar, na condição de que a IA pode mandar valores fora da lista, campos que não se aplicam à categoria ou campos obrigatórios vazios, sem que nada inválido chegue ao back?

## Alternativas consideradas

| Opção | Serve para | Funciona no Expo Go? | Decisão |
|---|---|---|---|
| `useState` + validação manual | Formulários de um ou dois campos | Sim, é só React | Não: as regras cruzadas (manga só em peça de cima, cano só em bota) virariam `if` espalhados pela tela, sem um lugar único para as regras nem um tipo TypeScript derivado delas. ChatGPT e Gemini concordam que não escala. |
| Formik + Yup | Formulários controlados, muito usados em projetos antigos | Sim, só JavaScript; a documentação tem guia de React Native | Não: a última versão do Formik é a 2.4.9, de 10/11/2025, quase um ano sem lançamento, enquanto o react-hook-form teve versão em outubro de 2026. Nenhuma das duas IAs o recomenda para projeto novo. |
| TanStack Form | Formulários com tipagem forte; tem guia de uso com React Native | Sim, só JavaScript | Não: é headless e exige montar à mão a ligação dos campos, as mensagens de erro e o foco; tem menos exemplos de React Native. O ChatGPT o colocou em segundo lugar; o Gemini o esqueceu no Prompt 1. |
| react-hook-form + zod (`@hookform/resolvers`) | Formulários com regras declaradas em um schema e mensagens por campo | Sim, só JavaScript | **Sim**: o `useController` liga `TextInput` e componentes próprios ao formulário; o schema zod é o lugar único das regras, gera o tipo da peça validada e o `.refine` com `path` e `when` coloca o erro de uma regra cruzada no campo certo, junto com os outros erros. As duas IAs recomendaram essa combinação. |

Outras bibliotecas de validação citadas pelo ChatGPT, que poderiam substituir o zod: Yup e Valibot. Mantive o zod porque é o que aparece nos exemplos do react-hook-form e porque gera o tipo TypeScript direto do schema.

### Versões conferidas (08/11/2026)

| Pacote | Versão atual | Lançada em | Situação |
|---|---|---|---|
| react-hook-form | 7.91.0 | outubro de 2026 | Segundo o ChatGPT e o Gemini [confira no npm] |
| zod | 4.6.7 | 12/10/2026 | Confirmado |
| @hookform/resolvers | 7.0.3 | 05/11/2026 | Confirmado |
| formik | 2.4.9 | 10/11/2025 | Confirmado |
| @tanstack/react-form | 1.33.5 | agosto de 2026 | Segundo o ChatGPT e o Gemini [confira no npm] |

Na instalação vale a versão que o `npx expo install` escolher; confira no `package.json` depois de instalar.

### Comparação entre as IAs

Respostas completas na pasta `respostas-ia/`.

**Prompt 1 (mapa do tema):**

| Ponto | ChatGPT | Gemini | O que a documentação diz |
|---|---|---|---|
| Alternativas de formulário | 4: react-hook-form, TanStack Form, Formik, `useState` | 3: não citou o TanStack Form | O TanStack Form tem guia oficial de React Native: o Gemini deixou de fora uma opção válida. |
| Situação do Formik | Funciona, mas não seria a primeira escolha | "Ecossistema menos ativo em atualizações" | A última versão é de 10/11/2025: o Gemini tinha razão. |
| Links | Páginas específicas, com `?utm_source=chatgpt.com` | Só as páginas iniciais | Tirei o `utm_source` ao citar. |
| Revisão × validação | Sugeriu separar "a pessoa revisou" de "o valor é válido" e validar de novo no back | Não citou | Ideia de projeto; fica para os próximos passos. |

No exemplo dele, o ChatGPT usou "Algodão" como material, "Baixo" como aquecimento e "Casual" como ocasião, e disse que todos podiam estar dentro das opções permitidas. Nenhum desses valores existe nas listas do ZYRA. Não conta como erro, porque ele não recebeu as listas, mas é exatamente o tipo de valor que o schema precisa barrar.

**Prompt 2 (comparação com versões):**

| Ponto | ChatGPT | Gemini |
|---|---|---|
| Versão do Zod | 4.6.7, de 12/10/2026 (correto) | "3.24.x, ou v4 em estágio inicial" (errado, ver abaixo) |
| Versões de Formik, Yup, TanStack Form | Iguais às do npm | Iguais às do npm |
| Complexidade do TanStack Form | Média-alta | Alta |
| Limitação do Formik | Mais código para ligar os campos; atualizações espaçadas | "Performance inferior com muitos campos" (não encontrei fonte que confirme) |

Os dois usaram o asterisco para marcar o que não tinham certeza, como o prompt pediu, mas o Gemini errou justamente num valor que marcou.

**Prompt 3 (NotebookLM, só com as fontes oficiais):** acertou a parte do Zod. Explicou que o `path: ["manga"]` põe o erro no campo manga e que o `when` faz a regra rodar mesmo com outros campos inválidos. Mas o exemplo de integração foi escrito para a web (ver abaixo).

### Observação sobre o agente

No teste do MCP, a busca de documentação do Expo não encontrou as páginas do react-hook-form e do zod, porque ela indexa só a documentação do Expo. O agente contornou isso lendo a versão `.md` da página do react-hook-form com a ferramenta de leitura do Expo.

## Fontes oficiais lidas

Marque só as que você abriu e leu.

- [X] React Hook Form, useForm (https://react-hook-form.com/docs/useform)
- [X] React Hook Form, useController (https://react-hook-form.com/docs/usecontroller)
- [X] React Hook Form, Controller, com exemplo em React Native (https://react-hook-form.com/docs/usecontroller/controller)
- [X] React Hook Form, trigger (https://react-hook-form.com/docs/useform/trigger)
- [X] React Hook Form Resolvers, seção do Zod (https://github.com/react-hook-form/resolvers)
- [X] Zod, documentação (https://zod.dev)
- [X] Zod, API: refinements, `path` e `when` (https://zod.dev/api)
- [X] Zod 4, guia de migração (https://zod.dev/v4/changelog)
- [X] TanStack Form, uso com React Native (https://tanstack.com/form/latest/docs/framework/react/guides/react-native)
- [X] React Native, TextInput (https://reactnative.dev/docs/textinput)
- [X] React Native, Pressable (https://reactnative.dev/docs/pressable)
- [X] Expo, usando bibliotecas e `npx expo install` (https://docs.expo.dev/workflow/using-libraries)
- [X] Expo, servidor MCP (https://docs.expo.dev/eas/ai/mcp)
- [X] npm, formik (https://www.npmjs.com/package/formik)
- [X] npm, zod (https://www.npmjs.com/package/zod)

## Onde a IA errou

### 1. Gemini: versão do Zod desatualizada

- Pedido: comparar react-hook-form + zod, Formik + Yup e TanStack Form numa tabela com a versão atual de cada um (Prompt 2, no Gemini).
- O que veio: "Zod: 3.24.x (ou v4 em estágio inicial)".
- Como percebi: o ChatGPT, com o mesmo prompt, respondeu 4.6.7. Conferi no npm e na documentação do Zod.
- O certo: o Zod 4 já é estável (aviso no topo de https://zod.dev) e a versão atual é a 4.6.7, de 12/10/2026 (https://www.npmjs.com/package/zod). Isso importa porque a API mudou do 3 para o 4: um código escrito para o Zod 3 usa nomes que o 4 não aceita mais, como `required_error`.

### 2. NotebookLM: exemplo de formulário web num projeto React Native

- Pedido: como mostrar o erro de uma regra entre dois campos (manga e categoria) embaixo do campo manga, junto com os outros erros (Prompt 3, no NotebookLM, com as páginas oficiais como fontes).
- O que veio: a explicação do Zod estava certa, mas o exemplo de integração usou `register` com `<form>`, `<input>` e `<select>`.
- Como percebi: esses elementos são do HTML e não existem no React Native. A própria página do Controller, que estava entre as fontes, mostra que no React Native o campo é ligado com `Controller` e `onChangeText`.
- O certo: no React Native, cada campo é ligado ao formulário com `Controller` ou `useController` (https://react-hook-form.com/docs/usecontroller/controller), e o envio é um `Pressable` que chama `handleSubmit`.

### 3. Copilot: listas de opções inventadas

- Pedido: implementar a prova de conceito descrita no AGENTS.md (Copilot em modo Agent).
- O que veio: o formulário funcionou, mas com listas inventadas: categorias como Regata, Bermuda e Sandália, que o ZYRA não tem; só 5 materiais, incluindo "Sintético"; aquecimento "Alto" no lugar de "quente"; ocasiões "Esporte" e "Passeio"; e uma opção "Não se aplica" em manga e cano.
- Como percebi: testando no celular e comparando com as listas do /analyze-clothing do ZYRA.
- O certo: as listas do ZYRA (tipo Peca em src/services/pecasApi.ts). O AGENTS.md dizia "dentro das listas" sem trazê-las, e a IA completou a lacuna inventando valores plausíveis em vez de perguntar.


## Resultado e próximos passos no TCC

- [Preencha depois de testar no celular. Exemplo do que pode entrar: a prova de conceito mostrou que o schema zod consegue barrar os erros típicos da IA (valor fora da lista, campo que não se aplica, campo vazio) e mostrar todos de uma vez, e que o react-hook-form só entrega os dados ao salvar quando tudo passa.]
- [O que muda no ZYRA: por exemplo, levar o `pecaSchema` para a tela de cadastro real, validar a resposta do /analyze-clothing com o mesmo schema e reaproveitar o tipo `PecaValidada` no `pecasApi.ts`.]
- Ideia vinda do ChatGPT, a avaliar: além de validar, marcar quais campos a pessoa confirmou, e repetir a validação no back antes de gravar.
