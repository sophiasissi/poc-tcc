import { z } from 'zod';

// Códigos da taxonomia de peças: os mesmos dos enums do Prisma no back e do
// taxonomy.py da visão.
export type Categoria =
  | 'CAMISETA'
  | 'CAMISA'
  | 'BLUSA'
  | 'CROPPED'
  | 'TOP'
  | 'BODY'
  | 'CORSET'
  | 'MOLETOM'
  | 'JAQUETA'
  | 'BLAZER'
  | 'COLETE'
  | 'CALCA'
  | 'SHORT'
  | 'SAIA'
  | 'VESTIDO'
  | 'TENIS'
  | 'SAPATO'
  | 'BOTA'
  | 'SANDALIA'
  | 'CHINELO';
export type Estilo =
  | 'CASUAL'
  | 'SOCIAL'
  | 'ESPORTIVO'
  | 'STREETWEAR'
  | 'ELEGANTE'
  | 'BASICO';
export type Estampa = 'LISO' | 'ESTAMPADO' | 'LISTRADO' | 'XADREZ' | 'LOGO';
export type Ocasiao =
  | 'DIA_A_DIA'
  | 'TRABALHO'
  | 'FESTA'
  | 'ACADEMIA'
  | 'PRAIA'
  | 'CASA';
export type Aquecimento = 'LEVE' | 'MEDIO' | 'QUENTE';
export type Material =
  | 'JEANS'
  | 'COURO'
  | 'MOLETOM'
  | 'MALHA'
  | 'POLIAMIDA'
  | 'TRICO'
  | 'SOFT'
  | 'LINHO'
  | 'ALFAIATARIA'
  | 'CETIM'
  | 'VISCOSE'
  | 'VELUDO';
export type Manga = 'SEM_MANGA' | 'CURTA' | 'LONGA';
/** Altura do cano, só na bota. */
export type Cano = 'CURTO' | 'MEDIO' | 'LONGO' | 'ACIMA_DO_JOELHO';

export type Peca = {
  categoria: Categoria;
  material: Material;
  manga: Manga;
  cano: Cano;
  aquecimento: Aquecimento;
  ocasioes: Ocasiao[];
  corNome: string;
};

/** Nome da categoria como aparece para a pessoa (e para o leitor de tela). */
export const CATEGORIA_LABEL: Record<Categoria, string> = {
  CAMISETA: 'camiseta',
  CAMISA: 'camisa',
  BLUSA: 'blusa',
  CROPPED: 'cropped',
  TOP: 'top',
  BODY: 'body',
  CORSET: 'corset',
  MOLETOM: 'moletom',
  JAQUETA: 'jaqueta',
  BLAZER: 'blazer',
  COLETE: 'colete',
  CALCA: 'calça',
  SHORT: 'short',
  SAIA: 'saia',
  VESTIDO: 'vestido',
  TENIS: 'tênis',
  SAPATO: 'sapato',
  BOTA: 'bota',
  SANDALIA: 'sandália',
  CHINELO: 'chinelo',
};

export const MATERIAL_LABEL: Record<Material, string> = {
  JEANS: 'jeans',
  COURO: 'couro',
  MOLETOM: 'moletom',
  MALHA: 'malha',
  POLIAMIDA: 'poliamida',
  TRICO: 'tricô',
  SOFT: 'soft',
  LINHO: 'linho',
  ALFAIATARIA: 'alfaiataria',
  CETIM: 'cetim',
  VISCOSE: 'viscose',
  VELUDO: 'veludo',
};

export const CATEGORIAS = [
  'CAMISETA',
  'CAMISA',
  'BLUSA',
  'CROPPED',
  'TOP',
  'BODY',
  'CORSET',
  'MOLETOM',
  'JAQUETA',
  'BLAZER',
  'COLETE',
  'CALCA',
  'SHORT',
  'SAIA',
  'VESTIDO',
  'TENIS',
  'SAPATO',
  'BOTA',
  'SANDALIA',
  'CHINELO',
] as const satisfies readonly Categoria[];

