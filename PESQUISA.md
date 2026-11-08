# Diário de pesquisa

## Contexto do TCC

O ZYRA é um app mobile que ajuda pessoas com daltonismo a se vestir: identifica a cor da roupa pela câmera, mostrando o nome e o símbolo ColorADD, guarda as peças num closet virtual e sugere looks com um assistente de IA que só usa as roupas da própria pessoa. No cadastro de peça, uma IA (gpt-4.1-mini, rota /analyze-clothing) preenche sozinha categoria, material, manga, cano, aquecimento, ocasiões e cor.

## Pergunta de pesquisa

Como o react-hook-form com zod permite que a pessoa revise e corrija os campos de uma peça preenchidos automaticamente pela IA do ZYRA antes de salvar, na condição de que a IA pode mandar valores fora da lista, campos que não se aplicam à categoria ou campos obrigatórios vazios, sem que nada inválido chegue ao back?

## Alternativas consideradas

| Opção | Serve para | Funciona no Expo Go? | Decisão |
|---|---|---|---|
| `useState` + validação manual | Formulários de um ou dois campos | Sim, é só React | Não: as regras cruzadas (manga só em peça de cima, cano só em bota) virariam `if` espalhados pela tela, sem um lugar único para as regras nem um tipo TypeScript derivado delas. |
| Formik + Yup | Formulários controlados, muito usados em projetos antigos | Sim, só JavaScript [confirmar] | Não: [conferir no npm a data da última versão do formik]; o Yup gera tipos, mas o zod já é o padrão nos exemplos atuais do react-hook-form. |
| TanStack Form | Formulários com tipagem forte; tem guia de uso com React Native | Sim, só JavaScript [confirmar] | Não: biblioteca mais nova, com menos exemplos de React Native; meu amigo de grupo já usa o TanStack Query, mas a semelhança é só no nome. |
| react-hook-form + zod (`@hookform/resolvers`) | Formulários com regras declaradas em um schema e mensagens por campo | Sim, só JavaScript [confirmar] | **Sim**: o `useController` liga `TextInput` e componentes próprios ao formulário; o schema zod é o lugar único das regras, gera o tipo da peça validada e o `.refine` com `path` coloca o erro de uma regra cruzada no campo certo. |

## Fontes oficiais lidas

Marque só as que você abriu e leu.

- [ ] React Hook Form, useForm (https://react-hook-form.com/docs/useform)
- [ ] React Hook Form, useController (https://react-hook-form.com/docs/usecontroller)
- [ ] React Hook Form, Controller, com exemplo em React Native (https://react-hook-form.com/docs/usecontroller/controller)
- [ ] React Hook Form, trigger (https://react-hook-form.com/docs/useform/trigger)
- [ ] React Hook Form Resolvers, seção do Zod (https://github.com/react-hook-form/resolvers)
- [ ] Zod, documentação (https://zod.dev)
- [ ] Zod, API: refinements, `path` e `when` (https://zod.dev/api)
- [ ] Zod 4, guia de migração (https://zod.dev/v4/changelog)
- [ ] TanStack Form, uso com React Native (https://tanstack.com/form/latest/docs/framework/react/guides/react-native)
- [ ] React Native, TextInput (https://reactnative.dev/docs/textinput)
- [ ] React Native, Pressable (https://reactnative.dev/docs/pressable)
- [ ] Expo, usando bibliotecas e `npx expo install` (https://docs.expo.dev/workflow/using-libraries)
- [ ] Expo, servidor MCP (https://docs.expo.dev/eas/ai/mcp)

## Onde a IA errou

Preencha com o que aconteceu de verdade com você. Copie o bloco para cada erro.

- Pedido: [o que foi pedido, e para qual ferramenta: Copilot, ChatGPT, Gemini...]
- O que veio: [a resposta errada]
- Como percebi: [erro de compilação, documentação, teste no aparelho]
- O certo: [o que a documentação confirma, com o link]

## Resultado e próximos passos no TCC

- [Preencha depois de testar no celular. Exemplo do que pode entrar: a prova de conceito mostrou que o schema zod consegue barrar os erros típicos da IA (valor fora da lista, campo que não se aplica, campo vazio) e mostrar todos de uma vez, e que o react-hook-form só entrega os dados ao salvar quando tudo passa.]
- [O que muda no ZYRA: por exemplo, levar o `pecaSchema` para a tela de cadastro real, validar a resposta do /analyze-clothing com o mesmo schema e reaproveitar o tipo `PecaValidada` no `pecasApi.ts`.]
