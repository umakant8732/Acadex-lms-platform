import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import ReduxProvider from './app/providers/redux-provider.jsx'
import QueryProvider from './app/providers/query-provider.jsx'
import AuthProvider from './app/providers/auth-provider.jsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <ReduxProvider>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster position='top-right' />
    </QueryProvider>
  </ReduxProvider>
)