export const MATERIAIS = [
  'JEANS',
  'COURO',
  'MOLETOM',
  'MALHA',
  'POLIAMIDA',
  'TRICO',
  'SOFT',
  'LINHO',
  'ALFAIATARIA',
  'CETIM',
  'VISCOSE',
  'VELUDO',
] as const satisfies readonly Material[];

export const MANGAS = ['SEM_MANGA', 'CURTA', 'LONGA'] as const satisfies readonly Manga[];
export const CANOS = [
  'CURTO',
  'MEDIO',
  'LONGO',
  'ACIMA_DO_JOELHO',
] as const satisfies readonly Cano[];
export const AQUECIMENTOS = [
  'LEVE',
  'MEDIO',
  'QUENTE',
] as const satisfies readonly Aquecimento[];
export const OCASIOES = [
  'DIA_A_DIA',
  'TRABALHO',
  'FESTA',
  'ACADEMIA',
  'PRAIA',
  'CASA',
] as const satisfies readonly Ocasiao[];

// Mesma regra do back (src/looks/nome-da-peca.ts): nas peças de baixo o
// tecido entra no nome ("calça jeans", "calça de moletom"); nas outras, só
// jeans e couro. Manga curta é o comum e não aparece; o top nunca tem manga.
const MATERIAL_SEMPRE_NO_NOME: Categoria[] = ['CALCA', 'SHORT', 'SAIA'];
const MATERIAL_SEMPRE_NA_PECA: Material[] = ['JEANS', 'COURO'];
// Jaqueta de tecido macio é casaco ("casaco de moletom"); jeans e couro
// continuam jaqueta.
const MATERIAIS_DE_CASACO: Material[] = [
  'MOLETOM',
  'TRICO',
  'SOFT',
  'MALHA',
  'VELUDO',
];
const COM_MANGA_NO_NOME: Categoria[] = [
  'CAMISETA',
  'CAMISA',
  'BLUSA',
  'CROPPED',
  'BODY',
  'VESTIDO',
];

// Mesma regra do back: é o cano que diferencia uma bota da outra.
export const CANO_LABEL: Record<Cano, string> = {
  CURTO: 'cano curto',
  MEDIO: 'cano médio',
  LONGO: 'cano longo',
  ACIMA_DO_JOELHO: 'over the knee',
};

function comMaterial(nome: string, material: Material) {
  return material === 'JEANS'
    ? `${nome} jeans`
    : `${nome} de ${MATERIAL_LABEL[material]}`;
}

/**
 * Nome da peça como a pessoa diria: "calça jeans", "calça de moletom",
 * "camiseta manga longa", "regata", "body manga longa", "casaco de moletom".
 */
export function nomeDaPeca(
  peca: Pick<Peca, 'categoria'> &
    Partial<Pick<Peca, 'material' | 'manga' | 'cano'>>,
) {
  const { categoria, material, manga, cano } = peca;

  if (categoria === 'CAMISETA' && manga === 'SEM_MANGA') {
    return material && MATERIAL_SEMPRE_NA_PECA.includes(material)
      ? comMaterial('regata', material)
      : 'regata';
  }

  if (
    categoria === 'JAQUETA' &&
    material &&
    MATERIAIS_DE_CASACO.includes(material)
  ) {
    return comMaterial('casaco', material);
  }

  let nome = CATEGORIA_LABEL[categoria];
  if (categoria === 'BOTA' && cano) nome += ` ${CANO_LABEL[cano]}`;

  const materialNoNome =
    material &&
    // "Moletom de moletom" não diz nada.
    !(categoria === 'MOLETOM' && material === 'MOLETOM') &&
    (MATERIAL_SEMPRE_NO_NOME.includes(categoria) ||
      MATERIAL_SEMPRE_NA_PECA.includes(material));
  if (materialNoNome) nome = comMaterial(nome, material);

  if (COM_MANGA_NO_NOME.includes(categoria)) {
    if (manga === 'LONGA') nome += ' manga longa';
    if (manga === 'SEM_MANGA') nome += ' sem manga';
  }

  return nome;
}

