import { MapPin, Search, Filter } from 'lucide-react-native';
import AppHeader from '../../src/components/AppHeader';
import ContainerMarker from '../../src/components/ContainerMarker';
import { Input } from '../../src/components/ui/input';
import { Button } from '../../src/components/ui/button';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const containers = [
  {
    id: "1",
    type: "Contenedor Verde",
    address: "Av. Principal 123",
    materials: ["Plástico", "Vidrio", "Papel"],
    distance: "0.5 km",
    schedule: "Lun - Vie: 7:00 AM - 6:00 PM",
  },
  {
    id: "2",
    type: "Punto Ecológico",
    address: "Plaza Central",
    materials: ["Electrónicos", "Baterías"],
    distance: "1.2 km",
    schedule: "Mar y Jue: 9:00 AM - 5:00 PM",
  },
  {
    id: "3",
    type: "Contenedor Azul",
    address: "Calle Secundaria 456",
    materials: ["Papel", "Cartón"],
    distance: "0.8 km",
    schedule: "Lun - Sáb: 8:00 AM - 8:00 PM",
  },
];

export default function Map() {
  return (
    <View style={styles.container}>
      <AppHeader 
        title="Mapa de Contenedores"
        action={
          <Button size="icon" variant="ghost" testID="button-filter">
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
              testID="input-search"
            />
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContainer}
        >
          <TouchableOpacity style={styles.filterBadgeActive}>
            <Text style={styles.filterTextActive}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBadge}>
            <Text style={styles.filterText}>Plástico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBadge}>
            <Text style={styles.filterText}>Vidrio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBadge}>
            <Text style={styles.filterText}>Papel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBadge}>
            <Text style={styles.filterText}>Electrónicos</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.mapPlaceholder}>
          <View style={styles.mapOverlay} />
          <MapPin size={32} color="#3b82f6" style={styles.mapIcon} />
          <Text style={styles.mapText}>Mapa interactivo (placeholder)</Text>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Contenedores Cercanos</Text>
          <View style={styles.containersList}>
            {containers.map((container) => (
              <ContainerMarker 
                key={container.id} 
                type={container.type}
                address={container.address}
                materials={container.materials}
                distance={container.distance}
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
    backgroundColor: '#3b82f6',
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
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  mapIcon: {
    zIndex: 1,
  },
  mapText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    zIndex: 1,
  },
  listSection: {},
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
