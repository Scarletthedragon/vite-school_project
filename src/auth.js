import { ref, computed } from 'vue'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const user = ref(null)
export const userRole = ref(localStorage.getItem('userRole') || 'visitor')

export const isLoggedIn = computed(() => user.value !== null)

export const login = async (email, password) => {
  try {
    console.log('[LOGIN] Attempting login with:', { email, password, API });
    const res = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log('[LOGIN] Response status:', res.status);
    let data = null;
    try {
      data = await res.json();
      console.log('[LOGIN] Response JSON:', data);
    } catch (jsonErr) {
      console.error('[LOGIN] Error parsing JSON:', jsonErr);
    }
    if (!res.ok) {
      console.error('[LOGIN] Login failed:', data);
      return { success: false, message: (data && data.message) ? data.message : 'Invalid email or password' };
    }
    user.value = data.user;
    userRole.value = data.user.role;
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('[LOGIN] Login successful:', data.user);
    return { success: true, message: 'Login successful!' };
  } catch (err) {
    console.error('[LOGIN] Network or server error:', err);
    return { success: false, message: 'Could not connect to server' };
  }
}

export const logout = () => {
  user.value = null
  userRole.value = 'visitor'
  localStorage.removeItem('userRole')
  localStorage.removeItem('user')
}

export const register = async (email, password, name) => {
  try {
    const res = await fetch(`${API}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    const data = await res.json()
    if (!res.ok) {
      const msg = data.errors ? Object.values(data.errors).flat()[0] : (data.message ?? 'Registration failed')
      return { success: false, message: msg }
    }
    return { success: true, message: 'Registration successful! You can now login.' }
  } catch {
    return { success: false, message: 'Could not connect to server' }
  }
}

export const continueAsVisitor = () => {
  user.value = { name: 'Visitor', role: 'visitor', email: '' }
  userRole.value = 'visitor'
  localStorage.setItem('userRole', 'visitor')
  localStorage.setItem('user', JSON.stringify(user.value))
}

export const restoreSession = () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    userRole.value = localStorage.getItem('userRole') || 'visitor'
  }
}
