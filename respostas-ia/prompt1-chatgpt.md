# Prompt 1 (mapa do tema): resposta do ChatGPT

Data: 08/11/2026. Ferramenta: ChatGPT, com busca na web. Prompt: o "Prompt 1 · Mapa do tema" do guia.

---

Para o ZYRA, existem quatro abordagens principais. Minha recomendação inicial seria React Hook Form + Zod, porque combina bem com React Native, TypeScript e um formulário com vários atributos que precisam ser revisados.

Antes de comparar, vale separar duas responsabilidades:

- Biblioteca de formulários: controla os valores dos campos, alterações, campos preenchidos, erros e envio.
- Biblioteca de validação: define quais valores são permitidos, quais campos são obrigatórios e quais regras precisam ser respeitadas.

Você pode combinar uma biblioteca de cada categoria.

## 1. Alternativas de gerenciamento do formulário

| Alternativa                                    | Quando é a melhor escolha e quando não é                                                                                                                                                                                                                                | Documentação oficial                                                                                                                                                                                                                                   |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| React Hook Form                                | Melhor quando você quer controlar vários campos, erros e submissões com uma solução eficiente e boa integração com componentes controlados do React Native; não é tão interessante se o formulário for extremamente simples e não justificar uma dependência adicional. | [useForm](https://react-hook-form.com/docs/useform?utm_source=chatgpt.com) e [Controller](https://react-hook-form.com/docs/usecontroller/controller?utm_source=chatgpt.com)                                                                            |
| TanStack Form                                  | Melhor quando você precisa de validações complexas, dependências entre campos e controle detalhado de cada atributo com TypeScript; não é a opção mais simples para quem quer começar rapidamente com uma biblioteca de formulários.                                    | [Uso com React Native](https://tanstack.com/form/latest/docs/framework/react/guides/react-native?utm_source=chatgpt.com) e [Form and Field Validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation?utm_source=chatgpt.com) |
| Formik                                         | Melhor quando a equipe já conhece Formik ou quer uma solução tradicional que também funciona com React Native; não seria minha primeira escolha para um projeto novo que busca uma integração mais enxuta com componentes controlados.                                  | [React Native](https://formik.org/docs/guides/react-native?utm_source=chatgpt.com) e [Validation](https://formik.org/docs/guides/validation?utm_source=chatgpt.com)                                                                                    |
| React useState (sem biblioteca de formulários) | Melhor para um formulário pequeno e simples, no qual você deseja controlar manualmente cada valor e validação; não é indicado quando existem muitos campos, regras condicionais, estados de revisão e mensagens de erro.                                                | [React useState](https://react.dev/reference/react/useState?utm_source=chatgpt.com) e [React Native TextInput](https://reactnative.dev/docs/textinput.html?utm_source=chatgpt.com)                                                                     |

Algumas diferenças importantes:

- O React Hook Form possui o `Controller`, que facilita a integração com componentes controlados, como seletores, botões de opções e componentes personalizados no React Native.
- O TanStack Form é headless: ele cuida do estado e da validação, mas você constrói a interface com os componentes que preferir. Sua documentação tem uma seção específica para React Native.
- O Formik também possui compatibilidade documentada com React Native, mas utiliza algumas particularidades de integração, como `onChangeText`, `onBlur` e `onPress` no lugar dos eventos de formulários HTML.

## 2. Alternativas de bibliotecas de validação

Essas bibliotecas podem ser utilizadas em conjunto com as soluções anteriores.

| Biblioteca | Quando é a melhor escolha e quando não é                                                                                                                                                                                                           | Documentação oficial                                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zod        | Melhor quando você quer definir regras de validação com inferência automática de tipos TypeScript e validar objetos completos; não é necessário utilizá-lo se o projeto já possui outra biblioteca de validação que atende às mesmas necessidades. | [Basic Usage](https://zod.dev/basics?utm_source=chatgpt.com) e [Defining Schemas](https://zod.dev/api?utm_source=chatgpt.com)                                 |
| Yup        | Melhor quando você utiliza Formik e deseja validações baseadas em esquemas, inclusive regras assíncronas e dependentes de outros campos; não seria minha primeira escolha se você já decidiu padronizar o projeto com Zod.                         | [Yup – Documentação oficial](https://github.com/jquense/yup/blob/master/README.md?utm_source=chatgpt.com)                                                     |
| Valibot    | Melhor quando você deseja validação com TypeScript, arquitetura modular e menor impacto no tamanho do bundle; não é necessário trocar Zod por Valibot se o tamanho do bundle não for uma preocupação para o projeto.                               | [Introduction](https://valibot.dev/guides/introduction/?utm_source=chatgpt.com) e [Parse Data](https://valibot.dev/guides/parse-data/?utm_source=chatgpt.com) |

### O que cada uma permite validar?

No caso do ZYRA, essas bibliotecas permitem estabelecer regras como:

- Categoria: aceitar somente categorias previamente cadastradas.
- Material: aceitar somente os materiais permitidos.
- Manga e cano: validar opções específicas para cada atributo.
- Aquecimento: aceitar somente os níveis definidos pelo projeto.
- Ocasiões: exigir pelo menos uma ocasião válida, quando esse campo for obrigatório.
- Cor: aceitar somente valores pertencentes ao catálogo de cores do ZYRA.

Também permitem implementar regras condicionais. Por exemplo, determinados atributos podem ser obrigatórios somente para algumas categorias de roupa.

Um detalhe importante: o Zod oferece `strictObject`, que permite rejeitar propriedades inesperadas no objeto, em vez de simplesmente ignorá-las. Ele também permite gerar os tipos TypeScript a partir do próprio esquema.

## 3. Como eu resolveria especificamente o problema do ZYRA

Existe uma particularidade que merece atenção: um campo pode estar válido sem ter sido revisado pela pessoa.

Imagine que a IA identifique uma camiseta como:

| Atributo    | Sugestão da IA | Situação     |
| ----------- | -------------- | ------------ |
| Categoria   | Camiseta       | Não revisado |
| Material    | Algodão        | Não revisado |
| Manga       | Curta          | Não revisado |
| Cano        | Não se aplica  | Não revisado |
| Aquecimento | Baixo          | Não revisado |
| Ocasiões    | Casual         | Não revisado |
| Cor         | Azul           | Não revisado |

Todos os valores podem estar dentro das opções permitidas, mas isso não significa que estejam corretos para aquela peça.

Por isso, eu separaria o processo em quatro etapas:

1. Receber os dados da IA

   Os atributos são preenchidos inicialmente com as sugestões da IA, sem serem considerados revisados.
2. Permitir revisão e correção

   A pessoa consegue confirmar ou alterar cada atributo utilizando as opções disponíveis.
3. Validar os dados

   A aplicação verifica se todos os valores respeitam as regras, os tipos, as opções permitidas e as condições entre campos.
4. Liberar o salvamento

   O cadastro só é permitido quando todos os campos exigidos foram revisados e os dados passaram pela validação.

Uma decisão de implementação especialmente importante é manter dois controles independentes:

1\. Estado de revisão: indica se a pessoa confirmou aquele atributo. A IA não pode marcar esse estado automaticamente.

2\. Estado de validação: indica se o valor selecionado é permitido e atende às regras do sistema.

Assim, mesmo que a IA tenha preenchido todos os campos corretamente do ponto de vista técnico, o aplicativo ainda exige a confirmação da pessoa.

Também recomendo que a validação final aconteça imediatamente antes de persistir os dados e, caso exista backend, seja repetida no servidor. A validação apenas no aplicativo não garante que uma requisição externa ou modificada não grave informações inválidas.

## 4. Minha recomendação para o TCC

Minha escolha recomendada

# React Hook Form + Zod

React Native + Expo + TypeScript

Essa combinação atende às necessidades do ZYRA sem exigir que vocês construam manualmente toda a estrutura de controle do formulário.

| Responsabilidade           | Tecnologia                                  |
| -------------------------- | ------------------------------------------- |
| Estado dos campos          | React Hook Form                             |
| Integração dos componentes | Controller                                  |
| Regras de validação        | Zod                                         |
| Tipagem TypeScript         | Inferência do Zod                           |
| Bloqueio de envio          | Validação do formulário + estado de revisão |
| Interface                  | Componentes React Native                    |

Ordem de leitura recomendada:

1. [React Hook Form – useForm](https://react-hook-form.com/docs/useform?utm_source=chatgpt.com).
2. [React Hook Form – Controller](https://react-hook-form.com/docs/usecontroller/controller?utm_source=chatgpt.com).
3. [React Hook Form – Resolvers](https://github.com/react-hook-form/resolvers?utm_source=chatgpt.com).
4. [Zod – Basic Usage](https://zod.dev/basics?utm_source=chatgpt.com).
5. [Zod – Defining Schemas](https://zod.dev/api?utm_source=chatgpt.com).

Uma observação sobre a acessibilidade: como o ZYRA é voltado a pessoas com daltonismo, recomendo que os seletores de cores apresentem nomes textuais e identificações visuais complementares, sem depender exclusivamente da cor exibida na tela.

Minha escolha seria começar estudando React Hook Form e Zod, sem implementar ainda. Eles oferecem uma boa base para construir o fluxo de revisão, correção, validação e salvamento das peças.