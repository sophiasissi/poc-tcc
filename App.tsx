import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ChoiceField, type ChoiceOption } from './components/ChoiceField';
import { ColorField } from './components/ColorField';
import {
  AQUECIMENTOS,
  CANOS,
  CANO_LABEL,
  CATEGORIA_LABEL,
  CATEGORIAS,
  MATERIAL_LABEL,
  MATERIAIS,
  MANGAS,
  OCASIOES,
  nomeDaPeca,
  pecaSchema,
  precisaDeManga,
  type PieceFormValues,
  type ValidatedPiece,
} from './lib/peca';
import { respostasIA } from './lib/respostasIA';

const valoresIniciais: PieceFormValues = {
  categoria: '',
  material: '',
  manga: '',
  cano: '',
  aquecimento: '',
  ocasioes: [],
  corNome: '',
};

const rotuloDoCodigo = (value: string) =>
  value.toLowerCase().replaceAll('_', ' ');

const opcoesCategoria: ChoiceOption[] = CATEGORIAS.map((value) => ({
  value,
  label: CATEGORIA_LABEL[value],
}));
const opcoesMaterial: ChoiceOption[] = MATERIAIS.map((value) => ({
  value,
  label: MATERIAL_LABEL[value],
}));
const opcoesManga: ChoiceOption[] = MANGAS.map((value) => ({
  value,
  label: rotuloDoCodigo(value),
}));
const opcoesCano: ChoiceOption[] = CANOS.map((value) => ({
  value,
  label: CANO_LABEL[value],
}));
const opcoesAquecimento: ChoiceOption[] = AQUECIMENTOS.map((value) => ({
  value,
  label: rotuloDoCodigo(value).replace('medio', 'médio'),
}));
const opcoesOcasiao: ChoiceOption[] = OCASIOES.map((value) => ({
  value,
  label: rotuloDoCodigo(value),
}));

const nomeParaExibicao = (
  peca: Pick<PieceFormValues, 'categoria' | 'material' | 'manga' | 'cano'>,
) => {
  const categoria = CATEGORIAS.find((value) => value === peca.categoria);
  if (!categoria) return 'Peça';

  return nomeDaPeca({
    categoria,
    material: MATERIAIS.find((value) => value === peca.material),
    manga: MANGAS.find((value) => value === peca.manga),
    cano: CANOS.find((value) => value === peca.cano),
  });
};

