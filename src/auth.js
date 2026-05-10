import { ref, computed } from 'vue'

export const user = ref(null)
export const userRole = ref(localStorage.getItem('userRole') || 'visitor')

export const users = {
  'admin@dragons.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
  'user@dragons.com': { password: 'user123', role: 'user', name: 'Regular User' }
}

export const isLoggedIn = computed(() => user.value !== null)

export const login = (email, password) => {
  if (users[email] && users[email].password === password) {
    user.value = {
      email,
      name: users[email].name,
      role: users[email].role
    }
    userRole.value = users[email].role
    localStorage.setItem('userRole', users[email].role)
    localStorage.setItem('user', JSON.stringify(user.value))
    return { success: true, message: 'Login successful!' }
  }
  return { success: false, message: 'Invalid email or password' }
}

export const logout = () => {
  user.value = null
  userRole.value = 'visitor'
  localStorage.removeItem('userRole')
  localStorage.removeItem('user')
}

export const register = (email, password, name) => {
  if (users[email]) {
    return { success: false, message: 'Email already exists' }
  }
  
  users[email] = { password, role: 'user', name }
  return { success: true, message: 'Registration successful! You can now login.' }
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
