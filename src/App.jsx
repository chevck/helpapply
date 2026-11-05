import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ToastProvider from './components/Toast'
import AuthProvider from './components/AuthProvider'
import Landing from './pages/Landing'
import GetStarted from './pages/GetStarted'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
