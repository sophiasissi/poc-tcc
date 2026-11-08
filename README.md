# ZYRA · Prova de conceito: revisão do cadastro de peça com react-hook-form + zod

Pesquisa aplicada com IA, disciplina de Aplicativos Híbridos (React Native + Expo).

**Pergunta:** como o react-hook-form com zod permite que a pessoa revise e corrija os campos de uma peça preenchidos pela IA do ZYRA antes de salvar, mesmo quando a IA manda valores fora da lista, campos que não se aplicam à categoria ou campos obrigatórios vazios?

**Vídeo da apresentação:** [cole aqui o link do vídeo]

## O que a prova de conceito mostra

1. Dois botões simulam a resposta da IA: uma análise correta e uma com cinco erros.
2. O formulário é preenchido e validado na hora; cada problema aparece em vermelho embaixo do campo.
3. A pessoa corrige tocando nas opções, e a mensagem some assim que o campo fica válido.
4. Salvar só entrega os dados quando tudo passa no schema; o resultado aparece na tela.

## Como rodar

```bash
npm install
npx expo start
```

Leia o QR Code com o Expo Go (Android) ou com a câmera (iOS).

## Arquivos

- `App.tsx`: a tela da prova de conceito.
- `lib/peca.ts`: listas do ZYRA, schema zod e nome da peça calculado.
- `lib/respostasIA.ts`: respostas simuladas do /analyze-clothing.
- `components/ChoiceField.tsx` e `components/ColorField.tsx`: chips e campo de cor ligados ao formulário por `Controller`.
- `CRITERIOS.md`: critérios de aceitação, escritos antes da implementação.
- `PESQUISA.md`: diário de pesquisa, com fontes e erros da IA.
