import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './styles/App.css'
import Home from './pages/Home/Home.jsx'
import ModernNavbar from './components/ModernNavbar/ModernNavbar.jsx'
import ModernPortfolio from './pages/Portfolio/ModernPortfolio.jsx'
import ModernContact from './pages/Contact/ModernContact.jsx'
import ModernBlog from './pages/Blog/ModernBlog.jsx'
import ModernAbout from './pages/About/ModernAbout.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { PortfolioProvider } from './contexts/PortfolioContext.jsx'

function App() {
  return(
    <PortfolioProvider>
      <Router>
        <div className="app">
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4caf50',
                  secondary: '#ffffff',
                },
              },
              error: {
                duration: 5000,
                theme: {
                  primary: '#f44336',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          
          <Routes>
            {/* All routes wrapped in PortfolioProvider */}
            <Route path="/*" element={
              <Routes>
                {/* Portfolio routes with navbar */}
                <Route path="/about" element={
                  <>
                    <ModernNavbar />
                    <ModernAbout />
                  </>
                } />
                
                <Route path="/portfolio" element={
                  <>
                    <ModernNavbar />
                    <ModernPortfolio />
                  </>
                } />
                
                <Route path="/blog" element={
                  <>
                    <ModernNavbar />
                    <ModernBlog />
                  </>
                } />
                
                <Route path="/contact" element={
                  <>
                    <ModernNavbar />
                    <ModernContact />
                  </>
                } />
                
                {/* Modern homepage - must be last to avoid catching other routes */}
                <Route path="/" element={
                  <>
                    <ModernNavbar />
                    <Home />
                  </>
                } />
              </Routes>
            } />
            
            {/* Login route - outside PortfolioProvider */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard routes - with PortfolioProvider */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
          
          </div>
      </Router>
    </PortfolioProvider>
  )
}

export default App
