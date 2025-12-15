import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryclient}>
      <AuthProvider> {/* Bọc ứng dụng bằng AuthProvider */}
        <App />
      </AuthProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)