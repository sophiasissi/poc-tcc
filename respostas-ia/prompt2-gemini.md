# Prompt 2: resposta do Gemini

Data: 08/11/2026.

---

Abaixo está a comparação detalhada entre as três soluções de formulários solicitadas para o contexto do seu TCC (ZYRA no React Native/Expo com TypeScript).

De acordo com a sua solicitação, qualquer informação que dependa de estimativa ou que possa sofrer oscilações rápidas no ecossistema técnico foi marcada com um asterisco (`*`).

| Critério | React Hook Form + Zod | Formik + Yup | TanStack Form |
| --- | --- | --- | --- |
| **Funciona no Expo Go** | Sim | Sim | Sim |
| **Suporte a Android e iOS** | Sim | Sim | Sim |
| **Complexidade de uso** | Média (exige entender gerenciamento de referências e sintaxe de schemas) | Baixa a Média (API intuitiva orientada a componentes, porém verbosa) | Alta (paradigma headless focado em controle total de estado, exige mais código boilerplate) |
| **Limitações conhecidas** | Validação síncrona/assíncrona complexa exige atenção extra com tipagens profundas do Zod | Manutenção da biblioteca principal desacelerada; performance inferior em formulários com muitos campos renderizados simultaneamente | Ecossistema mobile (React Native) menor se comparado ao React Hook Form, encontrando menos exemplos prontos na comunidade |
| **Versão atual** | RHF: `7.91.0` / Zod: `3.24.x`* (ou v4 em estágio inicial)* | Formik: `2.4.9` / Yup: `1.7.1` | `@tanstack/react-form`: `1.33.5` |
| **Data da última versão** | Outubro/Novembro de 2026* | Novembro de 2025 (Formik) / Setembro de 2025 (Yup)* | Agosto de 2026* |
