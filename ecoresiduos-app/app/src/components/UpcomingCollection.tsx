import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Clock, Trash2 } from 'lucide-react-native';
import { Card } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';

interface UpcomingCollectionProps {
  date: string;
  time: string;
  materials: string[];
  daysUntil: number;
}

export default function UpcomingCollection({
  date,
  time,
  materials,
  daysUntil,
}: UpcomingCollectionProps) {
  const daysText =
    daysUntil === 0
      ? 'Hoy'
      : daysUntil === 1
      ? 'Mañana'
      : `En ${daysUntil} días`;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Próxima Recolección</Text>
          <Text style={styles.daysText}>{daysText}</Text>
        </View>

        <View style={styles.trashIcon}>
          <Trash2 size={20} color="#4caf50" />
        </View>
      </View>

      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Calendar size={16} color="#4caf50" />
          <Text style={styles.metaText}>{date}</Text>
        </View>

        <View style={styles.metaItem}>
          <Clock size={16} color="#4caf50" />
          <Text style={styles.metaText}>{time}</Text>
        </View>
      </View>

      <View style={styles.materialsContainer}>
        {materials.map((material) => (
          <View key={material} style={styles.badgeWrapper}>
            <Badge variant="secondary">{material}</Badge>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  daysText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '500',
  },
  trashIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaContainer: {
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badgeWrapper: {
    marginRight: 8,
    marginBottom: 8,
  },
});