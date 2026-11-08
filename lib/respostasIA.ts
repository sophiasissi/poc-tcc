import type { PieceFormValues } from './peca';

export const respostasIA: Record<'correta' | 'comErros', PieceFormValues> = {
  correta: {
    categoria: 'camiseta',
    material: 'malha',
    manga: 'curta',
    cano: '',
    aquecimento: 'leve',
    ocasioes: ['dia a dia', 'casa'],
    cor: 'azul',
  },
  comErros: {
    categoria: 'bota',
    material: 'algodão',
    manga: 'curta',
    cano: '',
    aquecimento: 'leve',
    ocasioes: [],
    cor: '',
  },
};
