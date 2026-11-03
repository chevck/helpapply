import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ToastProvider from './components/Toast'
import Landing from './pages/Landing'
import GetStarted from './pages/GetStarted'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
