import { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Trash2,
  Wine,
  FileText,
  Cpu,
  Package,
  Leaf,
  Calendar,
  Upload
} from 'lucide-react-native';
import AppHeader from '../../src/components/AppHeader';
import MaterialCard from '../../src/components/MaterialCard';
import { Button } from '../../src/components/ui/button';
import { Card } from '../../src/components/ui/card';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Badge } from '../../src/components/ui/badge';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

type ScanMethod = "scan" | "manual" | null;

const materials = [
  { id: "plastic", icon: Trash2, label: "Plástico" },
  { id: "glass", icon: Wine, label: "Vidrio" },
  { id: "paper", icon: FileText, label: "Papel" },
  { id: "metal", icon: Package, label: "Metal" },
  { id: "electronics", icon: Cpu, label: "Electrónicos" },
  { id: "organic", icon: Leaf, label: "Orgánicos" },
];

const containerTypes: Record<string, { id: string; label: string }[]> = {
  bolsas: [
    { id: "bolsa-supermercado", label: "Bolsa de supermercado" },
    { id: "bolsa-consorcio", label: "Bolsa de consorcio / basura" },
    { id: "bolsa-cocina", label: "Bolsa pequeña de cocina" },
    { id: "bolsa-alpillera", label: "Bolsa alpillera" },
    { id: "bolsa-malla", label: "Bolsa malla para jardín" },
  ],
  cajas: [
    { id: "caja-pequeña", label: "Caja pequeña" },
    { id: "caja-mediana", label: "Caja mediana" },
    { id: "caja-grande", label: "Caja grande" },
  ],
  bidones: [
    { id: "bidon-pequeño", label: "Bidón pequeño" },
    { id: "bidon-grande", label: "Bidón grande" },
  ],
  otros: [
    { id: "sueltos", label: "Residuos sueltos / a granel" },
    { id: "rollos", label: "Rollos o fardos" },
  ],
};

export default function PickupRequest() {
  const [step, setStep] = useState<number>(1);
  const [scanMethod, setScanMethod] = useState<ScanMethod>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const scheduleOptions = [
    { id: "lunes-mañana", day: "Lunes", hours: "8:00 - 12:00" },
    { id: "martes-tarde", day: "Martes", hours: "14:00 - 18:00" },
    { id: "miercoles-mañana", day: "Miércoles", hours: "8:00 - 12:00" },
    { id: "jueves-tarde", day: "Jueves", hours: "14:00 - 18:00" },
  ];

  const toggleMaterial = (id: string) => {
    setSelectedMaterials(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const handleImageUpload = () => {
    setImagePreview('https://via.placeholder.com/300x200/3b82f6/ffffff?text=Residuos');
    setIsAnalyzing(true);

    setTimeout(() => {
      setSelectedMaterials(["plastic", "paper", "metal"]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleNext = () => {
    if (step === 1 && selectedMaterials.length === 0) return;
    if (step === 2 && !selectedContainer) return;
    if (step === 3 && (!address || !selectedSchedule)) return;
    if (step < 3) setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    console.log('Solicitud enviada:', {
      selectedMaterials,
      selectedContainer,
      address,
      selectedSchedule
    });

    setStep(1);
    setScanMethod(null);
    setSelectedMaterials([]);
    setSelectedContainer("");
    setImagePreview(null);
    setSelectedSchedule("");
    setAddress("");
  };

  const getMaterialLabel = (id: string): string =>
    materials.find(m => m.id === id)?.label || "";

  const getContainerLabel = (): string => {
    for (const type of Object.values(containerTypes)) {
      const found = type.find(c => c.id === selectedContainer);
      if (found) return found.label;
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Solicitar Retiro" showBack />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressBar}>
          {[1, 2, 3].map(s => (
            <View
              key={s}
              style={[
                styles.progressStep,
                s <= step && styles.progressStepActive
              ]}
            />
          ))}
        </View>

        {/* STEP 1 */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Reconocimiento de materiales</Text>

            {!scanMethod ? (
              <View style={styles.methodCards}>
                <TouchableOpacity
                  style={styles.methodCard}
                  onPress={() => setScanMethod("scan")}
                >
                  <Camera size={24} color="#1f5c2e" />
                  <Text style={styles.methodTitle}>Escanear con cámara</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.methodCard}
                  onPress={() => setScanMethod("manual")}
                >
                  <CheckCircle2 size={24} color="#6b7280" />
                  <Text style={styles.methodTitle}>Selección manual</Text>
                </TouchableOpacity>
              </View>
            ) : scanMethod === "scan" ? (
              <Card style={styles.uploadCard}>
                {!imagePreview ? (
                  <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={handleImageUpload}
                  >
                    <Upload size={48} color="#6b7280" />
                    <Text>Toca para subir imagen</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
                    {isAnalyzing && (
                      <View style={styles.analyzingOverlay}>
                        <ActivityIndicator size="large" color="#fff" />
                      </View>
                    )}
                  </View>
                )}
              </Card>
            ) : (
              <View style={styles.materialsGrid}>
                {materials.map(material => (
                  <MaterialCard
                    key={material.id}
                    icon={material.icon}
                    label={material.label}
                    selected={selectedMaterials.includes(material.id)}
                    onPress={() => toggleMaterial(material.id)}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomActions}>
        {step > 1 && (
          <Button variant="outline" onPress={() => setStep(prev => prev - 1)}>
            Atrás
          </Button>
        )}
        <Button onPress={step === 3 ? handleSubmit : handleNext}>
          {step === 3 ? "Confirmar Solicitud" : "Continuar"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  progressBar: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  progressStep: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e5e7eb' },
  progressStepActive: { backgroundColor: '#1f5c2e' },
  stepContainer: { gap: 16 },
  stepTitle: { fontSize: 20, fontWeight: '600' },
  methodCards: { gap: 12 },
  methodCard: { padding: 16, borderWidth: 1, borderRadius: 12, borderColor: '#e5e7eb' },
  methodTitle: { marginTop: 8, fontWeight: '600' },
  uploadCard: { padding: 20 },
  uploadArea: { height: 180, justifyContent: 'center', alignItems: 'center' },
  imagePreviewContainer: { position: 'relative' },
  imagePreview: { width: '100%', height: 180, borderRadius: 12 },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  materialsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bottomActions: { flexDirection: 'row', gap: 12, padding: 16 }
});