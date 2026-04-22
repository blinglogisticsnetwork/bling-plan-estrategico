import React from 'react'
import ReactDOM from 'react-dom/client'
import PlanApp from './PlanApp.jsx'
import BSCApp from './BSCApp.jsx'

// Storage adapter — uses localStorage in web, window.storage in Claude
window.storage = {
  get: async (key) => {
    const value = localStorage.getItem(key)
    return value ? { key, value } : null
  },
  set: async (key, value) => {
    localStorage.setItem(key, value)
    return { key, value }
  }
}

// Simple router based on URL hash
function Router() {
  const [page, setPage] = React.useState(window.location.hash === '#bsc' ? 'bsc' : 'plan')

  React.useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#bsc' ? 'bsc' : 'plan')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Inject navigation between apps
  React.useEffect(() => {
    window.__goToBSC = () => { window.location.hash = '#bsc' }
    window.__goToPlan = () => { window.location.hash = '' }
  }, [])

  return page === 'bsc' ? <BSCApp /> : <PlanApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router />)