const CATEGORIAS_COM_MANGA: Categoria[] = [
  'CAMISETA',
  'BLUSA',
  'CAMISA',
  'MOLETOM',
  'JAQUETA',
  'BLAZER',
  'COLETE',
  'CORSET',
  'CROPPED',
  'TOP',
  'BODY',
  'VESTIDO',
];

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
    corNome: z.string().transform((valor) => valor.trim()),
  })
  .superRefine((peca, context) => {
    const adicionarErro = (campo: string, mensagem: string) => {
      context.addIssue({
        code: 'custom',
        path: [campo],
        message: mensagem,
      });
    };
    const mensagemValorInvalido = (valor: string, escolha: string) =>
      `A IA sugeriu "${valor}", que não está na lista. Escolha ${escolha}.`;

    if (!estaNaLista(peca.categoria, CATEGORIAS)) {
      adicionarErro(
        'categoria',
        mensagemValorInvalido(peca.categoria, 'uma categoria'),
      );
    }

    if (!estaNaLista(peca.material, MATERIAIS)) {
      adicionarErro(
        'material',
        peca.material
          ? mensagemValorInvalido(peca.material, 'um material')
          : 'Selecione o material.',
      );
    }

    if (!estaNaLista(peca.aquecimento, AQUECIMENTOS)) {
      adicionarErro(
        'aquecimento',
        peca.aquecimento
          ? mensagemValorInvalido(
              peca.aquecimento,
              'um nível de aquecimento',
            )
          : 'Selecione o aquecimento.',
      );
    }

    if (precisaDeManga(peca.categoria)) {
      if (!peca.manga) {
        adicionarErro('manga', 'Selecione o comprimento da manga.');
      } else if (!estaNaLista(peca.manga, MANGAS)) {
        adicionarErro(
          'manga',
          mensagemValorInvalido(peca.manga, 'uma opção de manga'),
        );
      }
    } else if (peca.manga !== '') {
      adicionarErro('manga', estaNaLista(peca.manga, MANGAS)
        ? 'Manga não se aplica a esta categoria. Limpe a seleção.'
        : mensagemValorInvalido(peca.manga, 'uma opção de manga'));
    }

    if (peca.categoria === 'BOTA') {
      if (!peca.cano) {
        adicionarErro('cano', 'Selecione o comprimento do cano.');
      } else if (!estaNaLista(peca.cano, CANOS)) {
        adicionarErro(
          'cano',
          mensagemValorInvalido(peca.cano, 'uma opção de cano'),
        );
      }
    } else if (peca.cano !== '') {
      adicionarErro('cano', estaNaLista(peca.cano, CANOS)
        ? 'Cano só se aplica à bota. Limpe a seleção.'
        : mensagemValorInvalido(peca.cano, 'uma opção de cano'));
    }

    if (!aoMenosUmaOcasiaoSchema.safeParse(peca.ocasioes).success) {
      adicionarErro('ocasioes', 'Selecione ao menos uma ocasião.');
    } else {
      peca.ocasioes.forEach((ocasiao) => {
        if (!estaNaLista(ocasiao, OCASIOES)) {
          adicionarErro(
            'ocasioes',
            mensagemValorInvalido(ocasiao, 'uma ocasião'),
          );
        }
      });
    }

    if (!corValidaSchema.safeParse(peca.corNome).success) {
      adicionarErro('corNome', 'Informe o nome da cor com pelo menos 3 letras.');
    }
  });

export type PieceFormValues = z.input<typeof pecaSchema>;
export type ValidatedPiece = z.output<typeof pecaSchema>;
