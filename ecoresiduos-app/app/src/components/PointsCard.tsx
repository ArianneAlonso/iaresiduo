import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award, TrendingUp } from 'lucide-react-native';
import { Card } from '../../src/components/ui/card';

interface PointsCardProps {
  points: number;
  change?: number;
}

export default function PointsCard({ points, change }: PointsCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Puntos Ecológicos</Text>

          <Text style={styles.points} testID="text-points">
            {points.toLocaleString()}
          </Text>

          {change !== undefined && (
            <View style={styles.changeContainer}>
              <TrendingUp size={16} color="#C8E6C9" />
              <Text style={styles.changeText}>
                +{change} esta semana
              </Text>
            </View>
          )}
        </View>

        <View style={styles.iconContainer}>
          <Award size={30} color="#ffffff" />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#4caf50',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 6,
  },
  points: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changeText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});