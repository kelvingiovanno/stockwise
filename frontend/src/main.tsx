import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SignInPage from './features/sign-in/pages/signin.pages.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignInPage />
  </StrictMode>,
)
