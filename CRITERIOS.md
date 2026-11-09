# Critérios de aceitação

- [X] Ao tocar em **IA: análise correta**, todos os campos aparecem preenchidos (categoria camiseta, material malha, manga curta, aquecimento leve, ocasiões dia a dia e casa, cor azul), o nome da peça mostra "camiseta" e nenhum campo fica em vermelho.
- [X] Ao tocar em **IA: análise com erros**, os cinco problemas aparecem de uma vez, cada um com sua mensagem embaixo do campo: material "ALGODAO" fora da lista, aparecendo como chip riscado, manga em uma bota, cano da bota vazio, nenhuma ocasião e cor vazia. O aviso no topo diz "5 campo(s) precisam de revisão".
- [X] Com o formulário ainda inválido, tocar em **Salvar peça** não mostra o objeto salvo e exibe "Não foi salvo: corrija os campos destacados em vermelho".
- [X] Ao corrigir cada campo tocando nas opções (ou digitando a cor), a mensagem daquele campo some na hora, sem precisar tocar em Salvar de novo.
- [X] Ao trocar a categoria de bota para calça, os campos Manga e Cano somem da tela sem deixar erro, e o nome da peça muda sozinho (ex.: de "bota cano longo" para "calça jeans", com Jeans marcado).
- [X] Com tudo corrigido, tocar em **Salvar peça** mostra o cartão verde "Peça validada, pronta para enviar ao back", com o nome da peça e os dados finais.

**Verificado em:** (X) aparelho físico ( ) emulador

**Resultado:** (X) passou ( ) reprovou
