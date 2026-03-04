import { useEffect, useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import AppHeader from '../../src/components/AppHeader';
import ContainerMarker from '../../src/components/ContainerMarker';
import { Input } from '../../src/components/ui/input';
import { Button } from '../../src/components/ui/button';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { API_URL } from '../../src/config/api';

interface Container {
  id: string;
  type: string;
  address: string;
  materials: string[];
  latitude: number;
  longitude: number;
  schedule?: string;
}

export default function Map() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/containers`);
        const data: Container[] = await response.json();
        setContainers(data);
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    };

    fetchContainers();
  }, []);

  const materialsList = useMemo(() => {
    const allMaterials = containers.flatMap(c => c.materials ?? []);
    const unique = [...new Set(allMaterials)];
    return ['Todos', ...unique];
  }, [containers]);

  const filteredContainers = useMemo(() => {
    return containers.filter(container => {
      const matchesSearch =
        container.address
          ?.toLowerCase()
          .includes(search.toLowerCase()) ?? false;

      const matchesFilter =
        activeFilter === 'Todos' ||
        container.materials?.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [containers, search, activeFilter]);

  return (
    <View style={styles.container}>
      <AppHeader
        title="Mapa de Contenedores"
        action={
          <Button size="icon" variant="ghost">
            <Filter size={20} color="#6b7280" />
          </Button>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <Input
              placeholder="Buscar por dirección..."
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContainer}
        >
          {materialsList.map(material => (
            <TouchableOpacity
              key={material}
              style={
                activeFilter === material
                  ? styles.filterBadgeActive
                  : styles.filterBadge
              }
              onPress={() => setActiveFilter(material)}
            >
              <Text
                style={
                  activeFilter === material
                    ? styles.filterTextActive
                    : styles.filterText
                }
              >
                {material}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -26.1775,
            longitude: -58.1781,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {filteredContainers.map(container => (
            <Marker
              key={container.id}
              coordinate={{
                latitude: container.latitude,
                longitude: container.longitude,
              }}
              title={container.type}
              description={container.address}
            />
          ))}
        </MapView>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Contenedores Cercanos</Text>
          <View style={styles.containersList}>
            {filteredContainers.map(container => (
              <ContainerMarker
                key={container.id}
                type={container.type}
                address={container.address}
                materials={container.materials}
                schedule={container.schedule}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
  searchSection: {
    marginTop: 8,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 0,
  },
  filtersScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filtersContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  filterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
  },
  filterBadgeActive: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1f5c2e',
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    color: '#374151',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  map: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
  },
  listSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  containersList: {
    gap: 12,
  },
});