export default function App() {
  const [pecaSalva, setPecaSalva] = useState<ValidatedPiece | null>(null);
  const [tentouSalvar, setTentouSalvar] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<PieceFormValues, unknown, ValidatedPiece>({
    resolver: zodResolver(pecaSchema),
    defaultValues: valoresIniciais,
    mode: 'onChange',
  });

  const categoria = watch('categoria');
  const material = watch('material');
  const manga = watch('manga');
  const cano = watch('cano');
  const nomePeca = nomeParaExibicao({ categoria, material, manga, cano });
  const quantidadeErros = Object.keys(errors).length;
  const exibirManga =
    precisaDeManga(categoria) || manga !== '' || Boolean(errors.manga);
  const exibirCano =
    categoria === 'BOTA' || cano !== '' || Boolean(errors.cano);

  const carregarResposta = (resposta: PieceFormValues) => {
    reset({ ...resposta, ocasioes: [...resposta.ocasioes] });
    setPecaSalva(null);
    setTentouSalvar(false);
    void trigger();
  };

  const alterarCategoria = (
    novaCategoria: string,
    atualizarCampo: (value: string) => void,
  ) => {
    atualizarCampo(novaCategoria);
    setPecaSalva(null);

    if (!precisaDeManga(novaCategoria)) {
      setValue('manga', '', { shouldDirty: true });
    }

    if (novaCategoria !== 'BOTA') {
      setValue('cano', '', { shouldDirty: true });
    }

    void trigger(['categoria', 'manga', 'cano']);
  };

  const salvarPeca = (pecaValidada: ValidatedPiece) => {
    setPecaSalva(pecaValidada);
    setTentouSalvar(true);
  };

  const falhaAoSalvar = () => {
    setPecaSalva(null);
    setTentouSalvar(true);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.eyebrow}>ZYRA · PROVA DE CONCEITO</Text>
          <Text style={styles.title}>Revise a sugestão da IA</Text>
          <Text style={styles.subtitle}>
            Confira os dados da peça e corrija qualquer informação antes de
            salvar.
          </Text>

          <View style={styles.simulationCard}>
            <Text style={styles.sectionTitle}>Simular análise da IA</Text>
            <Text style={styles.helperText}>
              Escolha uma resposta de exemplo para preencher o formulário.
            </Text>
            <View style={styles.simulationButtons}>
              <Pressable
                accessibilityRole="button"
                onPress={() => carregarResposta(respostasIA.correta)}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>
                  IA: análise correta
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => carregarResposta(respostasIA.comErros)}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>
                  IA: análise com erros
                </Text>
              </Pressable>
            </View>
          </View>

          {quantidadeErros > 0 && (
            <View
              accessibilityLiveRegion="polite"
              style={styles.errorSummary}
            >
              <Text style={styles.errorSummaryText}>
                {quantidadeErros} campo(s) precisam de revisão
              </Text>
            </View>
          )}

          <View style={styles.nameCard}>
            <Text style={styles.nameLabel}>Nome calculado da peça</Text>
            <Text style={styles.nameValue}>{nomePeca}</Text>
            <Text style={styles.helperText}>
              O nome é atualizado a partir das opções selecionadas.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Dados da peça</Text>

            <Controller
              control={control}
              name="categoria"
              render={({ field }) => (
                <ChoiceField
                  error={errors.categoria?.message}
                  label="Categoria"
                  onChange={(value) =>
                    alterarCategoria(value, field.onChange)
                  }
                  options={opcoesCategoria}
                  value={field.value}
                />
              )}
            />

            <Controller
              control={control}
              name="material"
              render={({ field }) => (
                <ChoiceField
                  error={errors.material?.message}
                  label="Material"
                  onChange={(value) => {
                    setPecaSalva(null);
                    field.onChange(value);
                  }}
                  options={opcoesMaterial}
                  value={field.value}
                />
              )}
            />

            {exibirManga && (
              <Controller
                control={control}
                name="manga"
                render={({ field }) => (
                  <ChoiceField
                    error={errors.manga?.message}
                    label="Manga"
                    onChange={(value) => {
                      setPecaSalva(null);
                      field.onChange(value);
                    }}
                    options={opcoesManga}
                    value={field.value}
                  />
                )}
              />
            )}

            {exibirCano && (
              <Controller
                control={control}
                name="cano"
                render={({ field }) => (
                  <ChoiceField
                    error={errors.cano?.message}
                    label="Cano"
                    onChange={(value) => {
                      setPecaSalva(null);
                      field.onChange(value);
                    }}
                    options={opcoesCano}
                    value={field.value}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="aquecimento"
              render={({ field }) => (
                <ChoiceField
                  error={errors.aquecimento?.message}
                  label="Aquecimento"
                  onChange={(value) => {
                    setPecaSalva(null);
                    field.onChange(value);
                  }}
                  options={opcoesAquecimento}
                  value={field.value}
                />
              )}
            />

            <Controller
              control={control}
              name="ocasioes"
              render={({ field }) => (
                <ChoiceField
                  error={errors.ocasioes?.message}
                  label="Ocasiões"
                  multiple
                  onChange={(value) => {
                    setPecaSalva(null);
                    field.onChange(value);
                  }}
                  options={opcoesOcasiao}
                  value={field.value}
                />
              )}
            />

            <Controller
              control={control}
              name="corNome"
              render={({ field }) => (
                <ColorField
                  error={errors.corNome?.message}
                  onChangeText={(value) => {
                    setPecaSalva(null);
                    field.onChange(value);
                  }}
                  value={field.value}
                />
              )}
            />

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                void handleSubmit(salvarPeca, falhaAoSalvar)();
              }}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.saveButtonText}>Salvar peça</Text>
            </Pressable>

            {tentouSalvar && quantidadeErros > 0 && (
              <Text accessibilityLiveRegion="polite" style={styles.saveError}>
                Não foi salvo: corrija os campos destacados em vermelho
              </Text>
            )}
          </View>

          {pecaSalva && (
            <View style={styles.successCard}>
              <Text style={styles.successTitle}>
                Peça validada, pronta para enviar ao back
              </Text>
              <Text style={styles.savedName}>{nomeParaExibicao(pecaSalva)}</Text>
              <Text style={styles.jsonLabel}>Objeto final validado</Text>
              <Text selectable style={styles.json}>
                {JSON.stringify(pecaSalva, null, 2)}
              </Text>
              <Text style={styles.helperText}>
                Nenhuma chamada ao back é feita nesta prova de conceito.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 36,
    paddingBottom: 48,
  },
  content: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    gap: 16,
  },
  eyebrow: {
    color: '#5554A5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  title: {
    color: '#202340',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  subtitle: {
    color: '#62647A',
    fontSize: 15,
    lineHeight: 22,
    marginTop: -8,
  },
  simulationCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E5EF',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    color: '#262843',
    fontSize: 17,
    fontWeight: '700',
  },
  helperText: {
    color: '#727487',
    fontSize: 13,
    lineHeight: 19,
  },
  simulationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#F0F0FA',
    borderColor: '#D8D8EB',
    borderRadius: 10,
    borderWidth: 1,
    flexGrow: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  secondaryButtonText: {
    color: '#3D3C82',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.76,
  },
  errorSummary: {
    backgroundColor: '#FFF0EF',
    borderColor: '#F5B8B4',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  errorSummaryText: {
    color: '#A5221D',
    fontSize: 14,
    fontWeight: '700',
  },
  nameCard: {
    backgroundColor: '#ECECFC',
    borderRadius: 14,
    padding: 16,
    gap: 4,
  },
  nameLabel: {
    color: '#4C4B84',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  nameValue: {
    color: '#25264D',
    fontSize: 20,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E5EF',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 19,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#3F3C9C',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 50,
    marginTop: 2,
    paddingHorizontal: 18,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  saveError: {
    color: '#A5221D',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: -10,
  },
  successCard: {
    backgroundColor: '#EAF8F0',
    borderColor: '#A8D9BA',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  successTitle: {
    color: '#17623D',
    fontSize: 16,
    fontWeight: '700',
  },
  savedName: {
    color: '#1D5037',
    fontSize: 18,
    fontWeight: '700',
  },
  jsonLabel: {
    color: '#3C694F',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  json: {
    backgroundColor: '#F7FCF9',
    borderRadius: 8,
    color: '#284936',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
    overflow: 'hidden',
    padding: 12,
  },
});
