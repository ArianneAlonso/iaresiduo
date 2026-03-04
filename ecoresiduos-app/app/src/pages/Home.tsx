import { Truck, QrCode, MapPin, Leaf } from 'lucide-react-native';
import QuickActionCard from '../../src/components/QuickActionCard';
import UpcomingCollection from '../../src/components/UpcomingCollection';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../../src/config/api';

interface User {
  id: string;
  name: string;
}

const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/1`);

  if (!response.ok) {
    throw new Error('Error al obtener usuario');
  }

  return response.json();
};

export default function Home() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : isError ? (
          <Text style={styles.heroTitle}>Error al cargar usuario</Text>
        ) : (
          <>
            <Text style={styles.heroTitle}>
              ¡Hola, {user?.name}!
            </Text>
            <Text style={styles.heroSubtitle}>
              Juntos hacemos un planeta más verde
            </Text>
          </>
        )}
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.quickActionsScroll}
            contentContainerStyle={styles.quickActionsContainer}
          >
            <QuickActionCard
              icon={Truck}
              title="Solicitar Retiro"
              description="Programa la recolección de tus residuos"
              onPress={() => console.log('Solicitar Retiro')}
            />
            <QuickActionCard
              icon={QrCode}
              title="Escanear QR"
              description="Valida tu entrega y suma puntos"
              onPress={() => console.log('Escanear QR')}
            />
            <QuickActionCard
              icon={MapPin}
              title="Contenedores"
              description="Encuentra el más cercano"
              onPress={() => console.log('Contenedores')}
            />
            <QuickActionCard
              icon={Leaf}
              title="Consejos"
              description="Aprende a reciclar mejor"
              onPress={() => console.log('Consejos')}
            />
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Próxima Recolección</Text>
          <UpcomingCollection
            date="Viernes, 1 de Noviembre"
            time="8:00 AM - 12:00 PM"
            materials={["Plástico", "Vidrio", "Papel"]}
            daysUntil={1}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    backgroundColor: '#1f5c2e',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  quickActionsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickActionsContainer: {
    gap: 12,
  },
});