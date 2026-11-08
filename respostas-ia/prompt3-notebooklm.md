# Prompt 3: resposta do NotebookLM

Data: 08/11/2026. Fontes do caderno: páginas da documentação oficial.

---

Para resolver ambos os problemas ao criar uma validação condicional entre dois campos (como a dependência entre `categoria` e `manga`) utilizando **Zod** e **React Hook Form**, você deve configurar o caminho do erro e controlar o momento em que o refinamento é executado.

---

### 1. Mostrar o erro embaixo do campo `manga`
Por padrão, validações dependentes feitas no nível de objeto via `.refine()` atribuem o erro à raiz do formulário. Para direcionar a mensagem diretamente para o campo `manga` (permitindo que ela seja exibida em `errors.manga` no seu formulário), **utilize a opção `path: ["manga"]` no objeto de configuração do `.refine()`**.

---

### 2. Fazer o erro aparecer junto aos outros campos (sem esperar que eles sejam corrigidos)
No Zod, por padrão, refinamentos em objetos não são executados se houver erros em outros campos do formulário. 

Para permitir que a validação condicional execute simultaneamente com as validações dos outros campos, **utilize o parâmetro `when`**. O `when` permite definir que o refinamento deve rodar assim que os campos envolvidos diretamente na regra (neste caso, `categoria` e `manga`) forem válidos isoladamente, ignorando erros presentes em outros campos não relacionados.

---

### Exemplo prático de implementação

```typescript
import * as z from "zod";

// 1. Defina o schema base dos campos
const baseSchema = z.object({
  nome: z.string().min(1, { error: "O nome é obrigatório" }),
  categoria: z.enum(["cima", "baixo"]),
  manga: z.string().optional(),
});

// 2. Aplique o refinamento condicional com `path` e `when`
export const produtoSchema = baseSchema.refine(
  (data) => {
    // Se a categoria for "cima", o campo manga passa a ser obrigatório
    if (data.categoria === "cima") {
      return Boolean(data.manga && data.manga.trim().length > 0);
    }
    return true;
  },
  {
    error: "A manga é obrigatória quando a categoria for uma peça de cima",
    path: ["manga"], // Vincula a mensagem de erro diretamente ao campo manga
    when(payload) {
      // Executa o refinamento se apenas os campos 'categoria' e 'manga' estiverem válidos,
      // permitindo que o erro apareça junto aos erros de outros campos (como 'nome')
      return baseSchema
        .pick({ categoria: true, manga: true })
        .safeParse(payload.value).success;
    },
  }
);
```

### Como integrar com o React Hook Form
Ao passar este schema para o `zodResolver` no `useForm`, o erro estará disponível em `errors.manga?.message` juntamente com as mensagens dos demais campos do formulário:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(produtoSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* Campo Nome */}
      <input {...register("nome")} placeholder="Nome do produto" />
      {errors.nome && <p>{errors.nome.message}</p>}

      {/* Campo Categoria */}
      <select {...register("categoria")}>
        <option value="baixo">Peça de baixo</option>
        <option value="cima">Peça de cima</option>
      </select>

      {/* Campo Manga */}
      <input {...register("manga")} placeholder="Tipo de manga" />
      {/* O erro da regra condicional aparecerá aqui */}
      {errors.manga && <p>{errors.manga.message}</p>}

      <button type="submit">Salvar</button>
    </form>
  );
};
```
