import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Award, Gift } from 'lucide-react-native';
import { Card } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Badge } from '../../src/components/ui/badge';

interface RewardCardProps {
  title: string;
  description: string;
  pointsRequired: number;
  merchant: string;
  imageUrl?: string;
  onRedeem?: () => void;
}

export default function RewardCard({
  title,
  description,
  pointsRequired,
  merchant,
  imageUrl,
  onRedeem,
}: RewardCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Gift size={42} color="#4caf50" />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Badge variant="secondary" style={styles.badge}>
            <Award size={12} color="#2e7d32" style={styles.awardIcon} />
            {pointsRequired}
          </Badge>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <Text style={styles.merchant}>
          {merchant}
        </Text>

        <Button
          style={styles.button}
          variant="outline"
          onPress={onRedeem}
          testID="button-redeem"
        >
          Canjear recompensa
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 130,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 18,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    marginLeft: 8,
  },
  awardIcon: {
    marginRight: 4,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 20,
  },
  merchant: {
    fontSize: 12,
    color: '#2e7d32',
    marginBottom: 14,
    fontWeight: '500',
  },
  button: {
    width: '100%',
  },
});