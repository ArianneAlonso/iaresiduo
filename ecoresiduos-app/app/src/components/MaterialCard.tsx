import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface MaterialCardProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function MaterialCard({
  icon: Icon,
  label,
  selected,
  onPress,
}: MaterialCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      testID={`material-${label.toLowerCase()}`}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            selected ? styles.iconSelected : styles.iconDefault,
          ]}
        >
          <Icon size={30} color={selected ? '#fff' : '#4caf50'} />
        </View>

        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#4caf50',
    backgroundColor: '#f1f8e9',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconDefault: {
    backgroundColor: '#f1f5f9',
  },
  iconSelected: {
    backgroundColor: '#4caf50',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  labelSelected: {
    color: '#2e7d32',
    fontWeight: '600',
  },
});