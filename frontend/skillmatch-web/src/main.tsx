import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import type { User } from './types'

const initialUser: User = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@university.edu',
  avatarInitials: 'A',
  course: 'Computer Science',
  university: 'MIT',
  skills: ['Python', 'JavaScript', 'Machine Learning'],
  bio: 'Passionate about AI and data science. Looking for exciting projects to collaborate.',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App currentUser={initialUser} onUserUpdate={(user: User) => console.log('User updated:', user)} />
  </StrictMode>,
)
