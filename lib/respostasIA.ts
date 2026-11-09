import type { PieceFormValues } from './peca';

export const respostasIA: Record<'correta' | 'comErros', PieceFormValues> = {
  correta: {
    categoria: 'CAMISETA',
    material: 'MALHA',
    manga: 'CURTA',
    cano: '',
    aquecimento: 'LEVE',
    ocasioes: ['DIA_A_DIA', 'CASA'],
    corNome: 'azul',
  },
  comErros: {
    categoria: 'BOTA',
    material: 'ALGODAO',
    manga: 'CURTA',
    cano: '',
    aquecimento: 'LEVE',
    ocasioes: [],
    corNome: '',
  },
};
