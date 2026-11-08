import { z } from 'zod';

export const CATEGORIAS = [
  'camiseta',
  'regata',
  'blusa',
  'camisa',
  'casaco',
  'jaqueta',
  'calça',
  'bermuda',
  'saia',
  'vestido',
  'body',
  'bota',
  'sapato',
  'sandália',
] as const;

export const MATERIAIS = [
  'malha',
  'jeans',
  'couro',
  'linho',
  'sintético',
] as const;

export const MANGAS = ['curta', 'longa', 'sem manga'] as const;
export const CANOS = ['curto', 'médio', 'longo'] as const;
export const AQUECIMENTOS = ['leve', 'médio', 'alto'] as const;
export const OCASIOES = [
  'dia a dia',
  'casa',
  'trabalho',
  'festa',
  'esporte',
  'passeio',
] as const;

const CATEGORIAS_COM_MANGA = [
  'camiseta',
  'regata',
  'blusa',
  'camisa',
  'casaco',
  'jaqueta',
  'vestido',
  'body',
] as const;

const estaNaLista = <T extends readonly [string, ...string[]]>(
  valor: string,
  opcoes: T,
) => z.enum(opcoes).safeParse(valor).success;

const corValidaSchema = z.string().trim().min(3);
const aoMenosUmaOcasiaoSchema = z.array(z.string()).min(1);

export const precisaDeManga = (categoria: string) =>
  CATEGORIAS_COM_MANGA.some((opcao) => opcao === categoria);

export const pecaSchema = z
  .object({
    categoria: z.string(),
    material: z.string(),
    manga: z.string(),
    cano: z.string(),
    aquecimento: z.string(),
    ocasioes: z.array(z.string()),
    cor: z.string().transform((valor) => valor.trim()),
  })
  .superRefine((peca, context) => {
    const adicionarErro = (campo: string, mensagem: string) => {
      context.addIssue({
        code: 'custom',
        path: [campo],
        message: mensagem,
      });
    };

    if (!estaNaLista(peca.categoria, CATEGORIAS)) {
      adicionarErro('categoria', 'Selecione uma categoria válida.');
    }

    if (!estaNaLista(peca.material, MATERIAIS)) {
      adicionarErro(
        'material',
        peca.material ? 'Escolha um material da lista.' : 'Selecione o material.',
      );
    }

    if (!estaNaLista(peca.aquecimento, AQUECIMENTOS)) {
      adicionarErro(
        'aquecimento',
        peca.aquecimento
          ? 'Escolha um nível de aquecimento da lista.'
          : 'Selecione o aquecimento.',
      );
    }

    if (precisaDeManga(peca.categoria)) {
      if (!peca.manga) {
        adicionarErro('manga', 'Selecione o comprimento da manga.');
      } else if (!estaNaLista(peca.manga, MANGAS)) {
        adicionarErro('manga', 'Escolha uma opção de manga da lista.');
      }
    } else if (peca.manga !== '') {
      adicionarErro(
        'manga',
        'Manga não se aplica a esta categoria. Limpe a seleção.',
      );
    }

    if (peca.categoria === 'bota') {
      if (!peca.cano) {
        adicionarErro('cano', 'Selecione o comprimento do cano.');
      } else if (!estaNaLista(peca.cano, CANOS)) {
        adicionarErro('cano', 'Escolha uma opção de cano da lista.');
      }
    } else if (peca.cano !== '') {
      adicionarErro('cano', 'Cano só se aplica à bota. Limpe a seleção.');
    }

    if (!aoMenosUmaOcasiaoSchema.safeParse(peca.ocasioes).success) {
      adicionarErro('ocasioes', 'Selecione ao menos uma ocasião.');
    } else {
      peca.ocasioes.forEach((ocasiao) => {
        if (!estaNaLista(ocasiao, OCASIOES)) {
          adicionarErro('ocasioes', 'Escolha ocasiões da lista.');
        }
      });
    }

    if (!corValidaSchema.safeParse(peca.cor).success) {
      adicionarErro('cor', 'Informe o nome da cor com pelo menos 3 letras.');
    }
  });

export type PieceFormValues = z.input<typeof pecaSchema>;
export type ValidatedPiece = z.output<typeof pecaSchema>;

export function criarNomePeca(
  peca: Pick<PieceFormValues, 'categoria' | 'material' | 'manga' | 'cano'>,
) {
  const categoria =
    peca.categoria.length > 0
      ? `${peca.categoria[0].toUpperCase()}${peca.categoria.slice(1)}`
      : 'Peça';
  const partes = [categoria];

  if (peca.material) {
    partes.push(`de ${peca.material}`);
  }

  if (precisaDeManga(peca.categoria) && peca.manga) {
    partes.push(`manga ${peca.manga}`);
  }

  if (peca.categoria === 'bota' && peca.cano) {
    partes.push(`cano ${peca.cano}`);
  }

  return partes.join(' ');
}
