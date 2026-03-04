import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../src/components/ui/button';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  action?: React.ReactNode;
}

export default function AppHeader({
  title,
  showBack = false,
  action,
}: AppHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBack && (
            <Button
              size="icon"
              variant="ghost"
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={20} color="#4caf50" />
            </Button>
          )}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {action && <View style={styles.rightSection}>{action}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    marginLeft: 10,
  },
});