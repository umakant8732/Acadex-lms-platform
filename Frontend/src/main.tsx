import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './app'
import {
  AuthProvider,
  QueryProvider,
  ReduxProvider
} from './app/providers'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <ReduxProvider>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster position='top-right' />
    </QueryProvider>
  </ReduxProvider>
)
