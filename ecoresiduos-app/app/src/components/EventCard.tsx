import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Card } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
  onConfirm?: () => void;
}

export default function EventCard({
  title,
  date,
  location,
  description,
  imageUrl,
  onConfirm,
}: EventCardProps) {
  const { width } = useWindowDimensions();

  return (
    <Card style={styles.card}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { width }]}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Calendar size={16} color="#4caf50" />
            <Text style={styles.metaText}>{date}</Text>
          </View>

          <View style={styles.metaItem}>
            <MapPin size={16} color="#4caf50" />
            <Text style={styles.metaText}>{location}</Text>
          </View>
        </View>

        <Button style={styles.button} onPress={onConfirm}>
          Confirmar asistencia
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    height: 160,
  },
  content: {
    padding: 18,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 14,
  },
  meta: {
    marginBottom: 18,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#222',
    marginLeft: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#9ccc65',
    borderRadius: 30,
    paddingVertical: 12,
  },
});