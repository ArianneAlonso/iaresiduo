import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { Button } from '../../src/components/ui/button';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 100,
  label,
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.buttonsContainer}>
        <Button
          size="icon"
          variant="outline"
          onPress={handleDecrement}
          disabled={value <= min}
          testID="button-decrement"
        >
          <Minus size={18} color="#4caf50" />
        </Button>

        <Text style={styles.quantity} testID="text-quantity">
          {value}
        </Text>

        <Button
          size="icon"
          variant="outline"
          onPress={handleIncrement}
          disabled={value >= max}
          testID="button-increment"
        >
          <Plus size={18} color="#4caf50" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2e7d32',
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1b5e20',
    width: 50,
    textAlign: 'center',
  },
});