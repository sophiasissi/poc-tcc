# Prompt 2: resposta do ChatGPT

Data: 08/11/2026.

---

Considerando as versões disponíveis em 8 de novembro de 2026, as três alternativas são compatíveis com React Native, Expo e TypeScript. A principal diferença está na facilidade de implementação, no controle dos campos e na flexibilidade das validações.
1. Comparação geral
| Critério | React Hook Form + Zod | Formik + Yup | TanStack Form |
|---|---|---|---|
| Funciona no Expo Go? | Sim  Não exige código nativo personalizado. | Sim  Não exige código nativo personalizado. | Sim  Não exige código nativo personalizado. |
| Suporte Android e iOS | Sim, ambos. Integração documentada com React Native. | Sim, ambos. Compatibilidade oficialmente documentada com React Native. | Sim, ambos. Possui documentação específica para React Native. |
| Complexidade de uso | Média. Integração relativamente simples, mas exige atenção aos componentes controlados do React Native. | Média. API tradicional e fácil de entender, mas pode exigir mais código para conectar os campos. | Média-alta. Bastante flexível, porém exige maior familiaridade com gerenciamento de estado e integração dos componentes. |
| Limitações conhecidas | Exige Controller para integrar componentes controlados, como seletores e componentes personalizados. Zod e o resolver são dependências adicionais. | Exige conectar manualmente os eventos dos componentes nativos. Não utiliza os elementos HTML tradicionais de formulário. Pode gerar mais código de integração. | É headless: não oferece componentes visuais prontos. Você precisa implementar a integração dos campos, mensagens de erro e controle de foco manualmente. |
| Versão atual | React Hook Form 7.91.0; Zod 4.6.7; @hookform/resolvers 7.0.3. | Formik 2.4.9; Yup 1.7.1. | '@tanstack/react-form 1.33.5. |
| Data da última versão | RHF: 23/10/2026*; Zod: 12/10/2026; Resolvers: 05/11/2026*. | Formik: 10/11/2025*; Yup: 21/09/2025. | 11/08/2026*. |


As três bibliotecas de formulários possuem integração com React Native, e a Expo permite utilizar bibliotecas que não exigem código nativo personalizado no Expo Go. Portanto, a compatibilidade indicada considera essas dependências isoladamente, não todas as bibliotecas instaladas no ZYRA. 
* O asterisco indica que a data exata foi confirmada por fontes secundárias ou metadados de publicação, e não por um histórico oficial completo de releases. As versões indicadas são as versões estáveis identificadas como atuais na consulta; versões beta e prerelease não foram consideradas.
2. Análise de cada alternativa para o ZYRA
React Hook Form + Zod
Minha recomendação
Pontos positivos:
- Boa integração com TypeScript.
- Permite definir um esquema de validação centralizado.
- Controla erros individualmente por campo.
- Permite validar o formulário inteiro antes do envio.
- Integra componentes personalizados do React Native com Controller.
- O Zod permite inferir tipos TypeScript diretamente dos esquemas.
Limitação importante: componentes como seletores de categoria, material, manga e ocasiões precisam ser conectados ao React Hook Form por meio do Controller, em vez de utilizar diretamente o mecanismo tradicional register dos formulários web. 
Documentação:
- React Hook Form – Controller
- Zod – documentação oficial
- @hookform/resolvers
Formik + Yup
Pontos positivos:
- API tradicional e relativamente simples de aprender.
- Gerenciamento de valores, campos tocados e erros.
- Integração direta com Yup para validações baseadas em esquemas.
- Permite validações síncronas, assíncronas e condicionais.
Limitação importante: a integração com React Native exige conectar manualmente eventos como onChangeText, onBlur e onPress. Além disso, a versão estável atual do Formik tem um intervalo considerável desde sua publicação, quando comparada às outras alternativas. 
Documentação:
- Formik – React Native
- Formik – Validation
- Yup – repositório oficial
TanStack Form
Pontos positivos:
- Forte suporte a TypeScript e inferência de tipos.
- Controle granular dos estados dos campos.
- Suporta validações síncronas e assíncronas.
- Permite validações individuais e do formulário completo.
- Aceita bibliotecas como Zod e Yup por meio do padrão Standard Schema.
Limitação importante: por ser headless, exige que vocês construam praticamente toda a integração visual e comportamental. Outro detalhe é que a validação via Standard Schema não aplica automaticamente valores transformados ao resultado do formulário; caso seja necessário transformar os dados, isso precisa ser tratado separadamente. 
Documentação:
- TanStack Form – React Native
- TanStack Form – Validation
- TanStack Form – Focus Management

3. Qual faz mais sentido para o fluxo de cadastro do ZYRA?
Considerando os sete atributos preenchidos pela IA, eu avaliaria assim:
| Necessidade do ZYRA | RHF + Zod | Formik + Yup | TanStack Form |
|---|---|---|---|
| Preencher campos com dados da IA | Muito bom | Muito bom | Muito bom |
| Permitir correção individual | Muito bom | Muito bom | Muito bom |
| Validar opções permitidas | Muito bom | Muito bom | Muito bom |
| Criar regras condicionais entre campos | Muito bom | Muito bom | Muito bom |
| Identificar campos ainda não revisados | Requer implementação própria | Requer implementação própria | Requer implementação própria |
| Bloquear salvamento com campos inválidos | Muito bom | Muito bom | Muito bom |
| Integração com componentes personalizados | Boa, via Controller | Boa, com integração manual | Boa, com integração manual |


Um detalhe fundamental: nenhuma das três soluções identifica se a IA acertou ou se a pessoa realmente conferiu um campo.

Para isso, o ZYRA precisará manter um estado de revisão independente da validação. Por exemplo, um campo pode ter um valor válido, mas continuar pendente de confirmação humana.
4. Veredito
Minha classificação para o contexto do TCC seria:
1. React Hook Form + Zod: melhor equilíbrio entre facilidade de implementação, tipagem, validação e integração com React Native.
2. TanStack Form: excelente alternativa técnica, principalmente se vocês precisarem de controle muito granular ou validações mais elaboradas.
3. Formik + Yup: solução funcional e consolidada, mas eu teria menos incentivo para adotá-la em um projeto novo, considerando a cadência de atualização do Formik.
Eu escolheria React Hook Form + Zod para o ZYRA. Os requisitos de vocês não parecem exigir a flexibilidade adicional do TanStack Form, enquanto o RHF oferece uma estrutura bastante adequada para controlar os sete campos e impedir o envio de dados inválidos.

Para o TCC, também é uma escolha interessante porque permite justificar separadamente a biblioteca de gerenciamento de formulários e a biblioteca responsável pelas regras de validação.
