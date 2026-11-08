# Prompt 1 (mapa do tema): resposta do Gemini

Data: 08/11/2026. Ferramenta: Gemini. Prompt: o "Prompt 1 · Mapa do tema" do guia.

---

Parabéns pelo tema do seu TCC, o ZYRA tem uma proposta excelente e de grande impacto em termos de acessibilidade!

Para lidar com a revisão e validação dos campos preenchidos pela IA em um app React Native com Expo e TypeScript, existem três principais abordagens estruturais no ecossistema atual.

## 1. React Hook Form + Zod (Validação por Schema)

- **Quando é a melhor escolha / Quando não é:** É a melhor escolha quando você busca alta performance, controle estrito de tipos com TypeScript e validações complexas baseadas em regras de negócio, mas não é ideal se você deseja uma curva de aprendizado zero para formulários extremamente simples e triviais.
- **Documentação oficial:** [React Hook Form](https://react-hook-form.com/) e [Zod](https://zod.dev/)

## 2. Formik + Yup (Abordagem Baseada em Componentes)

- **Quando é a melhor escolha / Quando não é:** É a melhor escolha se você prefere uma API orientada a objetos/componentes bem estabelecida na comunidade para gerenciar o estado global de formulários extensos, mas não é a mais recomendada hoje em dia devido ao ecossistema estar menos ativo em performance e atualizações se comparado ao React Hook Form.
- **Documentação oficial:** [Formik](https://formik.org/) e [Yup](https://github.com/jquense/yup)

## 3. Estado Nativo do React (`useState` / `useReducer`) + Validação Manual

- **Quando é a melhor escolha / Quando não é:** É a melhor escolha para protótipos rápidos ou formulários altamente customizados onde você quer evitar dependências de terceiros, mas torna-se inviável e gera código repetitivo (boilerplate) conforme o número de campos e regras de validação da peça de roupa aumenta.
- **Documentação oficial:** [React useState Hook](https://react.dev/reference/react/useState)
