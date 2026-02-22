import { useState } from 'react';
import { Leaf, Mail, Lock, User, MapPin } from 'lucide-react-native';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Card } from '../../src/components/ui/card';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = () => {
    console.log('Register:', { name, email, password, address });
    // TODO: Implement actual registration
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Leaf size={40} color="#3b82f6" />
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a la comunidad eco-responsable</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Label>Nombre completo</Label>
              <View style={styles.inputWrapper}>
                <User size={20} color="#6b7280" style={styles.inputIcon} />
                <Input
                  placeholder="Juan Pérez"
                  value={name}
                  onChangeText={setName}
                  testID="input-name"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Label>Correo electrónico</Label>
              <View style={styles.inputWrapper}>
                <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                <Input
                  placeholder="tu@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  testID="input-email"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Label>Contraseña</Label>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  testID="input-password"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Label>Dirección</Label>
              <View style={styles.inputWrapper}>
                <MapPin size={20} color="#6b7280" style={styles.inputIcon} />
                <Input
                  placeholder="Av. Principal 123"
                  value={address}
                  onChangeText={setAddress}
                  testID="input-address"
                  style={styles.input}
                />
              </View>
            </View>

            <Button
              onPress={handleRegister}
              style={styles.button}
              testID="button-register"
            >
              Crear Cuenta
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿Ya tienes cuenta?{' '}
              <TouchableOpacity testID="link-login">
                <Text style={styles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b82f6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  card: {
    padding: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingLeft: 0,
  },
  button: {
    marginTop: 8,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  loginLink: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});
