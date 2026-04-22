import React from 'react'
import ReactDOM from 'react-dom/client'
import PlanApp from './PlanApp.jsx'
import BSCApp from './BSCApp.jsx'

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

function Router() {
  const [page, setPage] = React.useState(window.location.hash === '#bsc' ? 'bsc' : 'plan')
  React.useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#bsc' ? 'bsc' : 'plan')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return page === 'bsc' ? <BSCApp /> : <PlanApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router />)
