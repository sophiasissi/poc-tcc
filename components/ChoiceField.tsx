import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ChoiceOption = {
  label: string;
  value: string;
};

type SharedProps = {
  error?: string;
  label: string;
  options: readonly ChoiceOption[];
};

type SingleChoiceProps = SharedProps & {
  multiple?: false;
  onChange: (value: string) => void;
  value: string;
};

type MultipleChoiceProps = SharedProps & {
  multiple: true;
  onChange: (value: string[]) => void;
  value: string[];
};

type ChoiceFieldProps = SingleChoiceProps | MultipleChoiceProps;

export function ChoiceField(props: ChoiceFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.options}>
        {props.options.map((option) => {
          const selected = props.multiple
            ? props.value.includes(option.value)
            : props.value === option.value;

          return (
            <Pressable
              accessibilityLabel={`${props.label}: ${option.label}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={option.value}
              onPress={() => {
                if (props.multiple) {
                  const nextValue = selected
                    ? props.value.filter((value) => value !== option.value)
                    : [...props.value, option.value];
                  props.onChange(nextValue);
                } else {
                  props.onChange(option.value);
                }
              }}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {props.error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {props.error}
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
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DADBE6',
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  optionSelected: {
    backgroundColor: '#EDEDFB',
    borderColor: '#5E5AB5',
  },
  optionPressed: {
    opacity: 0.72,
  },
  optionText: {
    color: '#4D4F62',
    fontSize: 13,
  },
  optionTextSelected: {
    color: '#35327F',
    fontWeight: '700',
  },
  error: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },
});
