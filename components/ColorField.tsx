import { StyleSheet, Text, TextInput, View } from 'react-native';

type ColorFieldProps = {
  error?: string;
  onChangeText: (value: string) => void;
  value: string;
};

export function ColorField({
  error,
  onChangeText,
  value,
}: ColorFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Cor</Text>
      <TextInput
        accessibilityLabel="Cor"
        autoCapitalize="words"
        maxLength={32}
        onChangeText={onChangeText}
        placeholder="Ex.: azul"
        placeholderTextColor="#898B9D"
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
      />
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    color: '#34364D',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADBE6',
    borderRadius: 10,
    borderWidth: 1,
    color: '#292B40',
    fontSize: 15,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#B42318',
    backgroundColor: '#FFF8F7',
  },
  error: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },
});
