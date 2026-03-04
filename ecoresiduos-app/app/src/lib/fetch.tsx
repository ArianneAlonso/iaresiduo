export const API_URL = 'http://localhost:8000'; 

// Obtener todos los usuarios
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

// Registrar usuario
export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
}

// Login usuario
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Error al hacer login');
  return res.json();
}

// Obtener registros de reciclaje
export async function getRecyclingRecords() {
  const res = await fetch(`${API_URL}/recycling`);
  if (!res.ok) throw new Error('Error al obtener registros');
  return res.json();
}