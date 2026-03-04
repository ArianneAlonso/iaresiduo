import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Card } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';

interface ContainerMarkerProps {
  type: string;
  address: string;
  materials: string[];
  distance?: string;
  schedule?: string;
}

export default function ContainerMarker({
  type,
  address,
  materials,
  distance,
  schedule,
}: ContainerMarkerProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MapPin size={20} color="#4caf50" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {type}
          </Text>

          <Text style={styles.address} numberOfLines={2}>
            {address}
          </Text>

          {distance && (
            <Text style={styles.distance}>
              {distance}
            </Text>
          )}

          <View style={styles.materialsContainer}>
            {materials.map((material) => (
              <Badge key={material} style={styles.badge}>
                {material}
              </Badge>
            ))}
          </View>

          {schedule && (
            <Text style={styles.schedule}>
              {schedule}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  distance: {
    fontSize: 13,
    color: '#4caf50',
    marginBottom: 6,
    fontWeight: '500',
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#9ccc65',
    marginRight: 6,
    marginBottom: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  schedule: {
    fontSize: 12,
    color: '#555',
  },
});